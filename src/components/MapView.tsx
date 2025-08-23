import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Vendor, ProduceItem, UserLocation, FilterOptions } from '../types';
import VendorMarker from './VendorMarker';
import { calculateDistance } from '../utils/calculations';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  vendors: Vendor[];
  items: ProduceItem[];
  userLocation: UserLocation | null;
  filters: FilterOptions;
}

const userIcon = L.divIcon({
  html: `
    <div style="
      background-color: #3B82F6;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>
  `,
  className: 'user-location-marker',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const MapView: React.FC<MapViewProps> = ({ vendors, items, userLocation, filters }) => {
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [vendorDistances, setVendorDistances] = useState<Map<string, number>>(new Map());

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

  // Default center (NYC)
  const center: [number, number] = userLocation 
    ? [userLocation.lat, userLocation.lng] 
    : [40.7128, -74.0060];

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={center}
        zoom={userLocation ? 13 : 11}
        className="h-full w-full"
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* User location marker */}
        {userLocation && (
          <>
            <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            </Marker>
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={userLocation.accuracy}
              pathOptions={{ color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.1 }}
            />
          </>
        )}

        {/* Vendor markers */}
        {filteredVendors.map(vendor => (
          <VendorMarker
            key={vendor.id}
            vendor={vendor}
            items={items.filter(item => item.vendorId === vendor.id)}
            distance={vendorDistances.get(vendor.id)}
            userLocation={userLocation}
          />
        ))}
      </MapContainer>

      {/* Results counter */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md z-[1000]">
        <p className="text-sm font-medium text-gray-700">
          {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''} found
        </p>
      </div>
    </div>
  );
};

export default MapView;