import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldCheck,
  Shield,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  FileCheck,
  Building2,
  TrendingUp,
  Sprout,
  ShoppingCart,
  AlertCircle,
} from 'lucide-react';

interface AdminLoginPageProps {
  onNavigate: (tab: string, payload?: any) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigate }) => {
  const { login, switchDemoRole } = useAuth();
  const [authMethod, setAuthMethod] = useState<'email' | 'officerId'>('email');
  const [email, setEmail] = useState('admin@kisanlink.demo');
  const [officerId, setOfficerId] = useState('MOALD-INSP-2026-09');
  const [password, setPassword] = useState('kisanlink2026');
  const [securityToken, setSecurityToken] = useState('892041');
  const [use2FA, setUse2FA] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const identifier = authMethod === 'email' ? email : 'admin@kisanlink.demo';
    const success = await login(identifier, 'admin');
    setLoading(false);
    if (success) {
      onNavigate('admin-dashboard');
    }
  };

  const handleQuickAdminLogin = () => {
    switchDemoRole('admin');
    onNavigate('admin-dashboard');
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Role Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/90 border border-slate-700 p-2 rounded-2xl shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 px-3">
            <span>Select Login Portal:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => onNavigate('login-farmer')}
              className="px-3.5 py-1.5 rounded-xl text-slate-300 hover:text-emerald-400 hover:bg-slate-700/60 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sprout className="w-3.5 h-3.5 text-emerald-400" />
              <span>🌾 Farmer Portal</span>
            </button>
            <button
              onClick={() => onNavigate('login-buyer')}
              className="px-3.5 py-1.5 rounded-xl text-slate-300 hover:text-emerald-400 hover:bg-slate-700/60 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
              <span>🛒 Buyer Portal</span>
            </button>
            <button
              onClick={() => onNavigate('login-admin')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>🛡️ Admin Portal</span>
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-white backdrop-blur-sm">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-[11px] font-bold border border-emerald-700/60 uppercase tracking-wider">
                  MoALD Governance
                </span>
              </div>

              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-700/80 text-slate-300 text-[11px] font-bold uppercase tracking-wider mb-2 border border-slate-600">
                  National Agricultural Oversight
                </span>
                <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white leading-tight">
                  Platform Oversight & Compliance Terminal
                </h1>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Ministry of Agriculture and Livestock Development & Regional Cooperative Oversight Dashboard.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>KYC & Land Verification:</strong> Approve farmer certificates, verify organic quality badges, and authenticate collection centers.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>National Price Transparency:</strong> Monitor real-time Kalimati vs farm-gate spreads to detect price gouging or dumping.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <FileCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Group Escrow & Payout Audits:</strong> Authorize collective group-selling escrow releases and dispute resolutions.
                  </span>
                </div>
              </div>
            </div>

            {/* Official Security Disclaimer */}
            <div className="mt-6 pt-4 border-t border-slate-700/70 relative z-10 flex items-center gap-2 text-[11px] text-slate-400">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Restricted access for authorized MoALD & KisanLink platform personnel only.</span>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Form Title */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 font-display">
                    Administrator Sign In
                  </h2>
                  <p className="text-xs text-slate-500">
                    Enter your government credentials and two-factor security token
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-200">
                  🛡️
                </div>
              </div>

              {/* Fast 1-Click Demo Admin Banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                    alt="Sita Nepal"
                    className="w-9 h-9 rounded-full object-cover border border-emerald-500"
                  />
                  <div>
                    <p className="text-xs font-bold text-emerald-950">Sita Nepal (Admin Demo)</p>
                    <p className="text-[11px] text-emerald-700">Ministry of Agriculture • Platform Supervisor</p>
                  </div>
                </div>
                <button
                  type="button"
                  id="admin-quick-login-btn"
                  onClick={handleQuickAdminLogin}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1 transition-all"
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
                  <span>Officer Email</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('officerId')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMethod === 'officerId'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Gov Officer ID</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {authMethod === 'email' ? (
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Official Department Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@kisanlink.demo"
                        required
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Government Inspector / Officer Badge ID
                    </label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={officerId}
                        onChange={(e) => setOfficerId(e.target.value)}
                        placeholder="MOALD-INSP-2026-09"
                        required
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold tracking-wide text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Master Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* 2FA Token input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">
                      2-Factor Authentication Code (TOTP)
                    </label>
                    <span className="text-[11px] text-emerald-700 font-semibold">Demo Code: 892041</span>
                  </div>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-2.5 w-4 h-4 text-emerald-600" />
                    <input
                      type="text"
                      value={securityToken}
                      onChange={(e) => setSecurityToken(e.target.value)}
                      placeholder="892041"
                      required
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold tracking-widest text-emerald-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md shadow-slate-900/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all hover:scale-[1.01]"
                >
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>{loading ? 'Authenticating Officer Credentials...' : 'Access National Admin Console'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Bottom Support Notice */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <span>Need administrative clearance or password reset?</span>
              <span className="font-bold text-slate-800">support.gov@kisanlink.np</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
