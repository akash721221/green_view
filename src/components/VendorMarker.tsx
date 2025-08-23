import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Store, Clock, Phone, Mail, Star, ShoppingBag } from 'lucide-react';
import { Vendor, ProduceItem } from '../types';
import { formatDistance } from '../utils/calculations';

interface VendorMarkerProps {
  vendor: Vendor;
  items: ProduceItem[];
  distance?: number;
  userLocation?: { lat: number; lng: number } | null;
}

// Custom marker icon
const createCustomIcon = (isActive: boolean) => {
  const color = isActive ? '#22C55E' : '#9CA3AF';
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
        </svg>
      </div>
    `,
    className: 'custom-vendor-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const VendorMarker: React.FC<VendorMarkerProps> = ({ vendor, items, distance, userLocation }) => {
  const availableItems = items.filter(item => item.isAvailable);
  const categories = [...new Set(availableItems.map(item => item.category))];

  return (
    <Marker
      position={[vendor.location.lat, vendor.location.lng]}
      icon={createCustomIcon(vendor.isActive)}
    >
      <Popup minWidth={300} maxWidth={400}>
        <div className="p-2">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{vendor.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{vendor.rating}</span>
                </div>
                {distance && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mx-1">•</span>
                    <span>{formatDistance(distance)}</span>
                  </div>
                )}
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              vendor.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              {vendor.isActive ? 'Open' : 'Closed'}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3">{vendor.description}</p>

          {/* Specialties */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {vendor.specialties.map(specialty => (
                <span
                  key={specialty}
                  className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Available Items */}
          {availableItems.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center mb-2">
                <ShoppingBag className="w-4 h-4 text-gray-600 mr-1" />
                <span className="text-sm font-medium text-gray-700">
                  Available Today ({availableItems.length} items)
                </span>
              </div>
              <div className="max-h-20 overflow-y-auto">
                {availableItems.slice(0, 5).map(item => (
                  <div key={item.id} className="flex justify-between items-center py-1 text-xs">
                    <span className="text-gray-700">{item.name}</span>
                    <span className="font-medium text-green-600">${item.pricePerKg.toFixed(2)}/kg</span>
                  </div>
                ))}
                {availableItems.length > 5 && (
                  <div className="text-xs text-gray-500 mt-1">
                    +{availableItems.length - 5} more items
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Business Hours */}
          <div className="mb-3">
            <div className="flex items-center mb-1">
              <Clock className="w-4 h-4 text-gray-600 mr-1" />
              <span className="text-sm font-medium text-gray-700">Hours</span>
            </div>
            <div className="text-xs text-gray-600">
              <div>{vendor.businessHours.days.join(', ')}</div>
              <div>{vendor.businessHours.open} - {vendor.businessHours.close}</div>
            </div>
          </div>

          {/* Contact */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-600">
                <Phone className="w-3 h-3 mr-1" />
                <span>{vendor.contact.phone}</span>
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <Mail className="w-3 h-3 mr-1" />
                <span>{vendor.contact.email}</span>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default VendorMarker;