import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sprout, ShoppingCart, User, Phone, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

interface RegisterPageProps {
  onNavigate: (tab: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { register } = useAuth();
  const [role, setRole] = useState<UserRole>('farmer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+977 98');
  const [location, setLocation] = useState('Kavre, Bagmati');
  const [farmSize, setFarmSize] = useState('4 Ropani');
  const [businessName, setBusinessName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);
    const success = await register({
      name,
      email,
      role,
      phone,
      location,
      district: location.split(',')[0],
      farmSize: role === 'farmer' ? farmSize : undefined,
      businessName: role === 'buyer' ? businessName : undefined,
    });
    setLoading(false);

    if (success) {
      if (role === 'farmer') onNavigate('farmer-dashboard');
      else if (role === 'buyer') onNavigate('buyer-dashboard');
      else onNavigate('admin-dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/25">
          <Sprout className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 font-display">
          Join KisanLink Nepal
        </h1>
        <p className="text-xs text-slate-500">
          Create your digital agriculture account in under a minute.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        
        {/* Role Toggle */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">Account Type</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('farmer')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                role === 'farmer'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-400'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Sprout className="w-5 h-5 text-emerald-700 mb-1" />
              <p className="font-bold text-xs">Nepali Farmer</p>
              <p className="text-[10px] text-slate-500">Sell harvests & pool lots</p>
            </button>

            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                role === 'buyer'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-400'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <ShoppingCart className="w-5 h-5 text-emerald-700 mb-1" />
              <p className="font-bold text-xs">Commercial Buyer</p>
              <p className="text-[10px] text-slate-500">Source wholesale produce</p>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Name / Primary Contact</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Hari Bahadur Thapa"
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. hari@kisanlink.np"
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Mobile Phone (Nepal)</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">District / Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
            >
              <option value="Kavre, Bagmati">Kavrepalanchok (Panauti / Banepa)</option>
              <option value="Chitwan, Bagmati">Chitwan (Bharatpur)</option>
              <option value="Dhading, Bagmati">Dhading</option>
              <option value="Mustang, Gandaki">Mustang</option>
              <option value="Jhapa, Koshi">Jhapa</option>
              <option value="Kathmandu, Bagmati">Kathmandu Valley</option>
              <option value="Pokhara, Gandaki">Pokhara</option>
              <option value="Ilam, Koshi">Ilam</option>
            </select>
          </div>

          {role === 'farmer' ? (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Approximate Land / Farm Size</label>
              <input
                type="text"
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
                placeholder="e.g. 5 Ropani / 2 Bigha"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
              />
            </div>
          ) : (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Business / Company Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Hotel Annapurna / Himalayan Fresh"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 mt-4"
          >
            <span>{loading ? 'Creating Account...' : 'Complete Free Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 pt-2">
          Already registered?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="font-bold text-emerald-700 hover:underline cursor-pointer"
          >
            Sign in
          </button>
        </p>
      </div>

    </div>
  );
};
