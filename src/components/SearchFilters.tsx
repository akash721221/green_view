import React from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { FilterOptions, ProduceCategory } from '../types';

interface SearchFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  userLocation: { lat: number; lng: number } | null;
}

const CATEGORIES: ProduceCategory[] = ['Vegetables', 'Fruits', 'Organic', 'Local', 'Seasonal'];
const SORT_OPTIONS = [
  { value: 'distance', label: 'Distance' },
  { value: 'rating', label: 'Rating' },
  { value: 'name', label: 'Name' }
];

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFiltersChange, userLocation }) => {
  // Reset all filters to show everything
  React.useEffect(() => {
    onFiltersChange({
      categories: [],
      maxDistance: 1000, // Set to very high value (1000km)
      searchTerm: '',
      sortBy: 'distance'
    });
  }, []);

  const handleSearchChange = (searchTerm: string) => {
    onFiltersChange({ ...filters, searchTerm });
  };

  const handleCategoryToggle = (category: ProduceCategory) => {
    const categories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories });
  };

  const handleDistanceChange = (maxDistance: number) => {
    onFiltersChange({ ...filters, maxDistance });
  };

  const handleSortChange = (sortBy: 'distance' | 'rating' | 'name') => {
    onFiltersChange({ ...filters, sortBy });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search for produce or vendors..."
            value={filters.searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Categories */}
          <div className="flex-1 min-w-0">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="inline w-4 h-4 mr-1" />
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.categories.includes(category)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Distance Filter */}
          {userLocation && (
            <div className="flex-none">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Max Distance
              </label>
              <select
                value={filters.maxDistance}
                onChange={(e) => handleDistanceChange(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value={5}>5 km</option>
                <option value={10}>10 km</option>
                <option value={25}>25 km</option>
                <option value={50}>50 km</option>
                <option value={100}>100 km</option>
              </select>
            </div>
          )}

          {/* Sort Options */}
          <div className="flex-none">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;