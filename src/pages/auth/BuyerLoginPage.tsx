import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  ShoppingCart,
  Building2,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  FileText,
  Truck,
  ShieldCheck,
  Sprout,
  Shield,
  Layers,
  Search,
} from 'lucide-react';

interface BuyerLoginPageProps {
  onNavigate: (tab: string, payload?: any) => void;
}

export const BuyerLoginPage: React.FC<BuyerLoginPageProps> = ({ onNavigate }) => {
  const { login, switchDemoRole } = useAuth();
  const [authMethod, setAuthMethod] = useState<'email' | 'pan'>('email');
  const [email, setEmail] = useState('buyer@kisanlink.demo');
  const [panNumber, setPanNumber] = useState('601928472');
  const [password, setPassword] = useState('kisanlink2026');
  const [securityPin, setSecurityPin] = useState('8848');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const identifier = authMethod === 'email' ? email : 'buyer@kisanlink.demo';
    const success = await login(identifier, 'buyer');
    setLoading(false);
    if (success) {
      onNavigate('buyer-dashboard');
    }
  };

  const handleQuickBuyerLogin = () => {
    switchDemoRole('buyer');
    onNavigate('buyer-dashboard');
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-slate-100 via-white to-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Role Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 px-3">
            <span>Select Login Portal:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => onNavigate('login-farmer')}
              className="px-3.5 py-1.5 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>🌾 Farmer Portal</span>
            </button>
            <button
              onClick={() => onNavigate('login-buyer')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>🛒 Buyer Portal</span>
            </button>
            <button
              onClick={() => onNavigate('login-admin')}
              className="px-3.5 py-1.5 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>🛡️ Admin Portal</span>
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-white backdrop-blur-sm">
                  <Building2 className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-800/80">
                  Wholesale Procurement
                </span>
              </div>

              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-bold uppercase tracking-wider mb-2 border border-slate-700">
                  B2B Commercial Procurement
                </span>
                <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white leading-tight">
                  Direct Farm Sourcing for Wholesale, Supermarkets & Hospitality
                </h1>
                <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                  Connect directly with verified agricultural cooperatives and farmers across Nepal with transparent origin tracing and cold-chain dispatch.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Direct Farm-Gate Rates:</strong> Eliminate multi-tier broker markups; save 15-25% on wholesale produce procurement.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <Truck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Cold-Chain & Hub Logistics:</strong> Collect from certified hubs in Panauti, Bharatpur, or scheduled doorstep freight.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <FileText className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Consolidated VAT Invoices:</strong> Instant digital tax invoices, credit terms, and QR batch quality passport verification.
                  </span>
                </div>
              </div>
            </div>

            {/* Enterprise Support Box */}
            <div className="mt-6 pt-4 border-t border-slate-800 relative z-10 flex items-center justify-between text-xs text-slate-300">
              <span>B2B Institutional Supply Desk</span>
              <span className="font-bold text-emerald-400">b2b@kisanlink.np</span>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Form Title */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 font-display">
                    Commercial Buyer Sign In
                  </h2>
                  <p className="text-xs text-slate-500">
                    Manage wholesale purchase orders, pooled lot bids, and consignments
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs border border-slate-200">
                  🛒
                </div>
              </div>

              {/* Fast 1-Click Demo Buyer Banner */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="Rajesh S."
                    className="w-9 h-9 rounded-full object-cover border border-slate-400"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Rajesh Shrestha (Buyer Demo)</p>
                    <p className="text-[11px] text-slate-500">Kathmandu Fresh Wholesale • Hotel Supplier</p>
                  </div>
                </div>
                <button
                  type="button"
                  id="buyer-quick-login-btn"
                  onClick={handleQuickBuyerLogin}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1 transition-all"
                >
                  <span>1-Click Login</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Login Method Tabs */}
              <div className="flex rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setAuthMethod('email')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMethod === 'email'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Company Email & Password</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('pan')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMethod === 'pan'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Business PAN / VAT Number</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {authMethod === 'email' ? (
                  <>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Registered Business Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="buyer@kisanlink.demo"
                          required
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-slate-900 focus:bg-white focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Account Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-slate-900 focus:bg-white focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Nepal Inland Revenue Department PAN / VAT Number (9 Digits)
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={panNumber}
                          onChange={(e) => setPanNumber(e.target.value)}
                          placeholder="601928472"
                          required
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 tracking-wider focus:ring-2 focus:ring-slate-900 focus:bg-white focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Business Security PIN
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          type="password"
                          value={securityPin}
                          onChange={(e) => setSecurityPin(e.target.value)}
                          placeholder="••••"
                          required
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold tracking-widest focus:ring-2 focus:ring-slate-900 focus:bg-white focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md shadow-slate-900/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all hover:scale-[1.01]"
                >
                  <ShoppingCart className="w-4 h-4 text-emerald-400" />
                  <span>{loading ? 'Authenticating Buyer Portal...' : 'Sign In to Wholesale Buyer Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Bottom Registration CTA */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <span>New hotel, supermarket or institutional buyer?</span>
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="font-bold text-slate-900 hover:text-emerald-700 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Register Commercial Buyer Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
