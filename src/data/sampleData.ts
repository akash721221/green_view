import { Vendor, ProduceItem, VendorAuth } from '../types';

// Sample vendor data
export const vendors: Vendor[] = [
  {
    id: 'vendor-1',
    name: 'Fresh Farm Market',
    description: 'Organic produce from local farms',
    location: { lat: 28.6139, lng: 77.2090 }, // Delhi
    rating: 4.5,
    specialties: ['Organic', 'Vegetables', 'Fruits'],
    contact: { phone: '+91-11-12345678', email: 'delhi@freshfarm.com' },
    businessHours: {
      open: '06:00',
      close: '20:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    isActive: true
  },
  {
    id: 'vendor-2',
    name: 'Mumbai Fresh Foods',
    description: 'Premium quality fruits and vegetables',
    location: { lat: 19.0760, lng: 72.8777 }, // Mumbai
    rating: 4.8,
    specialties: ['Premium', 'Exotic Fruits', 'Fresh Vegetables'],
    contact: { phone: '+91-22-12345678', email: 'mumbai@freshfoods.com' },
    businessHours: {
      open: '07:00',
      close: '21:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    isActive: true
  },
  {
    id: 'vendor-3',
    name: 'Bangalore Organic Hub',
    description: '100% organic and natural produce',
    location: { lat: 12.9716, lng: 77.5946 }, // Bangalore
    rating: 4.6,
    specialties: ['Organic', 'Natural', 'Herbs'],
    contact: { phone: '+91-80-12345678', email: 'bangalore@organichub.com' },
    businessHours: {
      open: '06:30',
      close: '19:30',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    isActive: true
  },
  {
    id: 'vendor-4',
    name: 'Chennai Fresh Market',
    description: 'Traditional and modern produce selection',
    location: { lat: 13.0827, lng: 80.2707 }, // Chennai
    rating: 4.3,
    specialties: ['Traditional', 'Local Produce', 'Spices'],
    contact: { phone: '+91-44-12345678', email: 'chennai@freshmarket.com' },
    businessHours: {
      open: '05:00',
      close: '18:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    isActive: true
  },
  {
    id: 'vendor-5',
    name: 'Kolkata Green Grocers',
    description: 'Fresh from the fields to your table',
    location: { lat: 22.5726, lng: 88.3639 }, // Kolkata
    rating: 4.4,
    specialties: ['Fresh', 'Local', 'Seasonal'],
    contact: { phone: '+91-33-12345678', email: 'kolkata@greengrocers.com' },
    businessHours: {
      open: '06:00',
      close: '20:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    isActive: true
  },
  {
    id: 'vendor-6',
    name: 'Hyderabad Fresh Foods',
    description: 'Premium quality produce at affordable prices',
    location: { lat: 17.3850, lng: 78.4867 }, // Hyderabad
    rating: 4.7,
    specialties: ['Premium', 'Affordable', 'Quality'],
    contact: { phone: '+91-40-12345678', email: 'hyderabad@freshfoods.com' },
    businessHours: {
      open: '07:00',
      close: '21:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    isActive: true
  },
  {
    id: 'vendor-7',
    name: 'Pune Organic Market',
    description: 'Organic and natural produce from local farmers',
    location: { lat: 18.5204, lng: 73.8567 }, // Pune
    rating: 4.5,
    specialties: ['Organic', 'Local Farmers', 'Natural'],
    contact: { phone: '+91-20-12345678', email: 'pune@organicmarket.com' },
    businessHours: {
      open: '06:30',
      close: '19:30',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    isActive: true
  },
  {
    id: 'vendor-8',
    name: 'Ahmedabad Fresh Hub',
    description: 'Traditional Gujarati produce and modern selections',
    location: { lat: 23.0225, lng: 72.5714 }, // Ahmedabad
    rating: 4.2,
    specialties: ['Traditional', 'Gujarati', 'Modern'],
    contact: { phone: '+91-79-12345678', email: 'ahmedabad@freshhub.com' },
    businessHours: {
      open: '06:00',
      close: '20:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    isActive: true
  },
  {
    id: 'vendor-9',
    name: 'Jaipur Royal Fruits',
    description: 'Premium fruits and vegetables fit for royalty',
    location: { lat: 26.9124, lng: 75.7873 }, // Jaipur
    rating: 4.6,
    specialties: ['Premium', 'Royal Quality', 'Exotic'],
    contact: { phone: '+91-141-12345678', email: 'jaipur@royalfruits.com' },
    businessHours: {
      open: '07:00',
      close: '21:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    isActive: true
  },
  {
    id: 'vendor-10',
    name: 'Lucknow Fresh Market',
    description: 'Traditional Awadhi produce and modern selections',
    location: { lat: 26.8467, lng: 80.9462 }, // Lucknow
    rating: 4.3,
    specialties: ['Traditional', 'Awadhi', 'Local'],
    contact: { phone: '+91-522-12345678', email: 'lucknow@freshmarket.com' },
    businessHours: {
      open: '06:00',
      close: '19:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    isActive: true
  },
  {
    id: 'vendor-11',
    name: 'Indore Fresh Foods',
    description: 'Central India\'s finest produce selection',
    location: { lat: 22.7196, lng: 75.8577 }, // Indore
    rating: 4.4,
    specialties: ['Central India', 'Fresh', 'Quality'],
    contact: { phone: '+91-731-12345678', email: 'indore@freshfoods.com' },
    businessHours: {
      open: '06:30',
      close: '20:30',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    isActive: true
  },
  {
    id: 'vendor-12',
    name: 'Bhopal Organic Market',
    description: 'Organic produce from the heart of India',
    location: { lat: 23.2599, lng: 77.4126 }, // Bhopal
    rating: 4.5,
    specialties: ['Organic', 'Heart of India', 'Natural'],
    contact: { phone: '+91-755-12345678', email: 'bhopal@organicmarket.com' },
    businessHours: {
      open: '06:00',
      close: '19:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    isActive: true
  },
  {
    id: 'vendor-13',
    name: 'Patna Fresh Hub',
    description: 'Bihar\'s finest fruits and vegetables',
    location: { lat: 25.5941, lng: 85.1376 }, // Patna
    rating: 4.2,
    specialties: ['Bihar', 'Local', 'Fresh'],
    contact: { phone: '+91-612-12345678', email: 'patna@freshhub.com' },
    businessHours: {
      open: '06:00',
      close: '20:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    isActive: true
  },
  {
    id: 'vendor-14',
    name: 'Chandigarh Premium Market',
    description: 'Premium quality produce in the city beautiful',
    location: { lat: 30.7333, lng: 76.7794 }, // Chandigarh
    rating: 4.7,
    specialties: ['Premium', 'City Beautiful', 'Quality'],
    contact: { phone: '+91-172-12345678', email: 'chandigarh@premiummarket.com' },
    businessHours: {
      open: '07:00',
      close: '21:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    isActive: true
  },
  {
    id: 'vendor-15',
    name: 'Dehradun Valley Fresh',
    description: 'Fresh produce from the Doon Valley',
    location: { lat: 30.3165, lng: 78.0322 }, // Dehradun
    rating: 4.6,
    specialties: ['Doon Valley', 'Fresh', 'Natural'],
    contact: { phone: '+91-135-12345678', email: 'dehradun@valleyfresh.com' },
    businessHours: {
      open: '06:30',
      close: '19:30',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    isActive: true
  }
];

// Sample produce items
export const items: ProduceItem[] = [
  // Vendor 1 - Delhi
  { id: 'item-1', name: 'Fresh Tomatoes', category: 'Vegetables', pricePerKg: 40, quantity: 25, description: 'Fresh red tomatoes from local farms', vendorId: 'vendor-1', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-2', name: 'Organic Onions', category: 'Organic', pricePerKg: 30, quantity: 30, description: 'Organic onions grown without pesticides', vendorId: 'vendor-1', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-3', name: 'Sweet Corn', category: 'Vegetables', pricePerKg: 50, quantity: 20, description: 'Sweet and tender corn on the cob', vendorId: 'vendor-1', lastUpdated: new Date(), isAvailable: true },

  // Vendor 2 - Mumbai
  { id: 'item-4', name: 'Alphonso Mangoes', category: 'Fruits', pricePerKg: 120, quantity: 15, description: 'Premium Alphonso mangoes from Maharashtra', vendorId: 'vendor-2', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-5', name: 'Fresh Spinach', category: 'Vegetables', pricePerKg: 25, quantity: 40, description: 'Fresh green spinach leaves', vendorId: 'vendor-2', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-6', name: 'Green Peas', category: 'Vegetables', pricePerKg: 60, quantity: 25, description: 'Sweet green peas', vendorId: 'vendor-2', lastUpdated: new Date(), isAvailable: true },

  // Vendor 3 - Bangalore
  { id: 'item-7', name: 'Organic Carrots', category: 'Organic', pricePerKg: 45, quantity: 30, description: 'Organic carrots rich in vitamins', vendorId: 'vendor-3', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-8', name: 'Fresh Mint', category: 'Local', pricePerKg: 20, quantity: 50, description: 'Fresh aromatic mint leaves', vendorId: 'vendor-3', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-9', name: 'Organic Potatoes', category: 'Organic', pricePerKg: 35, quantity: 40, description: 'Organic potatoes from local farms', vendorId: 'vendor-3', lastUpdated: new Date(), isAvailable: true },

  // Vendor 4 - Chennai
  { id: 'item-10', name: 'Fresh Curry Leaves', category: 'Local', pricePerKg: 15, quantity: 60, description: 'Fresh curry leaves for authentic South Indian cooking', vendorId: 'vendor-4', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-11', name: 'Local Bananas', category: 'Fruits', pricePerKg: 40, quantity: 35, description: 'Sweet local bananas', vendorId: 'vendor-4', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-12', name: 'Fresh Ginger', category: 'Vegetables', pricePerKg: 80, quantity: 20, description: 'Fresh ginger root', vendorId: 'vendor-4', lastUpdated: new Date(), isAvailable: true },

  // Vendor 5 - Kolkata
  { id: 'item-13', name: 'Fresh Fish', category: 'Local', pricePerKg: 200, quantity: 10, description: 'Fresh fish from local waters', vendorId: 'vendor-5', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-14', name: 'Local Rice', category: 'Local', pricePerKg: 60, quantity: 50, description: 'Local aromatic rice varieties', vendorId: 'vendor-5', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-15', name: 'Fresh Mustard Greens', category: 'Vegetables', pricePerKg: 30, quantity: 30, description: 'Fresh mustard greens for traditional Bengali dishes', vendorId: 'vendor-5', lastUpdated: new Date(), isAvailable: true },

  // Vendor 6 - Hyderabad
  { id: 'item-16', name: 'Premium Grapes', category: 'Fruits', pricePerKg: 150, quantity: 20, description: 'Premium quality grapes', vendorId: 'vendor-6', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-17', name: 'Fresh Capsicum', category: 'Vegetables', pricePerKg: 70, quantity: 25, description: 'Fresh green capsicum', vendorId: 'vendor-6', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-18', name: 'Organic Cauliflower', category: 'Organic', pricePerKg: 55, quantity: 20, description: 'Organic cauliflower heads', vendorId: 'vendor-6', lastUpdated: new Date(), isAvailable: true },

  // Vendor 7 - Pune
  { id: 'item-19', name: 'Fresh Strawberries', category: 'Fruits', pricePerKg: 180, quantity: 15, description: 'Fresh sweet strawberries', vendorId: 'vendor-7', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-20', name: 'Organic Broccoli', category: 'Organic', pricePerKg: 90, quantity: 15, description: 'Organic broccoli florets', vendorId: 'vendor-7', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-21', name: 'Fresh Basil', category: 'Local', pricePerKg: 25, quantity: 40, description: 'Fresh basil leaves', vendorId: 'vendor-7', lastUpdated: new Date(), isAvailable: true },

  // Vendor 8 - Ahmedabad
  { id: 'item-22', name: 'Fresh Methi', category: 'Vegetables', pricePerKg: 20, quantity: 45, description: 'Fresh methi leaves for Gujarati dishes', vendorId: 'vendor-8', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-23', name: 'Local Pomegranate', category: 'Fruits', pricePerKg: 100, quantity: 25, description: 'Sweet local pomegranates', vendorId: 'vendor-8', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-24', name: 'Fresh Coriander', category: 'Local', pricePerKg: 15, quantity: 50, description: 'Fresh coriander leaves', vendorId: 'vendor-8', lastUpdated: new Date(), isAvailable: true },

  // Vendor 9 - Jaipur
  { id: 'item-25', name: 'Premium Apples', category: 'Fruits', pricePerKg: 200, quantity: 20, description: 'Premium quality apples', vendorId: 'vendor-9', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-26', name: 'Fresh Carrots', category: 'Vegetables', pricePerKg: 40, quantity: 30, description: 'Fresh orange carrots', vendorId: 'vendor-9', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-27', name: 'Organic Beetroot', category: 'Organic', pricePerKg: 50, quantity: 20, description: 'Organic beetroot', vendorId: 'vendor-9', lastUpdated: new Date(), isAvailable: true },

  // Vendor 10 - Lucknow
  { id: 'item-28', name: 'Fresh Mangoes', category: 'Fruits', pricePerKg: 80, quantity: 30, description: 'Fresh sweet mangoes', vendorId: 'vendor-10', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-29', name: 'Local Onions', category: 'Local', pricePerKg: 25, quantity: 40, description: 'Local red onions', vendorId: 'vendor-10', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-30', name: 'Fresh Garlic', category: 'Vegetables', pricePerKg: 60, quantity: 25, description: 'Fresh garlic bulbs', vendorId: 'vendor-10', lastUpdated: new Date(), isAvailable: true },

  // Vendor 11 - Indore
  { id: 'item-31', name: 'Fresh Oranges', category: 'Fruits', pricePerKg: 70, quantity: 30, description: 'Fresh sweet oranges', vendorId: 'vendor-11', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-32', name: 'Local Tomatoes', category: 'Local', pricePerKg: 35, quantity: 35, description: 'Local red tomatoes', vendorId: 'vendor-11', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-33', name: 'Fresh Lemons', category: 'Fruits', pricePerKg: 45, quantity: 40, description: 'Fresh yellow lemons', vendorId: 'vendor-11', lastUpdated: new Date(), isAvailable: true },

  // Vendor 12 - Bhopal
  { id: 'item-34', name: 'Organic Spinach', category: 'Organic', pricePerKg: 30, quantity: 35, description: 'Organic spinach leaves', vendorId: 'vendor-12', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-35', name: 'Fresh Cucumber', category: 'Vegetables', pricePerKg: 25, quantity: 40, description: 'Fresh green cucumbers', vendorId: 'vendor-12', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-36', name: 'Local Radish', category: 'Local', pricePerKg: 20, quantity: 45, description: 'Local white radish', vendorId: 'vendor-12', lastUpdated: new Date(), isAvailable: true },

  // Vendor 13 - Patna
  { id: 'item-37', name: 'Fresh Litchi', category: 'Fruits', pricePerKg: 120, quantity: 20, description: 'Fresh sweet litchi from Bihar', vendorId: 'vendor-13', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-38', name: 'Local Potatoes', category: 'Local', pricePerKg: 30, quantity: 50, description: 'Local potatoes', vendorId: 'vendor-13', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-39', name: 'Fresh Brinjal', category: 'Vegetables', pricePerKg: 40, quantity: 25, description: 'Fresh purple brinjal', vendorId: 'vendor-13', lastUpdated: new Date(), isAvailable: true },

  // Vendor 14 - Chandigarh
  { id: 'item-40', name: 'Premium Pears', category: 'Fruits', pricePerKg: 180, quantity: 15, description: 'Premium quality pears', vendorId: 'vendor-14', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-41', name: 'Fresh Bell Peppers', category: 'Vegetables', pricePerKg: 80, quantity: 20, description: 'Fresh colorful bell peppers', vendorId: 'vendor-14', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-42', name: 'Organic Mushrooms', category: 'Organic', pricePerKg: 120, quantity: 10, description: 'Organic button mushrooms', vendorId: 'vendor-14', lastUpdated: new Date(), isAvailable: true },

  // Vendor 15 - Dehradun
  { id: 'item-43', name: 'Fresh Apricots', category: 'Fruits', pricePerKg: 150, quantity: 20, description: 'Fresh apricots from the Doon Valley', vendorId: 'vendor-15', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-44', name: 'Local Peaches', category: 'Fruits', pricePerKg: 100, quantity: 25, description: 'Local sweet peaches', vendorId: 'vendor-15', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-45', name: 'Fresh Green Beans', category: 'Vegetables', pricePerKg: 45, quantity: 30, description: 'Fresh green beans', vendorId: 'vendor-15', lastUpdated: new Date(), isAvailable: true }
];

// Vendor authentication data
export const vendorAuth: VendorAuth[] = [
  { vendorId: 'vendor-1', username: 'freshfarm', password: 'delhi123' },
  { vendorId: 'vendor-2', username: 'mumbaifresh', password: 'mumbai456' },
  { vendorId: 'vendor-3', username: 'bangaloreorganic', password: 'bangalore789' },
  { vendorId: 'vendor-4', username: 'chennaifresh', password: 'chennai321' },
  { vendorId: 'vendor-5', username: 'kolkatagreen', password: 'kolkata654' },
  { vendorId: 'vendor-6', username: 'hyderabadfresh', password: 'hyderabad987' },
  { vendorId: 'vendor-7', username: 'puneorganic', password: 'pune123' },
  { vendorId: 'vendor-8', username: 'ahmedabadfresh', password: 'ahmedabad456' },
  { vendorId: 'vendor-9', username: 'jaipurroyal', password: 'jaipur789' },
  { vendorId: 'vendor-10', username: 'lucknowfresh', password: 'lucknow321' },
  { vendorId: 'vendor-11', username: 'indorefresh', password: 'indore654' },
  { vendorId: 'vendor-12', username: 'bhopalorganic', password: 'bhopal987' },
  { vendorId: 'vendor-13', username: 'patnafresh', password: 'patna123' },
  { vendorId: 'vendor-14', username: 'chandigarhpremium', password: 'chandigarh456' },
  { vendorId: 'vendor-15', username: 'dehradunvalley', password: 'dehradun789' }
];