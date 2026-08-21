import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { AiPriceAdvisorResponse } from '../../types';
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Users,
  ArrowRight,
  RefreshCw,
  Sprout,
  DollarSign,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts';

interface AiPriceAdvisorPageProps {
  initialCrop?: string;
  onNavigate: (tab: string, payload?: any) => void;
}

export const AiPriceAdvisorPage: React.FC<AiPriceAdvisorPageProps> = ({
  initialCrop = 'Tomato (गोलभेडा)',
  onNavigate,
}) => {
  const [product, setProduct] = useState(initialCrop);
  const [location, setLocation] = useState('Kavre');
  const [quantity, setQuantity] = useState(500);
  const [quality, setQuality] = useState<'Grade A' | 'Grade B' | 'Organic'>('Grade A');
  const [harvestDate, setHarvestDate] = useState('Within 3 days');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiPriceAdvisorResponse | null>(null);

  const presetCrops = [
    'Tomato (गोलभेडा)',
    'Potato (आलु)',
    'Cauliflower (काउली)',
    'Apple (स्याउ)',
    'Rice (चामल)',
    'Ginger (अदुवा)',
    'Cardamom (अलैंची)',
  ];

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const data = await api.getAiPriceAdvisor({
        product,
        location,
        quantity,
        quality,
        harvestDate,
      });
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleAnalyze();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-emerald-800 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 w-1/3 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-3xl space-y-3 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/90 text-emerald-200 text-xs font-bold border border-emerald-500/50">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
            <span>Powered by Gemini 3.7 & Kalimati Real-Time Index</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display">
            AI Crop Price Advisor
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Get instant, fair-market price recommendations for your upcoming harvest based on daily regional arrival volumes, quality grade premiums, and wholesale consumption trends in Nepal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Parameters (4 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2 font-display">
                <Sprout className="w-5 h-5 text-emerald-600" />
                <span>Crop Parameters</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">Input for AI Analysis</span>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-4">
              {/* Quick Crop Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Commodity
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {presetCrops.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setProduct(c)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        product === c
                          ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {c.split(' ')[0]}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="Or type any crop name..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Farm District / Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
                >
                  <option value="Kavre">Kavrepalanchok (Panauti / Banepa)</option>
                  <option value="Chitwan">Chitwan (Bharatpur / Narayangarh)</option>
                  <option value="Dhading">Dhading (Benighat / Dhading Besi)</option>
                  <option value="Mustang">Mustang (Marpha / Jomsom)</option>
                  <option value="Jhapa">Jhapa (Birtamod / Damak)</option>
                  <option value="Pokhara">Kaski (Pokhara Valley)</option>
                  <option value="Ilam">Ilam (Fikkal / Ilam Bazar)</option>
                </select>
              </div>

              {/* Quantity */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">Estimated Harvest Volume</label>
                  <span className="text-xs text-emerald-700 font-bold">{quantity} kg</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>50 kg</span>
                  <span>1,000 kg</span>
                  <span>5,000 kg</span>
                </div>
              </div>

              {/* Quality Grade */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Quality Grade / Standard
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Grade A', 'Grade B', 'Organic'] as const).map((q) => (
                    <button
                      type="button"
                      key={q}
                      onClick={() => setQuality(q)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        quality === q
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Harvest timing */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Expected Harvest Window
                </label>
                <select
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
                >
                  <option value="Today / Tomorrow">Harvest Ready (Today / Tomorrow)</option>
                  <option value="Within 3 days">Within 3 days</option>
                  <option value="Next Week">Next Week (7 days)</option>
                  <option value="Within 15 days">Within 15 days</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Kalimati Telemetry...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Calculate Fair Farm-Gate Price</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Results: AI Analysis & Live Charts (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          {result && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Primary Price Recommendation Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-sm relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                      AI Price Recommendation
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                      {result.product} • {result.location}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                      <Zap className="w-3.5 h-3.5 text-emerald-600" />
                      {result.confidenceScore}% Confidence
                    </span>
                    {result.isAiGenerated && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-mono">
                        Live Gemini 3.7
                      </span>
                    )}
                  </div>
                </div>

                {/* Price Display Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                  <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 text-center sm:text-left">
                    <span className="text-xs text-slate-500 font-medium block">Suggested Fair Range</span>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-800 font-display mt-0.5">
                      Rs. {result.suggestedMinPrice} - {result.suggestedMaxPrice}
                      <span className="text-xs text-slate-500 font-normal"> /kg</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center sm:text-left">
                    <span className="text-xs text-slate-500 font-medium block">Market Trend</span>
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                      {result.marketTrend === 'Increasing' ? (
                        <span className="text-emerald-700 font-black text-lg flex items-center gap-1 font-display">
                          <TrendingUp className="w-5 h-5" /> Increasing ↑
                        </span>
                      ) : result.marketTrend === 'Decreasing' ? (
                        <span className="text-rose-600 font-black text-lg flex items-center gap-1 font-display">
                          <TrendingDown className="w-5 h-5" /> Decreasing ↓
                        </span>
                      ) : (
                        <span className="text-amber-600 font-black text-lg flex items-center gap-1 font-display">
                          <Minus className="w-5 h-5" /> Stable ↔
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center sm:text-left">
                    <span className="text-xs text-slate-500 font-medium block">Wholesale Demand</span>
                    <span className="text-lg font-extrabold text-slate-800 block mt-1 font-display">
                      {result.demandLevel} Demand
                    </span>
                  </div>
                </div>

                {/* Plain-Language Farmer Advisory */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Tactical Selling Advisory</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    "{result.recommendation}"
                  </p>
                  {result.marketContext && (
                    <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                      <strong>Market Context:</strong> {result.marketContext}
                    </p>
                  )}
                </div>

                {/* Price Trend Chart */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">7-Day Wholesale Price Trend (Rs./kg)</span>
                    <span className="text-[11px] text-slate-500">Kalimati & Regional Avg</span>
                  </div>
                  <div className="h-44 w-full bg-slate-50 rounded-xl p-2 border border-slate-200">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.priceTrendHistory}>
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} />
                        <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10, fill: '#64748b' }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#064e3b',
                            color: '#fff',
                            borderRadius: '8px',
                            fontSize: '11px',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="#059669"
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#colorPrice)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Value Driving Factors */}
                <div className="mt-6 space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Key Value Drivers
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {result.factors.map((f, i) => (
                      <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-[11px] truncate">{f.name}</span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              f.impact === 'Positive'
                                ? 'bg-emerald-100 text-emerald-800'
                                : f.impact === 'Negative'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {f.impact}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-snug">{f.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Group Selling Synergies Card */}
                <div className="mt-6 bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-300 text-xs font-bold">
                      <Users className="w-4 h-4" />
                      <span>Cooperative Group Selling Opportunity</span>
                    </div>
                    <p className="text-xs text-slate-200 max-w-md">
                      {result.groupSellingSuggestion}
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigate('group-selling')}
                    className="px-4 py-2.5 bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs rounded-xl shadow-sm whitespace-nowrap cursor-pointer transition-transform hover:scale-105"
                  >
                    View Group Pools
                  </button>
                </div>

                {/* 1-Click Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    Ready to list your harvest with this recommended rate?
                  </span>
                  <button
                    onClick={() => onNavigate('farmer-add-product')}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>List at Rs. {result.suggestedMaxPrice}/kg</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
