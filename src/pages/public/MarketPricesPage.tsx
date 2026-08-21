import React, { useState, useEffect } from 'react';
import { MarketPrice } from '../../types';
import { api } from '../../services/api';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  MapPin,
  Sparkles,
  RefreshCw,
  Calendar,
  Layers,
  ArrowRight,
  Filter,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface MarketPricesPageProps {
  onNavigate: (tab: string, payload?: any) => void;
}

export const MarketPricesPage: React.FC<MarketPricesPageProps> = ({ onNavigate }) => {
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('All');
  const [activeItem, setActiveItem] = useState<MarketPrice | null>(null);

  const markets = ['All', 'Kalimati, Kathmandu', 'Chitwan Wholesale Market', 'Pokhara Fruit & Veg Market', 'Jhapa Agri Hub', 'Kavre Panauti Hub'];

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const res = await api.getMarketPrices({
        product: searchTerm.trim() || undefined,
        market: selectedMarket !== 'All' ? selectedMarket : undefined,
      });
      setMarketPrices(res.marketPrices);
      if (res.marketPrices.length > 0 && !activeItem) {
        setActiveItem(res.marketPrices[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, [selectedMarket]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPrices();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-emerald-800 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-bold border border-emerald-500/50">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Real-Time Wholesale Benchmarks (Kalimati & Provinces)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display">
            Live Daily Market Rates
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Transparent pricing index collected daily from Kalimati Fruits & Vegetables Market Board, Chitwan Agri Terminal, and regional hub telemetry to prevent under-pricing.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <form onSubmit={handleSearch} className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search crop rates (Tomato, Potato, Cauliflower, Apple, Ginger...)"
            className="w-full pl-10 pr-24 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="w-full sm:w-auto px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden cursor-pointer"
          >
            {markets.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Commodity Interactive Chart Card */}
      {activeItem && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs text-slate-500 font-medium">Selected Commodity Benchmark</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                {activeItem.product}
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{activeItem.market} • Updated {activeItem.date}</span>
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-700 font-display">
                  Rs. {activeItem.averagePrice}
                </span>
                <span className="text-xs text-slate-500 font-normal"> /{activeItem.unit} (Avg)</span>
                <span
                  className={`block text-xs font-bold ${
                    activeItem.change >= 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {activeItem.change >= 0 ? `+${activeItem.change}% today` : `${activeItem.change}% today`}
                </span>
              </div>

              <button
                onClick={() => onNavigate('ai-price-advisor', { crop: activeItem.product })}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Price Advisor</span>
              </button>
            </div>
          </div>

          {/* 7-Day History Chart */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700">7-Day Wholesale Price Trend (Rs./kg)</span>
            <div className="h-48 w-full bg-slate-50 rounded-xl p-2 border border-slate-200">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeItem.history}>
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
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#059669"
                    strokeWidth={3}
                    dot={{ fill: '#059669', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Market Prices Table Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-base font-display">
            Daily Commodity Rates Breakdown
          </h3>
          <span className="text-xs text-slate-500">{marketPrices.length} tracked commodities</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Commodity / Crop</th>
                <th className="py-3 px-4">Wholesale Market</th>
                <th className="py-3 px-4">Min Price</th>
                <th className="py-3 px-4">Max Price</th>
                <th className="py-3 px-4">Average Rate</th>
                <th className="py-3 px-4">Daily Change</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {marketPrices.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`hover:bg-emerald-50/50 cursor-pointer transition-colors ${
                    activeItem?.id === item.id ? 'bg-emerald-50/70 font-semibold' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-slate-900 text-sm">
                    {item.product}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {item.market}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    Rs. {item.minPrice}/{item.unit}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    Rs. {item.maxPrice}/{item.unit}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-800 text-sm">
                    Rs. {item.averagePrice}/{item.unit}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded text-[11px] ${
                        item.change > 0
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.change < 0
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.change > 0 ? (
                        <TrendingUp className="w-3 h-3 text-emerald-700" />
                      ) : item.change < 0 ? (
                        <TrendingDown className="w-3 h-3 text-rose-700" />
                      ) : (
                        <Minus className="w-3 h-3 text-slate-500" />
                      )}
                      {item.change > 0 ? `+${item.change}%` : `${item.change}%`}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('ai-price-advisor', { crop: item.product });
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 cursor-pointer"
                    >
                      AI Advice
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
