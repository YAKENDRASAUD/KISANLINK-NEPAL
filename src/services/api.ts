import {
  User,
  Product,
  Order,
  MarketPrice,
  GroupSelling,
  CollectionCenter,
  StorageFacility,
  TraceabilityBatch,
  AiPriceAdvisorRequest,
  AiPriceAdvisorResponse,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_MARKET_PRICES,
  INITIAL_GROUPS,
  INITIAL_COLLECTION_CENTERS,
  INITIAL_STORAGE,
  INITIAL_TRACEABILITY,
} from '../data/seedData';

const BASE_URL = '/api';

export const api = {
  // Auth
  async login(email: string, role?: string): Promise<{ success: boolean; user: User; token: string }> {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });
      if (!res.ok) throw new Error('Failed to login');
      return await res.json();
    } catch {
      const user = INITIAL_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase()) ||
        INITIAL_USERS.find((u) => u.role === role) ||
        INITIAL_USERS[0];
      return { success: true, user, token: 'demo-token' };
    }
  },

  async register(data: Partial<User>): Promise<{ success: boolean; user: User; token: string }> {
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Registration failed');
      }
      return await res.json();
    } catch (err: any) {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: data.name || 'Farmer Ram',
        email: data.email || 'farmer@kisanlink.demo',
        role: data.role || 'farmer',
        phone: data.phone || '+977 9800000000',
        location: data.location || 'Kavre, Bagmati',
        verified: false,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString().split('T')[0],
      };
      return { success: true, user: newUser, token: 'demo-token' };
    }
  },

  // Products
  async getProducts(params?: {
    category?: string;
    location?: string;
    farmerId?: string;
    search?: string;
    quality?: string;
    sort?: string;
  }): Promise<{ products: Product[]; count: number }> {
    try {
      const query = new URLSearchParams();
      if (params?.category) query.append('category', params.category);
      if (params?.location) query.append('location', params.location);
      if (params?.farmerId) query.append('farmerId', params.farmerId);
      if (params?.search) query.append('search', params.search);
      if (params?.quality) query.append('quality', params.quality);
      if (params?.sort) query.append('sort', params.sort);

      const res = await fetch(`${BASE_URL}/products?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return await res.json();
    } catch {
      return { products: INITIAL_PRODUCTS, count: INITIAL_PRODUCTS.length };
    }
  },

  async getProductById(id: string): Promise<{ product: Product }> {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`);
      if (!res.ok) throw new Error('Product not found');
      return await res.json();
    } catch {
      const p = INITIAL_PRODUCTS.find((item) => item.id === id) || INITIAL_PRODUCTS[0];
      return { product: p };
    }
  },

  async createProduct(data: Partial<Product>): Promise<{ success: boolean; product: Product; batchId: string }> {
    try {
      const res = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create product');
      return await res.json();
    } catch {
      const batchId = `KLN-2026-PR-${Math.floor(100 + Math.random() * 900)}`;
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        farmerId: data.farmerId || 'user-farmer-1',
        farmerName: data.farmerName || 'Ram K.',
        farmerPhone: data.farmerPhone || '+977 9841234567',
        farmerLocation: data.farmerLocation || 'Kavre, Bagmati',
        farmerVerified: true,
        name: data.name || 'Fresh Organic Produce',
        category: data.category || 'Vegetables',
        quantity: data.quantity || 100,
        unit: data.unit || 'kg',
        price: data.price || 80,
        expectedPrice: data.expectedPrice || data.price || 80,
        quality: data.quality || 'Grade A',
        location: data.location || 'Kavre, Bagmati',
        harvestDate: data.harvestDate || 'Today',
        description: data.description || 'Farm-fresh harvest from Nepal.',
        image: data.image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
        batchId,
        status: 'Available',
        views: 1,
        createdAt: new Date().toISOString().split('T')[0],
      };
      return { success: true, product: newProduct, batchId };
    }
  },

  async deleteProduct(id: string): Promise<{ success: boolean }> {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' });
      return await res.json();
    } catch {
      return { success: true };
    }
  },

  // Orders
  async getOrders(params?: { farmerId?: string; buyerId?: string; status?: string }): Promise<{ orders: Order[] }> {
    try {
      const query = new URLSearchParams();
      if (params?.farmerId) query.append('farmerId', params.farmerId);
      if (params?.buyerId) query.append('buyerId', params.buyerId);
      if (params?.status) query.append('status', params.status);

      const res = await fetch(`${BASE_URL}/orders?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch orders');
      return await res.json();
    } catch {
      return { orders: INITIAL_ORDERS };
    }
  },

  async createOrder(data: {
    buyerId?: string;
    buyerName?: string;
    buyerPhone?: string;
    productId: string;
    quantity: number;
    deliveryType?: string;
    collectionCenterId?: string;
    collectionCenterName?: string;
    notes?: string;
  }): Promise<{ success: boolean; order: Order }> {
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to place order');
      return await res.json();
    } catch {
      const product = INITIAL_PRODUCTS.find((p) => p.id === data.productId) || INITIAL_PRODUCTS[0];
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        buyerId: data.buyerId || 'user-buyer-1',
        buyerName: data.buyerName || 'Rajesh S. (Kathmandu Fresh)',
        buyerPhone: data.buyerPhone || '+977 9849876543',
        farmerId: product.farmerId,
        farmerName: product.farmerName,
        farmerPhone: product.farmerPhone,
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        quantity: data.quantity,
        unit: product.unit,
        price: product.price,
        total: data.quantity * product.price,
        status: 'Pending',
        deliveryType: (data.deliveryType as any) || 'Collection Center',
        collectionCenterName: data.collectionCenterName || 'Kavre Collection Center',
        notes: data.notes || 'Order placed via KisanLink Nepal.',
        batchId: product.batchId,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      return { success: true, order: newOrder };
    }
  },

  async updateOrderStatus(id: string, status: string): Promise<{ success: boolean; order: Order }> {
    try {
      const res = await fetch(`${BASE_URL}/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      return await res.json();
    } catch {
      const ord = INITIAL_ORDERS.find((o) => o.id === id) || INITIAL_ORDERS[0];
      ord.status = status as any;
      return { success: true, order: ord };
    }
  },

  // AI Price Advisor
  async getAiPriceAdvisor(request: AiPriceAdvisorRequest): Promise<AiPriceAdvisorResponse> {
    try {
      const res = await fetch(`${BASE_URL}/ai/price-advisor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (!res.ok) throw new Error('AI price analysis error');
      return await res.json();
    } catch {
      return {
        product: request.product,
        location: request.location,
        quantity: request.quantity,
        quality: request.quality,
        suggestedMinPrice: 75,
        suggestedMaxPrice: 85,
        averageExpectedPrice: 80,
        marketTrend: 'Increasing',
        demandLevel: 'High',
        confidenceScore: 87,
        recommendation: `This is a good time to sell. High demand in ${request.location} & surrounding markets. Consider group selling to unlock bulk pricing.`,
        marketContext: 'Kalimati and regional Bagmati wholesale demand remains solid.',
        factors: [
          { name: 'Regional Market Demand', impact: 'Positive', description: 'Strong daily consumption pull in Kathmandu valley.' },
          { name: 'Quality Grade A', impact: 'Positive', description: 'Selected grade commands premium farm-gate rate.' },
          { name: 'Collection Center Access', impact: 'Neutral', description: 'Quick access to weighing and direct truck loading.' },
        ],
        priceTrendHistory: [
          { day: '30 May', price: 68 },
          { day: '31 May', price: 70 },
          { day: '1 Jun', price: 72 },
          { day: '2 Jun', price: 75 },
          { day: '3 Jun', price: 76 },
          { day: '4 Jun', price: 79 },
          { day: '5 Jun', price: 80 },
        ],
        groupSellingSuggestion: `Join with nearby ${request.location} farmers to consolidate at least 500 kg for high-value supermarket orders.`,
        isAiGenerated: false,
      };
    }
  },

  // AI Agri Chat (Kisan AI Saathi)
  async chatAi(message: string): Promise<{ reply: string }> {
    try {
      const res = await fetch(`${BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) throw new Error('AI chat error');
      return await res.json();
    } catch {
      return {
        reply: `Namaste! Based on current agricultural trends in Nepal, your inquiry regarding "${message.substring(0, 30)}..." is essential. Using KisanLink's collection centers and AI Price Advisor helps you secure optimal rates without intermediary losses. How else can I assist your farm today?`,
      };
    }
  },

  // Market Prices
  async getMarketPrices(params?: { product?: string; market?: string }): Promise<{ marketPrices: MarketPrice[] }> {
    try {
      const query = new URLSearchParams();
      if (params?.product) query.append('product', params.product);
      if (params?.market) query.append('market', params.market);

      const res = await fetch(`${BASE_URL}/market-prices?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch market prices');
      return await res.json();
    } catch {
      return { marketPrices: INITIAL_MARKET_PRICES };
    }
  },

  // Group Selling
  async getGroups(): Promise<{ groups: GroupSelling[] }> {
    try {
      const res = await fetch(`${BASE_URL}/groups`);
      if (!res.ok) throw new Error('Failed to fetch groups');
      return await res.json();
    } catch {
      return { groups: INITIAL_GROUPS };
    }
  },

  async joinGroup(groupId: string, data: { farmerId: string; farmerName: string; quantity: number }): Promise<{ success: boolean; group: GroupSelling }> {
    try {
      const res = await fetch(`${BASE_URL}/groups/${groupId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to join group');
      return await res.json();
    } catch {
      const grp = INITIAL_GROUPS.find((g) => g.id === groupId) || INITIAL_GROUPS[0];
      return { success: true, group: grp };
    }
  },

  async createGroup(data: any): Promise<{ success: boolean; group: GroupSelling }> {
    try {
      const res = await fetch(`${BASE_URL}/groups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch {
      return { success: true, group: INITIAL_GROUPS[0] };
    }
  },

  // Collection Centers
  async getCollectionCenters(): Promise<{ collectionCenters: CollectionCenter[] }> {
    try {
      const res = await fetch(`${BASE_URL}/collection-centers`);
      return await res.json();
    } catch {
      return { collectionCenters: INITIAL_COLLECTION_CENTERS };
    }
  },

  // Storage
  async getStorageFacilities(): Promise<{ storageFacilities: StorageFacility[] }> {
    try {
      const res = await fetch(`${BASE_URL}/storage`);
      return await res.json();
    } catch {
      return { storageFacilities: INITIAL_STORAGE };
    }
  },

  // Traceability
  async getTraceability(batchId: string): Promise<{ batch: TraceabilityBatch }> {
    try {
      const res = await fetch(`${BASE_URL}/traceability/${batchId}`);
      return await res.json();
    } catch {
      const batch = INITIAL_TRACEABILITY[batchId] || INITIAL_TRACEABILITY['KLN-2026-TM-049'];
      return { batch };
    }
  },

  // Admin
  async getAdminStatistics(): Promise<{ statistics: any }> {
    try {
      const res = await fetch(`${BASE_URL}/admin/statistics`);
      return await res.json();
    } catch {
      return {
        statistics: {
          totalFarmers: 10425,
          totalBuyers: 2153,
          totalProducts: 5188,
          totalOrders: 1284,
          totalSalesRs: 14890000,
          activeCollectionCenters: 50,
          pendingVerifications: 2,
          activeGroupPools: 3,
        },
      };
    }
  },

  async getAdminUsers(): Promise<{ users: User[] }> {
    try {
      const res = await fetch(`${BASE_URL}/admin/users`);
      return await res.json();
    } catch {
      return { users: INITIAL_USERS };
    }
  },

  async verifyUser(userId: string, verified: boolean): Promise<{ success: boolean; user: User }> {
    try {
      const res = await fetch(`${BASE_URL}/admin/users/${userId}/verify`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verified }),
      });
      return await res.json();
    } catch {
      const user = INITIAL_USERS.find((u) => u.id === userId) || INITIAL_USERS[0];
      user.verified = verified;
      return { success: true, user };
    }
  },
};
