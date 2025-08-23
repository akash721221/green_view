export interface Location {
  lat: number;
  lng: number;
}

export interface Vendor {
  id: string;
  name: string;
  location: Location;
  contact: {
    phone: string;
    email: string;
  };
  businessHours: {
    open: string;
    close: string;
    days: string[];
  };
  specialties: string[];
  rating: number;
  description: string;
  isActive: boolean;
}

export interface ProduceItem {
  id: string;
  name: string;
  category: ProduceCategory;
  pricePerKg: number;
  quantity: number;
  description: string;
  vendorId: string;
  lastUpdated: Date;
  isAvailable: boolean;
  imageUrl?: string;
}

export type ProduceCategory = 'Vegetables' | 'Fruits' | 'Organic' | 'Local' | 'Seasonal';

export interface VendorAuth {
  username: string;
  password: string;
  vendorId: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy: number;
}

export interface FilterOptions {
  categories: ProduceCategory[];
  maxDistance: number;
  searchTerm: string;
  sortBy: 'distance' | 'rating' | 'name';
}