import React, { useEffect, useState, useRef } from 'react';
import { Vendor, ProduceItem, UserLocation, FilterOptions } from '../types';
import { calculateDistance } from '../utils/calculations';

interface MapViewProps {
  vendors: Vendor[];
  items: ProduceItem[];
  userLocation: UserLocation | null;
  filters: FilterOptions;
}

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: 'user' | 'vendor';
  vendor?: Vendor;
  distance?: number;
  vendorItems?: ProduceItem[];
}

const MapView: React.FC<MapViewProps> = ({ vendors, items, userLocation, filters }) => {
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [vendorDistances, setVendorDistances] = useState<Map<string, number>>(new Map());
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [zoom, setZoom] = useState(5);
  const [center, setCenter] = useState({ lat: 23.5937, lng: 78.9629 }); // India center
  const mapRef = useRef<HTMLDivElement>(null);

  // Filter vendors based on search criteria
  useEffect(() => {
    let filtered = vendors.filter(vendor => vendor.isActive);

    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(vendor => {
        const vendorItems = items.filter(item => item.vendorId === vendor.id);
        return vendor.name.toLowerCase().includes(searchLower) ||
          vendor.specialties.some(specialty => specialty.toLowerCase().includes(searchLower)) ||
          vendorItems.some(item => item.name.toLowerCase().includes(searchLower));
      });
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(vendor => {
        const vendorItems = items.filter(item => item.vendorId === vendor.id);
        return vendorItems.some(item => filters.categories.includes(item.category)) ||
          vendor.specialties.some(specialty => filters.categories.some(cat => specialty.includes(cat)));
      });
    }

    // Calculate distances and apply distance filter
    const distances = new Map<string, number>();
    if (userLocation) {
      filtered.forEach(vendor => {
        const distance = calculateDistance(userLocation, vendor.location);
        distances.set(vendor.id, distance);
      });

      if (filters.maxDistance > 0) {
        filtered = filtered.filter(vendor => {
          const distance = distances.get(vendor.id);
          return distance === undefined || distance <= filters.maxDistance;
        });
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'distance':
          if (!userLocation) return 0;
          const distA = distances.get(a.id) || 0;
          const distB = distances.get(b.id) || 0;
          return distA - distB;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredVendors(filtered);
    setVendorDistances(distances);
  }, [vendors, items, userLocation, filters]);

  // Update markers when filtered vendors change
  useEffect(() => {
    const newMarkers: MapMarker[] = [];

    // Add user location marker
    if (userLocation) {
      newMarkers.push({
        id: 'user',
        lat: userLocation.lat,
        lng: userLocation.lng,
        type: 'user'
      });
    }

    // Add vendor markers
    filteredVendors.forEach(vendor => {
      const vendorItems = items.filter(item => item.vendorId === vendor.id);
      const distance = vendorDistances.get(vendor.id);

      newMarkers.push({
        id: vendor.id,
        lat: vendor.location.lat,
        lng: vendor.location.lng,
        type: 'vendor',
        vendor,
        distance,
        vendorItems
      });
    });

    setMarkers(newMarkers);

    // Update center and zoom based on markers
    if (newMarkers.length > 0) {
      const lats = newMarkers.map(m => m.lat);
      const lngs = newMarkers.map(m => m.lng);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);

      setCenter({
        lat: (minLat + maxLat) / 2,
        lng: (minLng + maxLng) / 2
      });

      const latDiff = maxLat - minLat;
      const lngDiff = maxLng - minLng;
      const maxDiff = Math.max(latDiff, lngDiff);

      if (maxDiff > 0.1) setZoom(10);
      else if (maxDiff > 0.05) setZoom(12);
      else setZoom(14);
    }
  }, [filteredVendors, vendorDistances, userLocation, items]);

  // Convert lat/lng to pixel coordinates
  const latLngToPixel = (lat: number, lng: number) => {
    const mapWidth = 256;
    const mapHeight = 256;

    // Convert to mercator projection
    const x = ((lng + 180) / 360) * mapWidth;
    const y = ((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2) * mapHeight;

    return { x, y };
  };

  // Handle marker click
  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
  };

  // Close info window
  const closeInfoWindow = () => {
    setSelectedMarker(null);
  };

  // Get tile coordinates
  const getTileCoordinates = (lat: number, lng: number, zoomLevel: number) => {
    const n = Math.pow(2, zoomLevel);
    const xtile = Math.floor((lng + 180) / 360 * n);
    const ytile = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * n);
    return { x: xtile, y: ytile };
  };

  const tileCoords = getTileCoordinates(center.lat, center.lng, zoom);

  return (
    <div className="h-full w-full relative">
      {/* Custom Map Container */}
      <div ref={mapRef} className="h-full w-full relative overflow-hidden map-container">
        {/* Map Tiles */}
        <div
          className="absolute inset-0 map-tile"
          style={{
            backgroundImage: `url(https://tile.openstreetmap.org/${zoom}/${tileCoords.x}/${tileCoords.y}.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Markers */}
        {markers.map(marker => {
          const isUser = marker.type === 'user';

          // Calculate relative position within the visible area
          const latDiff = marker.lat - center.lat;
          const lngDiff = marker.lng - center.lng;

          // Convert to percentage positions
          const leftPercent = 50 + (lngDiff * 100);
          const topPercent = 50 - (latDiff * 100);

          return (
            <div
              key={marker.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-full"
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                zIndex: isUser ? 20 : 10
              }}
              onClick={() => handleMarkerClick(marker)}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${isUser ? 'bg-blue-500' : 'bg-green-500'
                  }`}
                title={isUser ? 'Your Location' : marker.vendor?.name}
              />
            </div>
          );
        })}

        {/* Info Window */}
        {selectedMarker && selectedMarker.type === 'vendor' && selectedMarker.vendor && (
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-30">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{selectedMarker.vendor.name}</h3>
              <button
                onClick={closeInfoWindow}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-2">{selectedMarker.vendor.description}</p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Rating:</strong> ⭐ {selectedMarker.vendor.rating}/5
            </p>
            {selectedMarker.distance && (
              <p className="text-sm text-gray-600 mb-1">
                <strong>Distance:</strong> {selectedMarker.distance.toFixed(1)} km
              </p>
            )}
            <p className="text-sm text-gray-600 mb-1">
              <strong>Items:</strong> {selectedMarker.vendorItems?.length || 0} available
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Hours:</strong> {selectedMarker.vendor.businessHours.open} - {selectedMarker.vendor.businessHours.close}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Days:</strong> {selectedMarker.vendor.businessHours.days.join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Results counter */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md z-10">
        <p className="text-sm font-medium text-gray-700">
          {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-2 z-10">
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => setZoom(Math.min(zoom + 1, 18))}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center"
          >
            +
          </button>
          <button
            onClick={() => setZoom(Math.max(zoom - 1, 8))}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center"
          >
            −
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md z-10">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Your Location</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Vendors</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;