import React, { useState, useEffect } from 'react';
import { Leaf, MapPin, User, AlertCircle } from 'lucide-react';
import MapView from './components/MapView';
import SearchFilters from './components/SearchFilters';
import VendorLoginModal from './components/VendorLoginModal';
import VendorDashboard from './components/VendorDashboard';
import { Vendor, ProduceItem, UserLocation, FilterOptions } from './types';
import { StorageUtils } from './utils/storage';
import { getUserLocation } from './utils/calculations';
import { vendors, items, vendorAuth } from './data/sampleData';

const App: React.FC = () => {
  const [vendorsList, setVendorsList] = useState<Vendor[]>(vendors);
  const [itemsList, setItemsList] = useState<ProduceItem[]>(items);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentVendorId, setCurrentVendorId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    maxDistance: 1000, // Set to unlimited (1000km)
    searchTerm: '',
    sortBy: 'distance'
  });

  // Initialize data on app load
  useEffect(() => {
    StorageUtils.initializeData(vendors, items, vendorAuth);
    setVendorsList(StorageUtils.getVendors());
    setItemsList(StorageUtils.getItems());

    // Check for existing session
    const existingUser = StorageUtils.getCurrentUser();
    if (existingUser) {
      setCurrentVendorId(existingUser);
    }

    // Try to get saved user location
    const savedLocation = StorageUtils.getUserLocation();
    if (savedLocation) {
      setUserLocation(savedLocation);
    } else {
      // Automatically attempt to get user location on app load
      handleGetLocation();
    }
  }, []);

  // Get user location
  const handleGetLocation = async () => {
    setLocationLoading(true);
    setLocationError('');

    try {
      const location = await getUserLocation();
      setUserLocation(location);
      StorageUtils.saveUserLocation(location);
    } catch (error: any) {
      setLocationError(error.message || 'Failed to get location');
    } finally {
      setLocationLoading(false);
    }
  };

  const handleVendorLogin = (vendorId: string) => {
    setCurrentVendorId(vendorId);
  };

  const handleVendorLogout = () => {
    StorageUtils.clearCurrentUser();
    setCurrentVendorId(null);
  };

  // If vendor is logged in, show dashboard
  if (currentVendorId) {
    return <VendorDashboard vendorId={currentVendorId} onLogout={handleVendorLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Leaf className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Fresh Connect</h1>
                <p className="text-sm text-gray-600">Local Produce Market</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {!userLocation && (
                <button
                  onClick={handleGetLocation}
                  disabled={locationLoading}
                  className="flex items-center px-3 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-md transition-colors disabled:opacity-50"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {locationLoading ? 'Locating...' : 'Get Location'}
                </button>
              )}

              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors"
              >
                <User className="w-4 h-4 mr-2" />
                Vendor Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Location Error */}
          {locationError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-red-800">Location Access Required</p>
                <p className="text-sm text-red-700">{locationError}</p>
              </div>
              <button
                onClick={handleGetLocation}
                className="ml-auto px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-800 rounded transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
            {userLocation && (
              <div className="flex items-center px-3 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-md">
                <MapPin className="w-4 h-4 mr-2" />
                Location Active
              </div>
            )}


          {/* Search and Filters */}
          {/* <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            userLocation={userLocation}
          /> */}

          {/* Map */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '70vh' }}>
            <MapView
              vendors={vendorsList}
              items={itemsList}
              userLocation={userLocation}
              filters={filters}
            />
          </div>

          {/* Info Section */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">High-Quality Location-Based Vendor Discovery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Automatic Location Detection</h3>
                <p className="text-sm text-gray-600">GPS-powered location detection centers the map on your exact coordinates with high accuracy.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">High-Resolution Mapping</h3>
                <p className="text-sm text-gray-600">Multiple map layers including satellite, terrain, and street view with maximum clarity and detail.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Unlimited Range</h3>
                <p className="text-sm text-gray-600">No distance restrictions or filters - view all available vendors and locations in comprehensive detail.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Vendor Login Modal */}
      <VendorLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleVendorLogin}
      />
    </div>
  );
};

export default App;