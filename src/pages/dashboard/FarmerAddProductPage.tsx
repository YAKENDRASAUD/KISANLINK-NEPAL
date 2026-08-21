import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import confetti from 'canvas-confetti';
import {
  Sprout,
  Sparkles,
  Calendar,
  MapPin,
  Building2,
  Tag,
  Scale,
  Award,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Image as ImageIcon,
} from 'lucide-react';

interface FarmerAddProductPageProps {
  onNavigate: (tab: string) => void;
}

export const FarmerAddProductPage: React.FC<FarmerAddProductPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [name, setName] = useState('Fresh Organic Tomatoes');
  const [nepaliName, setNepaliName] = useState('ताजा गोलभेडा');
  const [category, setCategory] = useState('Vegetables');
  const [quantity, setQuantity] = useState(250);
  const [unit, setUnit] = useState('kg');
  const [price, setPrice] = useState(78);
  const [expectedPrice, setExpectedPrice] = useState(85);
  const [quality, setQuality] = useState('Grade A');
  const [location, setLocation] = useState(user?.location || 'Panauti, Kavre');
  const [collectionCenter, setCollectionCenter] = useState('Kavre Collection Center (Panauti Hub)');
  const [harvestDate, setHarvestDate] = useState(new Date().toISOString().split('T')[0]);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80');
  const [loading, setLoading] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);

  const photoPresets = [
    { label: 'Tomato', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80' },
    { label: 'Potato', url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80' },
    { label: 'Cauliflower', url: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=600&auto=format&fit=crop&q=80' },
    { label: 'Apple', url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80' },
    { label: 'Ginger', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80' },
    { label: 'Cardamom', url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80' },
  ];

  const handleAiPriceCheck = async () => {
    setAiAnalyzing(true);
    try {
      const res = await api.getAiPriceAdvisor({
        product: name,
        location: location.split(',')[0],
        quality,
        quantity,
        unit,
      });
      if (res) {
        setPrice(res.averageExpectedPrice || res.suggestedMinPrice);
        setAiRecommendation(
          `AI Recommendation: Rs. ${res.suggestedMinPrice} - ${res.suggestedMaxPrice}/${unit} (${res.recommendation})`
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const batchCode = `KLN-2026-${name.slice(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
      const res = await api.createProduct({
        name,
        nepaliName,
        category,
        quantity,
        unit,
        price,
        expectedPrice,
        quality,
        location,
        district: location.split(',')[0],
        farmerId: user?.id || 'user-farmer-1',
        farmerName: user?.name || 'Ram K.',
        farmerPhone: user?.phone || '+977 9841234567',
        farmerAvatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        harvestDate,
        collectionCenter,
        image,
        batchId: batchCode,
        isVerified: true,
        allowGroupSelling: true,
      });

      if (res.success) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
        onNavigate('farmer-dashboard');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-emerald-800 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200 bg-emerald-700/80 px-2.5 py-0.5 rounded-full border border-emerald-500/50">
            Producer Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-display">
            List New Harvest for Marketplace
          </h1>
          <p className="text-xs text-emerald-100">
            Provide harvest details to generate your digital batch QR passport and notify verified commercial buyers.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs">
        
        {/* Basic Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 font-display flex items-center gap-2 border-b border-slate-100 pb-2">
            <Sprout className="w-4 h-4 text-emerald-700" />
            <span>Crop & Commodity Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Crop Name (English)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Fresh Organic Tomatoes"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nepali Name (नेपाली नाम)</label>
              <input
                type="text"
                value={nepaliName}
                onChange={(e) => setNepaliName(e.target.value)}
                placeholder="e.g. ताजा गोलभेडा"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="Vegetables">Vegetables (तरकारी)</option>
                <option value="Fruits">Fruits (फलफूल)</option>
                <option value="Grains & Rice">Grains & Rice (खाद्यान्न)</option>
                <option value="Spices & Herbs">Spices (मसला)</option>
                <option value="Pulses & Lentils">Pulses (दाल)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Total Quantity Available</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="px-2 py-2 bg-slate-100 border border-slate-200 rounded-xl font-bold"
                >
                  <option value="kg">kg</option>
                  <option value="crate">crates</option>
                  <option value="quintal">quintal</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Quality Grade</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="Grade A">Grade A (Premium Quality)</option>
                <option value="Grade B">Grade B (Standard Market)</option>
                <option value="Organic Certified">Organic Certified</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing with AI Advisor Integration */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-sm font-extrabold text-slate-900 font-display flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-700" />
              <span>Pricing Strategy</span>
            </h3>
            <button
              type="button"
              onClick={handleAiPriceCheck}
              disabled={aiAnalyzing}
              className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{aiAnalyzing ? 'Analyzing Kalimati Rates...' : 'Get AI Recommended Price'}</span>
            </button>
          </div>

          {aiRecommendation && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium">
              {aiRecommendation}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Listing Price (Rs. per {unit})</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-bold text-slate-400">Rs.</span>
                <input
                  type="number"
                  min="1"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                  className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-black text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Market Price (Rs. per {unit})</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-bold text-slate-400">Rs.</span>
                <input
                  type="number"
                  min="1"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(Number(e.target.value))}
                  className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location and Logistics */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-extrabold text-slate-900 font-display flex items-center gap-2 border-b border-slate-100 pb-2">
            <Building2 className="w-4 h-4 text-emerald-700" />
            <span>Farm Location & Drop-Off Hub</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Farm / Village Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Harvest Date</label>
              <input
                type="date"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Collection Center Hub</label>
              <select
                value={collectionCenter}
                onChange={(e) => setCollectionCenter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="Kavre Collection Center (Panauti Hub)">Kavre Collection Center (Panauti)</option>
                <option value="Banepa Agri Hub">Banepa Agri Hub (Kavre)</option>
                <option value="Chitwan Central Terminal">Chitwan Central Terminal (Bharatpur)</option>
                <option value="Dhading Highway Center">Dhading Highway Center (Benighat)</option>
                <option value="Mustang Apple Aggregation Depot">Mustang Apple Aggregation Depot (Jomsom)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Image Selection */}
        <div className="space-y-2 pt-2">
          <label className="block font-bold text-slate-700">Harvest Photograph (Preset or Custom URL)</label>
          <div className="flex flex-wrap gap-2">
            {photoPresets.map((preset) => (
              <button
                type="button"
                key={preset.label}
                onClick={() => setImage(preset.url)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                  image === preset.url
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => onNavigate('farmer-dashboard')}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{loading ? 'Publishing Harvest...' : 'Publish Listing & Generate QR'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
