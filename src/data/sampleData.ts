import { Vendor, ProduceItem, VendorAuth } from '../types';

export const sampleVendors: Vendor[] = [
  {
    id: 'vendor-1',
    name: 'Fresh Fields Farm',
    location: { lat: 40.7128, lng: -74.0060 },
    contact: { phone: '+1-555-0101', email: 'contact@freshfields.com' },
    businessHours: { open: '07:00', close: '18:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    specialties: ['Organic Vegetables', 'Seasonal Fruits'],
    rating: 4.8,
    description: 'Family-owned organic farm specializing in fresh, locally grown produce',
    isActive: true
  },
  {
    id: 'vendor-2',
    name: 'Urban Garden Market',
    location: { lat: 40.7589, lng: -73.9851 },
    contact: { phone: '+1-555-0102', email: 'hello@urbangarden.com' },
    businessHours: { open: '06:00', close: '20:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    specialties: ['Leafy Greens', 'Herbs', 'Microgreens'],
    rating: 4.6,
    description: 'Urban vertical farm providing fresh greens year-round',
    isActive: true
  },
  {
    id: 'vendor-3',
    name: 'Valley Fruit Co.',
    location: { lat: 40.7505, lng: -73.9934 },
    contact: { phone: '+1-555-0103', email: 'orders@valleyfruit.com' },
    businessHours: { open: '08:00', close: '17:00', days: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    specialties: ['Seasonal Fruits', 'Stone Fruits'],
    rating: 4.7,
    description: 'Premium fruit supplier with direct farm partnerships',
    isActive: true
  },
  {
    id: 'vendor-4',
    name: 'Green Harvest Organics',
    location: { lat: 40.7282, lng: -73.7949 },
    contact: { phone: '+1-555-0104', email: 'info@greenharvest.org' },
    businessHours: { open: '07:30', close: '16:30', days: ['Mon', 'Wed', 'Fri', 'Sat'] },
    specialties: ['Certified Organic', 'Root Vegetables'],
    rating: 4.9,
    description: 'Certified organic farm committed to sustainable farming practices',
    isActive: true
  },
  {
    id: 'vendor-5',
    name: 'Riverside Produce',
    location: { lat: 40.6892, lng: -74.0445 },
    contact: { phone: '+1-555-0105', email: 'sales@riversideproduce.com' },
    businessHours: { open: '05:00', close: '15:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    specialties: ['Bulk Vegetables', 'Restaurant Supply'],
    rating: 4.4,
    description: 'Wholesale and retail produce supplier serving restaurants and consumers',
    isActive: true
  },
  {
    id: 'vendor-6',
    name: 'Sunshine Citrus Grove',
    location: { lat: 40.7831, lng: -73.9712 },
    contact: { phone: '+1-555-0106', email: 'grove@sunshinecitrus.com' },
    businessHours: { open: '09:00', close: '18:00', days: ['Thu', 'Fri', 'Sat', 'Sun'] },
    specialties: ['Citrus Fruits', 'Tropical Fruits'],
    rating: 4.5,
    description: 'Specialty citrus and tropical fruit importer',
    isActive: true
  },
  {
    id: 'vendor-7',
    name: 'Heritage Seed Farm',
    location: { lat: 40.6782, lng: -73.9442 },
    contact: { phone: '+1-555-0107', email: 'heritage@seedfarm.com' },
    businessHours: { open: '08:00', close: '16:00', days: ['Wed', 'Thu', 'Fri', 'Sat'] },
    specialties: ['Heirloom Varieties', 'Rare Vegetables'],
    rating: 4.8,
    description: 'Preserving agricultural heritage with heirloom and rare variety produce',
    isActive: true
  },
  {
    id: 'vendor-8',
    name: 'Fresh Creek Gardens',
    location: { lat: 40.7614, lng: -73.9776 },
    contact: { phone: '+1-555-0108', email: 'gardens@freshcreek.com' },
    businessHours: { open: '07:00', close: '19:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    specialties: ['Mixed Vegetables', 'Seasonal Selection'],
    rating: 4.3,
    description: 'Community-supported agriculture with diverse seasonal offerings',
    isActive: true
  },
  {
    id: 'vendor-9',
    name: 'Mountain View Orchards',
    location: { lat: 40.8176, lng: -73.9782 },
    contact: { phone: '+1-555-0109', email: 'orchards@mountainview.com' },
    businessHours: { open: '10:00', close: '17:00', days: ['Fri', 'Sat', 'Sun'] },
    specialties: ['Tree Fruits', 'Seasonal Berries'],
    rating: 4.6,
    description: 'Family orchard specializing in apples, pears, and seasonal berries',
    isActive: true
  },
  {
    id: 'vendor-10',
    name: 'Downtown Farmers Collective',
    location: { lat: 40.7416, lng: -74.0016 },
    contact: { phone: '+1-555-0110', email: 'collective@downtownfarmers.com' },
    businessHours: { open: '06:00', close: '18:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    specialties: ['Local Produce', 'Artisan Vegetables'],
    rating: 4.7,
    description: 'Cooperative of local farmers bringing fresh produce to the city center',
    isActive: true
  }
];

export const sampleProduceItems: ProduceItem[] = [
  // Fresh Fields Farm
  { id: 'item-1', name: 'Organic Tomatoes', category: 'Vegetables', pricePerKg: 4.50, quantity: 25, description: 'Vine-ripened organic tomatoes', vendorId: 'vendor-1', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-2', name: 'Fresh Basil', category: 'Vegetables', pricePerKg: 12.00, quantity: 8, description: 'Aromatic fresh basil leaves', vendorId: 'vendor-1', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-3', name: 'Seasonal Apples', category: 'Fruits', pricePerKg: 3.20, quantity: 40, description: 'Crisp seasonal apple varieties', vendorId: 'vendor-1', lastUpdated: new Date(), isAvailable: true },
  
  // Urban Garden Market
  { id: 'item-4', name: 'Baby Spinach', category: 'Vegetables', pricePerKg: 8.50, quantity: 15, description: 'Tender baby spinach leaves', vendorId: 'vendor-2', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-5', name: 'Microgreens Mix', category: 'Vegetables', pricePerKg: 25.00, quantity: 5, description: 'Assorted microgreens blend', vendorId: 'vendor-2', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-6', name: 'Fresh Arugula', category: 'Vegetables', pricePerKg: 7.80, quantity: 12, description: 'Peppery fresh arugula', vendorId: 'vendor-2', lastUpdated: new Date(), isAvailable: true },
  
  // Valley Fruit Co.
  { id: 'item-7', name: 'Premium Peaches', category: 'Fruits', pricePerKg: 5.50, quantity: 30, description: 'Juicy tree-ripened peaches', vendorId: 'vendor-3', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-8', name: 'Sweet Cherries', category: 'Fruits', pricePerKg: 8.20, quantity: 18, description: 'Sweet red cherries', vendorId: 'vendor-3', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-9', name: 'Nectarines', category: 'Fruits', pricePerKg: 4.80, quantity: 22, description: 'Fresh yellow nectarines', vendorId: 'vendor-3', lastUpdated: new Date(), isAvailable: true },
  
  // Green Harvest Organics
  { id: 'item-10', name: 'Organic Carrots', category: 'Vegetables', pricePerKg: 2.90, quantity: 35, description: 'Certified organic carrots', vendorId: 'vendor-4', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-11', name: 'Organic Potatoes', category: 'Vegetables', pricePerKg: 2.20, quantity: 50, description: 'Organic russet potatoes', vendorId: 'vendor-4', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-12', name: 'Organic Onions', category: 'Vegetables', pricePerKg: 2.50, quantity: 28, description: 'Organic yellow onions', vendorId: 'vendor-4', lastUpdated: new Date(), isAvailable: true },
  
  // Riverside Produce
  { id: 'item-13', name: 'Green Cabbage', category: 'Vegetables', pricePerKg: 1.80, quantity: 45, description: 'Fresh green cabbage heads', vendorId: 'vendor-5', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-14', name: 'Red Bell Peppers', category: 'Vegetables', pricePerKg: 4.20, quantity: 20, description: 'Crisp red bell peppers', vendorId: 'vendor-5', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-15', name: 'Cucumber', category: 'Vegetables', pricePerKg: 2.40, quantity: 32, description: 'Fresh crisp cucumbers', vendorId: 'vendor-5', lastUpdated: new Date(), isAvailable: true },
  
  // Sunshine Citrus Grove
  { id: 'item-16', name: 'Navel Oranges', category: 'Fruits', pricePerKg: 3.60, quantity: 40, description: 'Sweet navel oranges', vendorId: 'vendor-6', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-17', name: 'Ruby Grapefruit', category: 'Fruits', pricePerKg: 3.20, quantity: 25, description: 'Juicy ruby grapefruit', vendorId: 'vendor-6', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-18', name: 'Fresh Limes', category: 'Fruits', pricePerKg: 4.80, quantity: 15, description: 'Zesty fresh limes', vendorId: 'vendor-6', lastUpdated: new Date(), isAvailable: true },
  
  // Heritage Seed Farm
  { id: 'item-19', name: 'Purple Carrots', category: 'Vegetables', pricePerKg: 5.20, quantity: 12, description: 'Heirloom purple carrots', vendorId: 'vendor-7', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-20', name: 'Rainbow Chard', category: 'Vegetables', pricePerKg: 6.80, quantity: 10, description: 'Colorful rainbow Swiss chard', vendorId: 'vendor-7', lastUpdated: new Date(), isAvailable: true },
  
  // Fresh Creek Gardens
  { id: 'item-21', name: 'Mixed Lettuce', category: 'Vegetables', pricePerKg: 4.50, quantity: 18, description: 'Seasonal lettuce mix', vendorId: 'vendor-8', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-22', name: 'Fresh Corn', category: 'Vegetables', pricePerKg: 3.20, quantity: 30, description: 'Sweet corn on the cob', vendorId: 'vendor-8', lastUpdated: new Date(), isAvailable: true },
  
  // Mountain View Orchards
  { id: 'item-23', name: 'Honeycrisp Apples', category: 'Fruits', pricePerKg: 4.20, quantity: 35, description: 'Crisp Honeycrisp apples', vendorId: 'vendor-9', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-24', name: 'Fresh Berries Mix', category: 'Fruits', pricePerKg: 12.50, quantity: 8, description: 'Seasonal berry assortment', vendorId: 'vendor-9', lastUpdated: new Date(), isAvailable: true },
  
  // Downtown Farmers Collective
  { id: 'item-25', name: 'Artisan Mushrooms', category: 'Vegetables', pricePerKg: 9.50, quantity: 12, description: 'Local specialty mushroom varieties', vendorId: 'vendor-10', lastUpdated: new Date(), isAvailable: true },
  { id: 'item-26', name: 'Farm Fresh Eggs', category: 'Local', pricePerKg: 6.20, quantity: 20, description: 'Free-range farm fresh eggs', vendorId: 'vendor-10', lastUpdated: new Date(), isAvailable: true },
];

export const vendorCredentials: VendorAuth[] = [
  { username: 'fresh_fields', password: 'farm2024', vendorId: 'vendor-1' },
  { username: 'urban_garden', password: 'green2024', vendorId: 'vendor-2' },
  { username: 'valley_fruit', password: 'fruit2024', vendorId: 'vendor-3' },
  { username: 'green_harvest', password: 'organic2024', vendorId: 'vendor-4' },
  { username: 'riverside', password: 'produce2024', vendorId: 'vendor-5' },
  { username: 'sunshine_citrus', password: 'citrus2024', vendorId: 'vendor-6' },
  { username: 'heritage_seed', password: 'heritage2024', vendorId: 'vendor-7' },
  { username: 'fresh_creek', password: 'gardens2024', vendorId: 'vendor-8' },
  { username: 'mountain_view', password: 'orchards2024', vendorId: 'vendor-9' },
  { username: 'downtown_farmers', password: 'collective2024', vendorId: 'vendor-10' },
];