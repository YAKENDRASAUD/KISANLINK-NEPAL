import React, { useState, useEffect } from 'react';
import { Product, MarketPrice } from '../../types';
import { api } from '../../services/api';
import {
  Sprout,
  TrendingUp,
  Sparkles,
  Users,
  Building2,
  Warehouse,
  QrCode,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Layers,
  Truck,
  DollarSign,
  AlertTriangle,
  ChevronRight,
  Search,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string, payload?: any) => void;
  onOpenProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenProduct }) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadInitialData() {
      try {
        const [prodRes, priceRes] = await Promise.all([
          api.getProducts(),
          api.getMarketPrices(),
        ]);
        if (isMounted) {
          setFeaturedProducts(prodRes.products.slice(0, 5));
          setMarketPrices(priceRes.marketPrices.slice(0, 4));
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadInitialData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50/50 pt-10 sm:pt-16 pb-14 sm:pb-20 border-b border-slate-200/80">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#052e16_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Heading & Subtitle */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 text-xs font-bold border border-emerald-300/80 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Nepal’s Premier AgriTech Marketplace & Price Intelligence</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] font-display">
                Connecting Nepal’s Farmers to <span className="text-emerald-700">Better Markets</span>
              </h1>

              <div className="space-y-2">
                <p className="text-lg sm:text-xl font-bold text-emerald-800 flex items-center justify-center lg:justify-start gap-1.5 font-display">
                  <span>From Farm to Fair Market</span>
                  <span>🌱</span>
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  A smarter digital bridge between Nepali farmers, commercial buyers, collection centers,
                  and agricultural markets with real-time price benchmarks, AI recommendations, and group selling.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  id="hero-explore-btn"
                  onClick={() => onNavigate('marketplace')}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition-all hover:scale-102 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Explore Marketplace</span>
                </button>
                <button
                  id="hero-join-btn"
                  onClick={() => onNavigate('register')}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-bold shadow-xs flex items-center gap-2 transition-all hover:scale-102 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-emerald-700" />
                  <span>Join KisanLink</span>
                </button>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero Middleman Deductions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Farm Gate QR</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Kalimati Benchmarked</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Visual Frame */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"
                    alt="Nepali Farmer fresh harvest"
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Overlay Badges */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md flex items-center gap-2 text-xs font-bold text-slate-800 border border-emerald-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Live Kavre Harvest • Grade A</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-emerald-700 font-bold uppercase tracking-wider block">
                        Today's Benchmark
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-base font-display">
                        Tomato (गोलभेडा)
                      </h4>
                      <p className="text-xs text-slate-500">Kavre → Kathmandu Valley</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-emerald-700 font-display">
                        Rs. 80<span className="text-xs text-slate-500 font-normal">/kg</span>
                      </span>
                      <span className="text-[11px] text-emerald-700 font-bold block">
                        ↑ 12% vs last week
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Micro Card */}
                <div className="absolute -bottom-5 -left-5 bg-emerald-800 text-white p-3 rounded-xl shadow-xl hidden sm:flex items-center gap-3 border-2 border-emerald-500">
                  <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-emerald-200" />
                  </div>
                  <div>
                    <p className="text-[11px] text-emerald-200 font-medium">AI Price Intelligence</p>
                    <p className="text-xs font-bold text-white">Suggested Rs. 75 - 85/kg</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Statistics Bar Matching Reference Image */}
          <div className="mt-14 sm:mt-18 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { number: '10K+', label: 'Farmers', sub: 'Across 7 Provinces', icon: Sprout, color: 'text-emerald-700' },
              { number: '2K+', label: 'Buyers', sub: 'Wholesalers & Hotels', icon: Users, color: 'text-blue-700' },
              { number: '5K+', label: 'Products', sub: 'Fresh Harvests Listed', icon: Layers, color: 'text-emerald-700' },
              { number: '50+', label: 'Collection Centers', sub: 'Active Drop-off Hubs', icon: Building2, color: 'text-amber-700' },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all text-center sm:text-left flex flex-col sm:flex-row items-center gap-3.5"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                      {stat.number}
                    </h3>
                    <p className="text-xs font-bold text-slate-800">{stat.label}</p>
                    <p className="text-[11px] text-slate-500">{stat.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================== HOW KISANLINK WORKS (5 STEPS MATCHING IMAGE) ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
            How KisanLink Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            A frictionless 5-step agricultural supply chain built specifically for Nepal’s terrain and cooperatives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {[
            {
              step: '1',
              title: 'Farmers Add Products',
              desc: 'List harvest volume, expected rate & location with photos.',
              icon: Sprout,
            },
            {
              step: '2',
              title: 'Buyers Find & Place Orders',
              desc: 'Wholesalers, grocery chains & hotels review certified batches.',
              icon: Search,
            },
            {
              step: '3',
              title: 'Farmers Confirm & Prepare',
              desc: 'Accept orders or negotiate fair counter-offers seamlessly.',
              icon: CheckCircle2,
            },
            {
              step: '4',
              title: 'Collection or Delivery',
              desc: 'Drop harvest at local collection center or direct farm pickup.',
              icon: Building2,
            },
            {
              step: '5',
              title: 'Order Completed',
              desc: 'Digital weighing verification, QR batch issue & instant payout.',
              icon: DollarSign,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all relative flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center font-bold text-lg mb-3.5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-emerald-700" />
                </div>
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center mb-2">
                  {item.step}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mb-1 font-display">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== CORE PROBLEM & SOLUTION SECTION ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 rounded-3xl text-white p-8 sm:p-12 shadow-xl border border-emerald-900/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left: The Challenge in Nepal */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>The Core Problem in Nepali Agriculture</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display leading-tight">
                Middlemen Take Up to 40% of Farm Value in Nepal.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Smallholder farmers in Kavre, Chitwan, and Mustang often struggle with market price opacity,
                cannot access bulk commercial buyers on their own, and suffer post-harvest spoilage due to
                fragmented collection logistics.
              </p>

              <div className="space-y-2.5 text-xs text-slate-200">
                {[
                  'Dependence on local intermediaries who dictate unfair rates',
                  'Inability for small 40-50 kg farmers to supply large commercial hotels',
                  'Lack of transparent Kalimati market intelligence in rural districts',
                  'Difficulty tracking cold storage availability and collection trucks',
                ].map((prob, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                    <span>{prob}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: The KisanLink Solution */}
            <div className="bg-emerald-900/50 border border-emerald-700/60 p-6 sm:p-8 rounded-2xl space-y-4 backdrop-blur-md">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>The KisanLink Digital Agri-Bridge</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                Farmer → Market Intelligence → Buyer → Collection Center → Delivery
              </h3>
              <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
                By combining direct digital listings with <strong>Group Selling Pools</strong>, <strong>AI Price Advisor</strong>,
                and local <strong>Collection Center Infrastructure</strong>, KisanLink empowers every farmer to command institutional rates.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-emerald-950/70 p-3 rounded-xl border border-emerald-800">
                  <span className="text-emerald-300 font-bold block text-sm">+25-35%</span>
                  <span className="text-slate-300 text-[11px]">Higher Farmer Realization</span>
                </div>
                <div className="bg-emerald-950/70 p-3 rounded-xl border border-emerald-800">
                  <span className="text-emerald-300 font-bold block text-sm">100% Digital</span>
                  <span className="text-slate-300 text-[11px]">QR Traceability & Tests</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== OUR KEY FEATURES ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Our Key Features
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Comprehensive digital tools empowering Nepali agriculture from planting to fair payment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: 'market-prices',
              title: 'Market Prices',
              desc: 'Live daily benchmark prices from Kalimati, Chitwan, and regional wholesale hubs.',
              icon: TrendingUp,
              badge: 'Real-time Ticker',
              color: 'from-emerald-500 to-teal-600',
            },
            {
              id: 'ai-price-advisor',
              title: 'AI Price Advisor',
              desc: 'AI-assisted price recommendations based on crop grade, quantity, and seasonal demand.',
              icon: Sparkles,
              badge: 'Gemini 3.7 Powered',
              color: 'from-emerald-600 to-green-700',
            },
            {
              id: 'group-selling',
              title: 'Group Selling',
              desc: 'Small farmers pool harvests (e.g. 40kg + 60kg + 100kg = 250kg) to fulfill bulk corporate orders.',
              icon: Users,
              badge: 'Cooperative Power',
              color: 'from-teal-600 to-emerald-800',
            },
            {
              id: 'centers-storage',
              title: 'Collection Centers',
              desc: 'Easy digital access, weighing verification, and transport coordination at nearby hubs.',
              icon: Building2,
              badge: 'Panauti & Banepa',
              color: 'from-slate-700 to-slate-900',
            },
            {
              id: 'centers-storage',
              title: 'Storage Support',
              desc: 'Find cold storage, ambient warehouses, and grain silos to eliminate distress selling.',
              icon: Warehouse,
              badge: 'Capacity Monitoring',
              color: 'from-emerald-700 to-emerald-900',
            },
            {
              id: 'traceability',
              title: 'QR Traceability',
              desc: 'Batch QR codes verifying farm origin, pesticide safety test, and transit conditions.',
              icon: QrCode,
              badge: 'GAP Certified',
              color: 'from-emerald-800 to-green-950',
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                id={`feature-card-${idx}`}
                onClick={() => onNavigate(feature.id)}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      {feature.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-emerald-700 transition-colors font-display">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>Explore Tool</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS MATCHING REFERENCE IMAGE ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Featured Farm Harvests
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Direct from verified Nepali smallholders in Kavre, Chitwan, Mustang, and Jhapa.
            </p>
          </div>
          <button
            onClick={() => onNavigate('marketplace')}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
          >
            <span>View All Marketplace Listings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {featuredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => onOpenProduct(p)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs border border-slate-200">
                    {p.quality}
                  </span>
                  {p.farmerVerified && (
                    <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>

                <div className="p-3.5 space-y-1.5">
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">{p.location}</span>
                  </p>
                  <h3 className="font-bold text-slate-900 text-sm truncate group-hover:text-emerald-700 transition-colors font-display">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline gap-1 pt-0.5">
                    <span className="text-base font-black text-emerald-700 font-display">
                      Rs. {p.price}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">/{p.unit}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Available: <strong className="text-slate-800 font-semibold">{p.quantity} {p.unit}</strong>
                  </p>
                  <p className="text-[10px] text-slate-400">by {p.farmerName}</p>
                </div>
              </div>

              <div className="p-3 pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenProduct(p);
                  }}
                  className="w-full py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 text-xs font-bold border border-emerald-200 transition-all cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== WHY CHOOSE KISANLINK? ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Farmer Centric Innovation
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Why Choose KisanLink?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Designed from the ground up for Nepal's agricultural terrain, cooperatives, and smallholders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: 'Fair Price', desc: 'Get fair price for your hard work without arbitrary deductions.', icon: DollarSign },
              { title: 'Direct Connection', desc: 'No middlemen; higher profit directly into farmer bank accounts.', icon: Users },
              { title: 'Smart Insights', desc: 'Make better planting & harvest decisions with Kalimati AI data.', icon: Sparkles },
              { title: 'Secure & Trusted', desc: 'Verified users & transparent digital scale audit systems.', icon: ShieldCheck },
              { title: 'For a Better Nepal', desc: 'Empowering local farmers and strengthening food security.', icon: Sprout },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all text-center sm:text-left space-y-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-emerald-700 flex items-center justify-center mx-auto sm:mx-0 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm font-display">{card.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== CALL TO ACTION SECTION ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-800 rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 relative overflow-hidden shadow-xl border border-emerald-700">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight leading-tight">
              Let’s build a fairer market for Nepal’s farmers.
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Join thousands of farmers, wholesale merchants, cooperatives, and commercial buyers trading directly across Nepal.
            </p>
          </div>

          <div className="relative flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('register')}
              className="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-emerald-950 font-extrabold text-sm shadow-lg shadow-black/10 cursor-pointer transition-all hover:scale-102"
            >
              Join as Farmer
            </button>
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-7 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-sm border border-emerald-500 shadow-md cursor-pointer transition-all hover:scale-102"
            >
              Explore as Buyer
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
