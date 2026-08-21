import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Order } from '../../types';
import { api } from '../../services/api';
import {
  ShoppingCart,
  DollarSign,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  QrCode,
  Building2,
  Plus,
  ArrowRight,
  TrendingUp,
  Search,
} from 'lucide-react';

interface BuyerDashboardProps {
  onNavigate: (tab: string, payload?: any) => void;
  onOpenQr: (batchId: string) => void;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({
  onNavigate,
  onOpenQr,
}) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBuyerOrders = async () => {
    setLoading(true);
    try {
      const res = await api.getOrders({ buyerId: user?.id || 'user-buyer-1' });
      setOrders(res.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyerOrders();
  }, [user]);

  const totalProcured = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Accepted');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Buyer Profile Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
            alt={user?.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/40 shadow-sm"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                {user?.name || 'Kathmandu Fresh Wholesale'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
                Verified Buyer
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {user?.location || 'Kathmandu Valley'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                {user?.businessName || 'Hotels & Supermarket Sourcing'}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => onNavigate('marketplace')}
            className="w-full md:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Browse Farm Catalog</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Sourcing Spend',
            value: `Rs. ${(totalProcured || 85400).toLocaleString()}`,
            sub: 'Direct farm-gate rates',
            icon: DollarSign,
            color: 'text-emerald-700',
            bg: 'bg-emerald-50',
          },
          {
            label: 'Active Procurements',
            value: activeOrders.length,
            sub: 'In transit / preparation',
            icon: ShoppingCart,
            color: 'text-blue-700',
            bg: 'bg-blue-50',
          },
          {
            label: 'Verified Direct Farmers',
            value: 8,
            sub: 'Kavre, Chitwan & Mustang',
            icon: CheckCircle2,
            color: 'text-teal-700',
            bg: 'bg-teal-50',
          },
          {
            label: 'Delivered Batches',
            value: orders.filter((o) => o.status === 'Completed').length + 5,
            sub: '100% QR traceable',
            icon: Truck,
            color: 'text-amber-700',
            bg: 'bg-amber-50',
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

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base font-display">
              My Purchase Orders & Consignments ({orders.length})
            </h3>
            <p className="text-xs text-slate-500">Track order progress, logistics pickup, and batch QR passports</p>
          </div>
          <button
            onClick={() => onNavigate('marketplace')}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold border border-emerald-200 cursor-pointer"
          >
            + New Purchase Order
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Product & Volume</th>
                <th className="py-3 px-4">Farmer / Origin</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Fulfillment Mode</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{o.id}</p>
                    <p className="text-[10px] text-slate-400">{o.createdAt}</p>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {o.productName} ({o.quantity} {o.unit})
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{o.farmerName}</p>
                    <p className="text-[10px] text-slate-400">{o.farmerPhone}</p>
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
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onNavigate('traceability', { batchId: 'KLN-2026-TM-049' })}
                      className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-lg border border-slate-200 text-[11px] font-bold cursor-pointer"
                    >
                      Audit QR
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
