import { Vendor, ProduceItem, VendorAuth, UserLocation } from '../types';

const STORAGE_KEYS = {
  VENDORS: 'produce-app-vendors',
  ITEMS: 'produce-app-items',
  AUTH: 'produce-app-auth',
  USER_LOCATION: 'produce-app-user-location',
  CURRENT_USER: 'produce-app-current-user'
};

export const StorageUtils = {
  // Vendors
  saveVendors: (vendors: Vendor[]): void => {
    localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(vendors));
  },

  getVendors: (): Vendor[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.VENDORS);
    return stored ? JSON.parse(stored) : [];
  },

  updateVendor: (vendor: Vendor): void => {
    const vendors = StorageUtils.getVendors();
    const index = vendors.findIndex(v => v.id === vendor.id);
    if (index !== -1) {
      vendors[index] = vendor;
      StorageUtils.saveVendors(vendors);
    }
  },

  // Produce Items
  saveItems: (items: ProduceItem[]): void => {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
  },

  getItems: (): ProduceItem[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.ITEMS);
    if (stored) {
      const items = JSON.parse(stored);
      return items.map((item: any) => ({
        ...item,
        lastUpdated: new Date(item.lastUpdated)
      }));
    }
    return [];
  },

  addItem: (item: ProduceItem): void => {
    const items = StorageUtils.getItems();
    items.push(item);
    StorageUtils.saveItems(items);
  },

  updateItem: (item: ProduceItem): void => {
    const items = StorageUtils.getItems();
    const index = items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      items[index] = { ...item, lastUpdated: new Date() };
      StorageUtils.saveItems(items);
    }
  },

  deleteItem: (itemId: string): void => {
    const items = StorageUtils.getItems();
    const filtered = items.filter(i => i.id !== itemId);
    StorageUtils.saveItems(filtered);
  },

  getItemsByVendor: (vendorId: string): ProduceItem[] => {
    return StorageUtils.getItems().filter(item => item.vendorId === vendorId);
  },

  // Authentication
  saveAuth: (auth: VendorAuth[]): void => {
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(auth));
  },

  getAuth: (): VendorAuth[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.AUTH);
    return stored ? JSON.parse(stored) : [];
  },

  // Current User Session
  setCurrentUser: (vendorId: string): void => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, vendorId);
  },

  getCurrentUser: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  },

  clearCurrentUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  // User Location
  saveUserLocation: (location: UserLocation): void => {
    localStorage.setItem(STORAGE_KEYS.USER_LOCATION, JSON.stringify(location));
  },

  getUserLocation: (): UserLocation | null => {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_LOCATION);
    return stored ? JSON.parse(stored) : null;
  },

  // Initialize with sample data
  initializeData: (vendors: Vendor[], items: ProduceItem[], auth: VendorAuth[]): void => {
    if (StorageUtils.getVendors().length === 0) {
      StorageUtils.saveVendors(vendors);
    }
    if (StorageUtils.getItems().length === 0) {
      StorageUtils.saveItems(items);
    }
    if (StorageUtils.getAuth().length === 0) {
      StorageUtils.saveAuth(auth);
    }
  }
};