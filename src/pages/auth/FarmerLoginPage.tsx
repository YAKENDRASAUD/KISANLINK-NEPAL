import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Sprout,
  Phone,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Languages,
  Headphones,
  Scale,
  Building2,
  ShoppingCart,
  Shield,
} from 'lucide-react';

interface FarmerLoginPageProps {
  onNavigate: (tab: string, payload?: any) => void;
}

export const FarmerLoginPage: React.FC<FarmerLoginPageProps> = ({ onNavigate }) => {
  const { login, switchDemoRole } = useAuth();
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('+977 9841234567');
  const [email, setEmail] = useState('ram@kisanlink.demo');
  const [password, setPassword] = useState('kisanlink2026');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [nepaliLang, setNepaliLang] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const identifier = authMethod === 'email' ? email : 'ram@kisanlink.demo';
    const success = await login(identifier, 'farmer');
    setLoading(false);
    if (success) {
      onNavigate('farmer-dashboard');
    }
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtp('5829'); // Auto-fill demo OTP
  };

  const handleQuickFarmerLogin = () => {
    switchDemoRole('farmer');
    onNavigate('farmer-dashboard');
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Role Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-emerald-100 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 px-3">
            <span>Select Login Portal:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => onNavigate('login-farmer')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>🌾 Farmer Portal</span>
            </button>
            <button
              onClick={() => onNavigate('login-buyer')}
              className="px-3.5 py-1.5 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
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
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center text-white backdrop-blur-sm">
                  <Sprout className="w-6 h-6 text-emerald-300" />
                </div>
                <button
                  type="button"
                  onClick={() => setNepaliLang(!nepaliLang)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 hover:bg-emerald-700 text-emerald-200 text-xs font-bold border border-emerald-500/40 cursor-pointer transition-colors"
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>{nepaliLang ? 'English' : 'नेपाली'}</span>
                </button>
              </div>

              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-700/80 text-emerald-200 text-[11px] font-bold uppercase tracking-wider mb-2 border border-emerald-500/40">
                  {nepaliLang ? 'नेपाली किसान पोर्टल' : 'Farmer Self-Service Portal'}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white leading-tight">
                  {nepaliLang ? 'आफ्नो उत्पादन सिधै बजारमा बेच्नुहोस्' : 'Sell Your Harvest Directly to Fair Markets'}
                </h1>
                <p className="text-emerald-200/80 text-xs mt-2 leading-relaxed">
                  {nepaliLang
                    ? 'कुनै दलाल बिना उचित मूल्य, तौल प्रमाणीकरण, र सहकारी समूह बिक्रीको सुविधा।'
                    : 'Zero middleman brokerage, guaranteed digital scale weighing, and instant buyer offers.'}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>{nepaliLang ? 'AI मूल्य सिफारिस' : 'AI Price Advisor'}:</strong>{' '}
                    {nepaliLang ? 'बजार दर अनुसार अधिकतम मूल्य पाउनुहोस्' : 'Accurate farm-gate benchmarks based on Kalimati wholesale rates'}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-emerald-100">
                  <Scale className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>{nepaliLang ? 'डिजिटल तौल केन्द्र' : 'Certified Weighing'}:</strong>{' '}
                    {nepaliLang ? 'स्थानीय संकलन केन्द्रबाट तत्काल भुक्तानी' : 'Digital scale custody receipts with immediate eSewa / Bank payout'}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-emerald-100">
                  <Building2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>{nepaliLang ? 'समूह बिक्री (Group Selling)' : 'Group Pooling'}:</strong>{' '}
                    {nepaliLang ? 'सानो उत्पादन जोडेर ठूला थोक अर्डर पूरा गर्नुहोस्' : 'Pool micro-lots with neighboring farmers for 20% higher return'}
                  </span>
                </div>
              </div>
            </div>

            {/* Helpline Box */}
            <div className="mt-6 pt-4 border-t border-emerald-700/60 relative z-10 flex items-center justify-between text-xs text-emerald-200">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-emerald-300" />
                <span>{nepaliLang ? 'किसान हेल्पलाइन (निःशुल्क)' : 'Farmer Support Helpline'}</span>
              </div>
              <span className="font-bold text-white bg-emerald-800/80 px-2 py-0.5 rounded border border-emerald-600">
                1660-01-KISAN
              </span>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Form Title */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 font-display">
                    {nepaliLang ? 'किसान लगइन' : 'Farmer Login'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {nepaliLang ? 'मोबाइल नम्बर वा इमेल प्रविष्ट गर्नुहोस्' : 'Access your listings, group pools, and payment payouts'}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs border border-emerald-200">
                  🌱
                </div>
              </div>

              {/* Fast 1-Click Demo Farmer Banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&auto=format&fit=crop&q=80"
                    alt="Ram K."
                    className="w-9 h-9 rounded-full object-cover border border-emerald-400"
                  />
                  <div>
                    <p className="text-xs font-bold text-emerald-950">Ram Bahadur K. (Farmer Demo)</p>
                    <p className="text-[11px] text-emerald-700">Kavrepalanchok • 4 Ropani Farm</p>
                  </div>
                </div>
                <button
                  type="button"
                  id="farmer-quick-login-btn"
                  onClick={handleQuickFarmerLogin}
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
                  onClick={() => setAuthMethod('phone')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMethod === 'phone'
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{nepaliLang ? 'मोबाइल नम्बर (SMS OTP)' : 'Mobile Phone (SMS OTP)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('email')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMethod === 'email'
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{nepaliLang ? 'इमेल / किसान आइडी' : 'Email / Farmer ID'}</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {authMethod === 'phone' ? (
                  <>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        {nepaliLang ? 'नेपाली मोबाइल नम्बर' : 'Nepal Mobile Number'}
                      </label>
                      <div className="relative flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-600 font-bold text-xs">
                          🇳🇵 +977
                        </span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="98XXXXXXXX"
                          required
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-r-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
                        />
                      </div>
                    </div>

                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl border border-slate-300 transition-colors cursor-pointer"
                      >
                        {nepaliLang ? 'OTP कोड पठाउनुहोस्' : 'Send 4-Digit Verification SMS OTP'}
                      </button>
                    ) : (
                      <div className="space-y-2 p-3 bg-emerald-50/50 rounded-xl border border-emerald-200">
                        <div className="flex items-center justify-between">
                          <label className="block font-bold text-emerald-900">
                            {nepaliLang ? 'SMS कोड (OTP)' : 'Enter 4-Digit SMS Code'}
                          </label>
                          <span className="text-[11px] text-emerald-700 font-semibold">Demo code auto-filled: 5829</span>
                        </div>
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="5829"
                          required
                          className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-xl font-bold tracking-widest text-center text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        {nepaliLang ? 'इमेल वा किसान आइडी' : 'Email or National Farmer ID'}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ram@kisanlink.demo or NP-FARM-0482"
                          required
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        {nepaliLang ? 'पासवर्ड' : 'Password'}
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
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all hover:scale-[1.01]"
                >
                  <Sprout className="w-4 h-4" />
                  <span>
                    {loading
                      ? (nepaliLang ? 'लगइन हुँदैछ...' : 'Verifying Credentials...')
                      : (nepaliLang ? 'किसान ड्यासबोर्डमा जानुहोस्' : 'Sign In to Farmer Dashboard')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Bottom Registration CTA */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <span>{nepaliLang ? 'नयाँ किसान दर्ता?' : 'New farmer without an account?'}</span>
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="font-bold text-emerald-700 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>{nepaliLang ? 'निःशुल्क दर्ता गर्नुहोस्' : 'Register as a Farmer'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
