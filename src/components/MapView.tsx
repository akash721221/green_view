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
  onVendorSelect?: (vendor: Vendor) => void;
}

const MapView: React.FC<MapViewProps> = ({ vendors, items, userLocation, filters, onVendorSelect }) => {
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [vendorDistances, setVendorDistances] = useState<Map<string, number>>(new Map());
  const [mapCenter, setMapCenter] = useState<[number, number]>([28.6139, 77.2090]); // Default to Delhi
  const [mapZoom, setMapZoom] = useState(17); // Zoom level 17 shows approximately 1km radius
  const mapRef = useRef<L.Map | null>(null);
  const DEFAULT_ZOOM = 17; // 1km radius zoom level

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

  // Reset to default 1km radius view
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

        {/* 1km default radius circle around user location */}

        {/* User location marker - center dot only */}
        {userLocation && (
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
        )}

        {/* 3 Fake vendors within 1km radius */}
        {userLocation && [
          {
            id: 'fake-vendor-1',
            name: 'Fresh Corner Market',
            lat: userLocation.lat + 0.003,
            lng: userLocation.lng + 0.004,
            rating: 4.5,
            items: ['Fresh Tomatoes - ₹40/kg', 'Organic Spinach - ₹30/kg', 'Local Onions - ₹25/kg']
          },
          {
            id: 'fake-vendor-2', 
            name: 'Green Valley Produce',
            lat: userLocation.lat - 0.005,
            lng: userLocation.lng + 0.002,
            rating: 4.7,
            items: ['Fresh Carrots - ₹35/kg', 'Sweet Corn - ₹50/kg', 'Green Peas - ₹60/kg']
          },
          {
            id: 'fake-vendor-3',
            name: 'Local Farm Store',
            lat: userLocation.lat + 0.002,
            lng: userLocation.lng - 0.006,
            rating: 4.3,
            items: ['Fresh Potatoes - ₹30/kg', 'Organic Broccoli - ₹80/kg', 'Bell Peppers - ₹70/kg']
          }
        ].map(vendor => (
          <Marker
            key={vendor.id}
            position={[vendor.lat, vendor.lng]}
            icon={vendorIcon}
          >
            <Popup maxWidth={300}>
              <div className="p-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{vendor.name}</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Rating:</strong> ⭐ {vendor.rating}/5</p>
                  <p><strong>Distance:</strong> {(Math.random() * 0.8 + 0.1).toFixed(1)} km</p>
                </div>
                <div className="mt-3">
                  <h4 className="font-medium text-gray-800 mb-1">Available Items:</h4>
                  <div className="max-h-32 overflow-y-auto">
                    {vendor.items.map((item, index) => (
                      <div key={index} className="text-xs text-gray-600 mb-1">
                        • {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                    <button
                      onClick={() => {
                        // Create a fake vendor object for the fake vendors
                        const fakeVendor: Vendor = {
                          id: vendor.id,
                          name: vendor.name,
                          location: { lat: vendor.lat, lng: vendor.lng },
                          contact: { phone: '+91-11-12345678', email: 'contact@vendor.com' },
                          businessHours: {
                            open: '06:00',
                            close: '20:00',
                            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                          },
                          specialties: ['Fresh', 'Local', 'Organic'],
                          rating: vendor.rating,
                          description: 'Fresh local produce from trusted farmers',
                          isActive: true
                        };
                        onVendorSelect?.(fakeVendor);
                      }}
                      className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                    >
                      More
                    </button>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
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

                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                    <button
                      onClick={() => onVendorSelect?.(vendor)}
                      className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                    >
                      More
                    </button>
                  </div>
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
          {nearbyVendors.filter(v => v.isActive).length + 3} vendor{nearbyVendors.filter(v => v.isActive).length + 3 !== 1 ? 's' : ''} within search area
        </p>
        {userLocation && (
          <p className="text-xs text-gray-600 mt-1">
            📍 Your location • 3 nearby vendors
          </p>
        )}
      </div>

      {/* Map controls and quality indicator */}
      <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md z-[1000]">
        <p className="text-xs font-medium text-green-600">
          🗺️ 1km Default View
        </p>
        <p className="text-xs text-gray-600">
          Default radius • High resolution
        </p>
        {userLocation && (
          <button
            onClick={resetToDefaultZoom}
            className="mt-2 w-full px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Reset to 1km View
          </button>
        )}
      </div>

      {/* Zoom level indicator */}
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded shadow-md z-[1000]">
        <p className="text-xs text-gray-600">1km default • 15km max search</p>
      </div>
    </div>
  );
};

export default MapView;