import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Product, User } from '../../types';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Users,
  Sprout,
  Building2,
  DollarSign,
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertCircle,
  FileText,
  Search,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Unverified demo users list for verification workflow
  const [pendingFarmers, setPendingFarmers] = useState([
    { id: 'f-1', name: 'Ganesh Thapa', location: 'Dhading', crop: 'Ginger & Turmeric', status: 'Pending KYC' },
    { id: 'f-2', name: 'Maya Tamang', location: 'Sindhupalchok', crop: 'Cardamom & Kiwi', status: 'Pending KYC' },
    { id: 'f-3', name: 'Birendra Chaudhary', location: 'Chitwan', crop: 'Sweet Corn & Mustard', status: 'Pending KYC' },
  ]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [sRes, pRes] = await Promise.all([
          api.getAdminStatistics(),
          api.getProducts({}),
        ]);
        setStats(sRes.statistics);
        setProducts(pRes.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleApproveFarmer = (id: string) => {
    confetti({ particleCount: 50, spread: 50 });
    setPendingFarmers((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>National Agri-Platform Governance & Supervision</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display">
            KisanLink Nepal Admin Console
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            Monitor nation-wide trade volume, verify smallholders, and manage collection center nodes.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Platform GMV',
            value: `Rs. ${(stats?.totalGmvRs || 14850000).toLocaleString()}`,
            sub: 'Transacted directly to farmers',
            icon: DollarSign,
            color: 'text-emerald-700',
            bg: 'bg-emerald-50',
          },
          {
            label: 'Registered Smallholders',
            value: (stats?.totalFarmers || 10420).toLocaleString(),
            sub: 'Across 7 provinces',
            icon: Sprout,
            color: 'text-teal-700',
            bg: 'bg-teal-50',
          },
          {
            label: 'Commercial Buyers',
            value: (stats?.totalBuyers || 2150).toLocaleString(),
            sub: 'Hotels, marts & traders',
            icon: Users,
            color: 'text-blue-700',
            bg: 'bg-blue-50',
          },
          {
            label: 'Active Collection Centers',
            value: stats?.collectionCenters || 50,
            sub: 'Panauti, Chitwan & hubs',
            icon: Building2,
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Pending Farmer Verifications (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm font-display">
                Farmer KYC Verification Queue
              </h3>
              <p className="text-xs text-slate-500">Review land ownership & cooperative identity</p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
              {pendingFarmers.length} Pending
            </span>
          </div>

          <div className="space-y-3">
            {pendingFarmers.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">All farmer KYC verifications completed!</p>
            ) : (
              pendingFarmers.map((f) => (
                <div
                  key={f.id}
                  className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <h4 className="font-bold text-slate-900">{f.name}</h4>
                    <p className="text-slate-500 text-[11px]">{f.location} • {f.crop}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleApproveFarmer(f.id)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Live Marketplace Auditing (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm font-display">
                Active Marketplace Consignments ({products.length})
              </h3>
              <p className="text-xs text-slate-500">Live batches circulating across Nepal</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Product</th>
                  <th className="py-2.5 px-3">Farmer</th>
                  <th className="py-2.5 px-3">Batch ID</th>
                  <th className="py-2.5 px-3">Price / Rate</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{p.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{p.farmerName}</td>
                    <td className="py-2.5 px-3 font-mono text-[10px] text-slate-500">{p.batchId}</td>
                    <td className="py-2.5 px-3 font-extrabold text-emerald-800">Rs. {p.price}/{p.unit}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
