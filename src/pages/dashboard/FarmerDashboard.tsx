import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Product, Order } from '../../types';
import { api } from '../../services/api';
import confetti from 'canvas-confetti';
import {
  Sprout,
  Plus,
  QrCode,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  Phone,
  Sparkles,
  Layers,
  ArrowRight,
  Truck,
  Building2,
  Trash2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface FarmerDashboardProps {
  onNavigate: (tab: string, payload?: any) => void;
  onOpenQr: (batchId: string) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  onNavigate,
  onOpenQr,
}) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFarmerData = async () => {
    setLoading(true);
    try {
      const [pRes, oRes] = await Promise.all([
        api.getProducts({ farmerId: user?.id || 'user-farmer-1' }),
        api.getOrders({ farmerId: user?.id || 'user-farmer-1' }),
      ]);
      setProducts(pRes.products);
      setOrders(oRes.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmerData();
  }, [user]);

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await api.updateOrderStatus(orderId, status);
      if (res.success) {
        if (status === 'Accepted' || status === 'Completed') {
          confetti({ particleCount: 50, spread: 60 });
        }
        fetchFarmerData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to remove this harvest listing?')) {
      await api.deleteProduct(id);
      fetchFarmerData();
    }
  };

  const totalSalesRs = orders
    .filter((o) => o.status === 'Completed' || o.status === 'Accepted')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;

  const salesData = [
    { month: 'Jan', sales: 18000 },
    { month: 'Feb', sales: 24000 },
    { month: 'Mar', sales: 31000 },
    { month: 'Apr', sales: 28000 },
    { month: 'May', sales: 42000 },
    { month: 'Jun (Current)', sales: totalSalesRs > 0 ? totalSalesRs : 58000 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Farmer Profile Card Matching Reference Image */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
            alt={user?.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/40 shadow-sm"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                {user?.name || 'Ram K.'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                Verified Farmer
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {user?.location || 'Kavre, Bagmati'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                {user?.phone || '+977 9841234567'}
              </span>
            </p>
            <p className="text-[11px] text-slate-400">
              Farm Size: <strong className="text-slate-700">{user?.farmSize || '4 Ropani'}</strong> • Primary Crops: Tomato, Potato, Cauliflower
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => onNavigate('farmer-add-product')}
            className="flex-1 md:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 cursor-pointer transition-all hover:scale-102"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Harvest</span>
          </button>
          <button
            onClick={() => onNavigate('ai-price-advisor')}
            className="flex-1 md:flex-none px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>AI Price Advisor</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Farm Revenue',
            value: `Rs. ${(totalSalesRs || 145000).toLocaleString()}`,
            sub: '+28% higher than middleman rate',
            icon: DollarSign,
            color: 'text-emerald-700',
            bg: 'bg-emerald-50',
          },
          {
            label: 'Active Harvest Listings',
            value: products.length,
            sub: 'Available on Marketplace',
            icon: Sprout,
            color: 'text-teal-700',
            bg: 'bg-teal-50',
          },
          {
            label: 'Pending Purchase Orders',
            value: pendingOrdersCount,
            sub: 'Awaiting your confirmation',
            icon: Clock,
            color: 'text-amber-700',
            bg: 'bg-amber-50',
          },
          {
            label: 'Completed Dispatches',
            value: orders.filter((o) => o.status === 'Completed').length + 4,
            sub: 'Panauti Hub verified',
            icon: CheckCircle2,
            color: 'text-emerald-700',
            bg: 'bg-emerald-50',
          },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">{kpi.label}</span>
                <div className={`w-8 h-8 rounded-lg ${kpi.bg} ${kpi.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900 font-display">{kpi.value}</p>
              <p className="text-[11px] text-slate-400 font-medium">{kpi.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Listings & Orders (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Active Product Listings Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base font-display">
                  My Active Harvest Listings ({products.length})
                </h3>
                <p className="text-xs text-slate-500">Live on KisanLink Marketplace</p>
              </div>
              <button
                onClick={() => onNavigate('farmer-add-product')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer flex items-center gap-1"
              >
                <span>+ Add Harvest</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Harvest</th>
                    <th className="py-3 px-4">Quantity</th>
                    <th className="py-3 px-4">Listed Price</th>
                    <th className="py-3 px-4">Quality</th>
                    <th className="py-3 px-4">Traceability QR</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-900 text-xs">{p.name}</p>
                            <p className="text-[10px] text-slate-400">{p.batchId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {p.quantity} {p.unit}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-emerald-700 text-sm">
                        Rs. {p.price}/{p.unit}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          {p.quality}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => onOpenQr(p.batchId)}
                          className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-lg border border-slate-200 text-[11px] font-bold cursor-pointer transition-colors"
                        >
                          <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                          <span>QR Passport</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Incoming Orders Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base font-display">
                  Incoming Purchase Orders ({orders.length})
                </h3>
                <p className="text-xs text-slate-500">Orders placed by verified commercial buyers</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Buyer</th>
                    <th className="py-3 px-4">Product & Qty</th>
                    <th className="py-3 px-4">Total (Rs.)</th>
                    <th className="py-3 px-4">Delivery Mode</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{o.buyerName}</p>
                        <p className="text-[10px] text-slate-400">{o.buyerPhone}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-800">{o.productName}</p>
                        <p className="text-[10px] text-slate-500">{o.quantity} {o.unit}</p>
                      </td>
                      <td className="py-3.5 px-4 font-black text-emerald-800 text-sm">
                        Rs. {o.total.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                        {o.deliveryType}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            o.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : o.status === 'Accepted'
                              ? 'bg-blue-100 text-blue-800'
                              : o.status === 'Rejected'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        {o.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleUpdateOrderStatus(o.id, 'Accepted')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[11px] font-bold cursor-pointer"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleUpdateOrderStatus(o.id, 'Rejected')}
                              className="px-2 py-1 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-md text-[11px] font-bold cursor-pointer"
                            >
                              Decline
                            </button>
                          </>
                        )}
                        {o.status === 'Accepted' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(o.id, 'Completed')}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-[11px] font-bold cursor-pointer"
                          >
                            Mark Dispatched
                          </button>
                        )}
                        {o.status === 'Completed' && (
                          <span className="text-[11px] text-emerald-700 font-bold">Paid ✓</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Revenue Chart & Quick Hub Info (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm font-display">
                Monthly Farm Payouts (Rs.)
              </h3>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Direct Deposits
              </span>
            </div>
            
            <div className="h-44 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#064e3b',
                      color: '#fff',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Bar dataKey="sales" fill="#059669" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Designated Collection Center */}
          <div className="bg-emerald-50/70 p-5 rounded-3xl border border-emerald-100 space-y-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-700" />
              <h4 className="font-extrabold text-slate-900 text-sm font-display">
                Your Assigned Drop-Off Hub
              </h4>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-900">Kavre Collection Center (Panauti Hub)</p>
              <p>Supervisor: Bikash Shrestha (+977 9841987654)</p>
              <p className="text-emerald-700 font-semibold">Open: 06:00 AM - 07:00 PM</p>
              <p className="text-[11px] text-slate-500 pt-1">
                Bring your QR batch tags for instant digital scale registration and crate loading.
              </p>
            </div>
          </div>

          {/* Group Selling Shortcut */}
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-5 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Bulk Demand Alert</span>
            </div>
            <h4 className="font-bold text-sm font-display">
              Kathmandu Supermarket needs 500kg Tomatoes!
            </h4>
            <p className="text-xs text-slate-300">
              Join the Kavre pool to contribute 50kg or 100kg lots at Rs. 80/kg.
            </p>
            <button
              onClick={() => onNavigate('group-selling')}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
            >
              Join Group Pool
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
