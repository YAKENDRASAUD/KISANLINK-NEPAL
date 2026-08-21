import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Sprout,
  ShoppingCart,
  Shield,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { UserRole } from '../../types';
import { FarmerLoginPage } from './FarmerLoginPage';
import { BuyerLoginPage } from './BuyerLoginPage';
import { AdminLoginPage } from './AdminLoginPage';

interface LoginPageProps {
  initialRole?: UserRole;
  onNavigate: (tab: string, payload?: any) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ initialRole = 'farmer', onNavigate }) => {
  const [activePortal, setActivePortal] = useState<UserRole>(initialRole);

  if (activePortal === 'farmer') {
    return <FarmerLoginPage onNavigate={onNavigate} />;
  }

  if (activePortal === 'buyer') {
    return <BuyerLoginPage onNavigate={onNavigate} />;
  }

  if (activePortal === 'admin') {
    return <AdminLoginPage onNavigate={onNavigate} />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      {/* Portal Selection Gateway */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/25">
          <Sprout className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 font-display tracking-tight">
          Select Your KisanLink Portal
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Choose your account type to access your specialized dashboard, tools, and workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Farmer Portal Card */}
        <div
          onClick={() => setActivePortal('farmer')}
          className="group bg-white p-6 rounded-3xl border-2 border-emerald-100 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                किसान पोर्टल
              </span>
              <h2 className="text-xl font-black text-slate-900 font-display">Farmer Portal</h2>
              <p className="text-xs text-slate-500 mt-1">
                List harvests, check AI market rates, join collective group selling pools, and track payments.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>0% Middleman Brokerage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>AI Price Discovery</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>SMS OTP Login</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            className="w-full mt-6 py-2.5 bg-emerald-600 group-hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Farmer Login</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Buyer Portal Card */}
        <div
          onClick={() => setActivePortal('buyer')}
          className="group bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                थोक खरिददार
              </span>
              <h2 className="text-xl font-black text-slate-900 font-display">Wholesale Buyer</h2>
              <p className="text-xs text-slate-500 mt-1">
                Direct procurement for hotels, supermarkets, restaurants, and agro-processors.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Consolidated VAT Invoices</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>QR Traceability & QC</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>PAN / VAT Sign In</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            className="w-full mt-6 py-2.5 bg-slate-900 group-hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Buyer Login</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Admin Portal Card */}
        <div
          onClick={() => setActivePortal('admin')}
          className="group bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-emerald-600 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                नियामक तथा मन्त्रालय
              </span>
              <h2 className="text-xl font-black text-slate-900 font-display">Ministry / Admin</h2>
              <p className="text-xs text-slate-500 mt-1">
                National agricultural oversight, price surveillance, KYC approval, and consignment auditing.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Farmer KYC Verification</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>National GMV Analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>2FA Protected Console</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            className="w-full mt-6 py-2.5 bg-slate-800 group-hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Admin Login</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Registration link */}
      <div className="text-center pt-4">
        <p className="text-xs text-slate-500">
          Don't have an account yet?{' '}
          <button
            onClick={() => onNavigate('register')}
            className="font-bold text-emerald-700 hover:underline cursor-pointer"
          >
            Create a free KisanLink account
          </button>
        </p>
      </div>

    </div>
  );
};
