export type UserRole = 'farmer' | 'buyer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  location: string;
  district?: string;
  province?: string;
  verified: boolean;
  avatar?: string;
  bio?: string;
  farmSize?: string;
  businessName?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerLocation: string;
  farmerVerified: boolean;
  farmerAvatar?: string;
  name: string;
  nepaliName?: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  expectedPrice?: number;
  quality: string;
  location: string;
  district?: string;
  harvestDate: string;
  description?: string;
  image: string;
  batchId: string;
  status: 'Available' | 'Sold Out' | 'In Group Pool' | 'Draft';
  views: number;
  createdAt: string;
  collectionCenterId?: string;
  collectionCenter?: string;
  allowGroupSelling?: boolean;
  isVerified?: boolean;
}

export type OrderStatus =
  | 'Pending'
  | 'Accepted'
  | 'Rejected'
  | 'Processing'
  | 'Ready for Collection'
  | 'Out for Delivery'
  | 'Completed';

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
  status: OrderStatus;
  deliveryType: 'Collection Center' | 'Direct Farm Pickup' | 'Doorstep Delivery';
  collectionCenterId?: string;
  collectionCenterName?: string;
  notes?: string;
  batchId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MarketPrice {
  id: string;
  product: string;
  category: string;
  market: string;
  minimumPrice: number;
  maximumPrice: number;
  averagePrice: number;
  unit: string;
  trend: 'Increasing' | 'Decreasing' | 'Stable';
  trendPercentage: number;
  demand: 'High' | 'Moderate' | 'Low';
  date: string;
  isDemoData: boolean;
  priceHistory: { date: string; price: number }[];
}

export interface GroupFarmerContribution {
  id: string;
  farmerId: string;
  name: string;
  quantity: number;
  percentage: number;
  joinedDate: string;
}

export interface GroupSelling {
  id: string;
  groupName: string;
  product: string;
  productImage: string;
  totalQuantity: number;
  targetQuantity: number;
  targetPrice: number;
  marketPrice: number;
  buyerRequirement: string;
  buyerName?: string;
  location: string;
  status: 'Open' | 'Target Reached' | 'Closed' | 'In Transit';
  daysLeft: number;
  farmers: GroupFarmerContribution[];
  description: string;
  createdAt: string;
}

export interface CollectionCenter {
  id: string;
  name: string;
  location: string;
  district: string;
  distance: string;
  capacity: number;
  availableCapacity: number;
  contactPerson: string;
  phone: string;
  status: 'Open' | 'Closed' | 'Full';
  operatingHours: string;
  services: string[];
}

export interface StorageFacility {
  id: string;
  name: string;
  location: string;
  district: string;
  capacity: number;
  availableCapacity: number;
  type: 'Cold Storage' | 'Dry Warehouse' | 'Ventilated Silo' | 'Controlled Atmosphere';
  contactPerson: string;
  phone: string;
  temperature: string;
  status: 'Available' | 'Limited' | 'Full';
  ratePerMonth: number;
}

export interface TraceabilityStep {
  step: string;
  title: string;
  location: string;
  timestamp: string;
  verifiedBy: string;
  status: 'completed' | 'current' | 'pending';
  notes?: string;
}

export interface TraceabilityBatch {
  batchId: string;
  productId: string;
  productName: string;
  category: string;
  farmerId: string;
  farmerName: string;
  farmLocation: string;
  harvestDate: string;
  quality: string;
  quantity: number;
  unit: string;
  collectionCenter: string;
  dispatchDate: string;
  verificationStatus: 'Verified' | 'Pending Verification' | 'Certified Organic';
  certifications: string[];
  qualityTests: {
    parameter: string;
    result: string;
    standard: string;
    passed: boolean;
  }[];
  timeline: TraceabilityStep[];
}

export interface AiPriceAdvisorRequest {
  product: string;
  location: string;
  quantity: number;
  unit?: string;
  quality: string;
  harvestDate?: string;
}

export interface AiPriceAdvisorResponse {
  product: string;
  location: string;
  quantity: number;
  quality: string;
  suggestedMinPrice: number;
  suggestedMaxPrice: number;
  averageExpectedPrice: number;
  marketTrend: 'Increasing' | 'Decreasing' | 'Stable';
  demandLevel: 'High' | 'Moderate' | 'Low';
  confidenceScore: number;
  recommendation: string;
  marketContext: string;
  factors: {
    name: string;
    impact: 'Positive' | 'Neutral' | 'Negative';
    description: string;
  }[];
  priceTrendHistory: {
    day: string;
    price: number;
  }[];
  groupSellingSuggestion?: string;
  isAiGenerated: boolean;
}
