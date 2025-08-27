import React from 'react';
import { ArrowLeft, Star, MapPin, Clock, Phone, Mail } from 'lucide-react';
import { Vendor, ProduceItem } from '../types';

interface VendorDetailsPageProps {
  vendor: Vendor;
  items: ProduceItem[];
  onBack: () => void;
  userLocation?: { lat: number; lng: number } | null;
  distance?: number;
}

const VendorDetailsPage: React.FC<VendorDetailsPageProps> = ({ 
  vendor, 
  items, 
  onBack, 
  userLocation,
  distance 
}) => {
  const availableItems = items.filter(item => item.isAvailable);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Map
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{vendor.name}</h1>
              <p className="text-sm text-gray-600">{vendor.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Vendor Info Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-lg font-semibold">{vendor.rating}</span>
                  <span className="ml-1 text-gray-600">/5</span>
                </div>
                {distance && (
                  <div className="flex items-center ml-4 text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{distance.toFixed(1)} km away</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{vendor.businessHours.open} - {vendor.businessHours.close}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{vendor.contact.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{vendor.contact.email}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {vendor.specialties.map(specialty => (
                  <span 
                    key={specialty}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium text-gray-900 mb-2">Business Days</h3>
                <p className="text-gray-600 text-sm">{vendor.businessHours.days.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Available Items ({availableItems.length})
            </h2>
          </div>
          
          {availableItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {availableItems.map(item => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {item.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-semibold text-green-600">
                        ₹{item.pricePerKg}/kg
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Available</p>
                      <p className="text-sm font-medium">{item.quantity} kg</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Last updated: {item.lastUpdated.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <p>No items currently available from this vendor.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDetailsPage;