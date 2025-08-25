import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, LayersControl } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Vendor, ProduceItem, UserLocation, FilterOptions } from '../types';
import { calculateDistance } from '../utils/calculations';

// Component to update map center when user location changes
const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
};

interface MapViewProps {
  vendors: Vendor[];
  items: ProduceItem[];
  userLocation: UserLocation | null;
  filters: FilterOptions;
}

const MapView: React.FC<MapViewProps> = ({ vendors, items, userLocation, filters }) => {
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [vendorDistances, setVendorDistances] = useState<Map<string, number>>(new Map());
  const [mapCenter, setMapCenter] = useState<[number, number]>([28.6139, 77.2090]); // Default to Delhi
  const [mapZoom, setMapZoom] = useState(15); // Zoom level 15 shows approximately 3km radius
  const mapRef = useRef<L.Map | null>(null);
  const DEFAULT_ZOOM = 18; // 3km radius zoom level

  // Filter vendors based on search criteria
  useEffect(() => {
    // Show ALL active vendors without any filtering restrictions
    let filtered = vendors.filter(vendor => vendor.isActive);

    // Only apply search filter if there's a search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(vendor => {
        const vendorItems = items.filter(item => item.vendorId === vendor.id);
        return vendor.name.toLowerCase().includes(searchLower) ||
          vendor.specialties.some(specialty => specialty.toLowerCase().includes(searchLower)) ||
          vendorItems.some(item => item.name.toLowerCase().includes(searchLower));
      });
    }

    // Calculate distances and apply distance filter
    const distances = new Map<string, number>();
    if (userLocation) {
      filtered.forEach(vendor => {
        const distance = calculateDistance(userLocation, vendor.location);
        distances.set(vendor.id, distance);
      });

      // Remove distance filtering - show all vendors regardless of distance
    }

    // Sort by distance if user location is available, otherwise by name
    filtered.sort((a, b) => {
      if (!userLocation) return a.name.localeCompare(b.name);
      const distA = distances.get(a.id) || 0;
      const distB = distances.get(b.id) || 0;
      return distA - distB;
    });

    setFilteredVendors(filtered);
    setVendorDistances(distances);
  }, [vendors, items, userLocation, filters]);

  // Auto-center map on user location when available with appropriate zoom for 15km radius
  useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.lat, userLocation.lng]);
      setMapZoom(DEFAULT_ZOOM); // Zoom level that shows approximately 3km radius
    }
  }, [userLocation]);

  // Reset to default 3km radius view
  const resetToDefaultZoom = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.setView([userLocation.lat, userLocation.lng], DEFAULT_ZOOM, {
        animate: true,
        duration: 0.5
      });
    }
  };

  // Filter vendors within 15km radius
  const nearbyVendors = userLocation 
    ? vendors.filter(vendor => calculateDistance(userLocation, vendor.location) <= 15)
    : vendors;

  // Custom marker icons
  const createCustomIcon = (color: string) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  const userIcon = createCustomIcon('#3B82F6'); // Blue
  const vendorIcon = createCustomIcon('#10B981'); // Green

  return (
    <div className="h-full w-full relative">
      <MapContainer
        ref={mapRef}
        center={mapCenter}
        zoom={mapZoom}
        className="h-full w-full"
        zoomControl={true}
        attributionControl={true}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <MapUpdater center={mapCenter} zoom={mapZoom} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="Satellite">
            <MapUpdater center={mapCenter} zoom={mapZoom} />
            <TileLayer
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              maxZoom={19}
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="Terrain">
            <MapUpdater center={mapCenter} zoom={mapZoom} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              maxZoom={17}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* 3km default radius circle around user location */}
        {userLocation && (
          <Circle
            center={[userLocation.lat, userLocation.lng]}
            radius={3000} // 3km in meters
            pathOptions={{ color: '#22C55E', fillColor: '#22C55E', fillOpacity: 0.15, weight: 2, dashArray: '5, 5' }}
          />
        )}

        {/* 15km maximum search radius circle */}
        {userLocation && (
          <Circle
            center={[userLocation.lat, userLocation.lng]}
            radius={15000} // 15km in meters
            pathOptions={{ color: '#6B7280', fillColor: 'transparent', fillOpacity: 0, weight: 1, dashArray: '10, 10' }}
          />
        )}

        {/* User location marker with accuracy circle */}
        {userLocation && (
          <>
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={userIcon}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold text-blue-600">Your Location</h3>
                  <p className="text-sm text-gray-600">
                    Accuracy: ±{userLocation.accuracy.toFixed(0)}m
                  </p>
                </div>
              </Popup>
            </Marker>
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={userLocation.accuracy}
              pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2, weight: 2 }}
            />
          </>
        )}

        {/* Vendor markers */}
        {nearbyVendors.filter(v => v.isActive).map(vendor => {
          const vendorItems = items.filter(item => item.vendorId === vendor.id && item.isAvailable);
          const distance = vendorDistances.get(vendor.id);
          
          return (
            <Marker
              key={vendor.id}
              position={[vendor.location.lat, vendor.location.lng]}
              icon={vendorIcon}
            >
              <Popup maxWidth={300}>
                <div className="p-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{vendor.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{vendor.description}</p>
                  
                  <div className="space-y-1 text-sm">
                    <p><strong>Rating:</strong> ⭐ {vendor.rating}/5</p>
                    {distance && (
                      <p><strong>Distance:</strong> {distance.toFixed(1)} km</p>
                    )}
                    <p><strong>Items Available:</strong> {vendorItems.length}</p>
                    <p><strong>Hours:</strong> {vendor.businessHours.open} - {vendor.businessHours.close}</p>
                    <p><strong>Days:</strong> {vendor.businessHours.days.join(', ')}</p>
                  </div>

                  {vendorItems.length > 0 && (
                    <div className="mt-3">
                      <h4 className="font-medium text-gray-800 mb-1">Available Items:</h4>
                      <div className="max-h-32 overflow-y-auto">
                        {vendorItems.slice(0, 5).map(item => (
                          <div key={item.id} className="text-xs text-gray-600 mb-1">
                            • {item.name} - ₹{item.pricePerUnit}/{item.unit}
                          </div>
                        ))}
                        {vendorItems.length > 5 && (
                          <p className="text-xs text-gray-500">...and {vendorItems.length - 5} more</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Results counter */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md z-[1000]">
        <p className="text-sm font-medium text-gray-700">
          {nearbyVendors.filter(v => v.isActive).length} vendor{nearbyVendors.filter(v => v.isActive).length !== 1 ? 's' : ''} within search area
        </p>
        {userLocation && (
          <p className="text-xs text-gray-600 mt-1">
            📍 Location detected with {userLocation.accuracy.toFixed(0)}m accuracy
          </p>
        )}
      </div>

      {/* Map controls and quality indicator */}
      <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md z-[1000]">
        <p className="text-xs font-medium text-green-600">
          🗺️ 3km Default View
        </p>
        <p className="text-xs text-gray-600">
          Default radius • High resolution
        </p>
        {userLocation && (
          <button
            onClick={resetToDefaultZoom}
            className="mt-2 w-full px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Reset to 3km View
          </button>
        )}
      </div>

      {/* Zoom level indicator */}
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded shadow-md z-[1000]">
        <p className="text-xs text-gray-600">3km default • 15km max search</p>
      </div>
    </div>
  );
};

export default MapView;