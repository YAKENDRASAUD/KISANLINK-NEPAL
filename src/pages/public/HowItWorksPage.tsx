import React, { useState } from 'react';
import {
  Sprout,
  ShoppingCart,
  Building2,
  CheckCircle2,
  Sparkles,
  Users,
  QrCode,
  Truck,
  DollarSign,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (tab: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const [activePersona, setActivePersona] = useState<'farmer' | 'buyer' | 'center'>('farmer');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Hero Header */}
      <div className="bg-emerald-800 text-white rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-3 relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-bold border border-emerald-500/50">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Frictionless 3-Way Digital Workflow</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight">
          How KisanLink Works
        </h1>
        <p className="text-emerald-100 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
          Explore how farmers, commercial buyers, and collection centers collaborate on Nepal’s unified agricultural digital platform.
        </p>

        {/* Persona Selector Tabs */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'farmer', label: 'For Nepali Farmers', icon: Sprout },
            { id: 'buyer', label: 'For Commercial Buyers', icon: ShoppingCart },
            { id: 'center', label: 'For Collection Centers', icon: Building2 },
          ].map((p) => {
            const Icon = p.icon;
            const isSelected = activePersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePersona(p.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-emerald-950 shadow-md ring-2 ring-emerald-300'
                    : 'bg-emerald-700/70 text-emerald-100 hover:bg-emerald-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Workflow View */}
      {activePersona === 'farmer' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-slate-900 font-display">
              The 5-Step Journey for Farmers
            </h2>
            <p className="text-xs text-slate-500">From listing your harvest to guaranteed fair farm-gate payout.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '1',
                title: 'Check AI Price',
                desc: 'Use the AI Price Advisor to calculate benchmark price per kg before listing.',
                icon: Sparkles,
              },
              {
                step: '2',
                title: 'List or Pool Harvest',
                desc: 'Post direct lot or join Group Selling with neighbors in your village.',
                icon: Users,
              },
              {
                step: '3',
                title: 'Receive Orders',
                desc: 'Get purchase requests and price offers from verified Kathmandu & city buyers.',
                icon: ShoppingCart,
              },
              {
                step: '4',
                title: 'Collection Center Drop-off',
                desc: 'Bring harvest to nearest hub (Panauti/Banepa) for free digital scale weighing.',
                icon: Building2,
              },
              {
                step: '5',
                title: 'Instant Fair Payout',
                desc: 'Receive direct bank/eSewa transfer with zero intermediary commission cuts.',
                icon: DollarSign,
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col items-center text-center group hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                    {card.step}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm font-display">{card.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onNavigate('farmer-add-product')}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Start as a Farmer Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {activePersona === 'buyer' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-slate-900 font-display">
              The Sourcing Workflow for Commercial Buyers
            </h2>
            <p className="text-xs text-slate-500">For hotels, supermarkets, restaurants, and wholesale traders.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Browse Verified Crops',
                desc: 'Filter by district (Kavre, Chitwan, Mustang), harvest grade, and volume available.',
                icon: Sprout,
              },
              {
                step: '2',
                title: 'Place Order or Counter-Offer',
                desc: 'Submit purchase orders at listed rate or negotiate directly via digital offer.',
                icon: ShoppingCart,
              },
              {
                step: '3',
                title: 'Audit Batch QR Passport',
                desc: 'Review harvest date, pesticide residue safety checks, and collection hub verification.',
                icon: QrCode,
              },
              {
                step: '4',
                title: 'Consolidated Hub Dispatch',
                desc: 'Pickup at local collection center or receive direct temperature-safe delivery.',
                icon: Truck,
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col items-center text-center group hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                    {card.step}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm font-display">{card.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore Marketplace Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {activePersona === 'center' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-slate-900 font-display">
              Collection Center Hub Operations
            </h2>
            <p className="text-xs text-slate-500">The vital physical node connecting rural smallholders to urban demand.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Digital Scale Weighing & Inspection',
                desc: 'Incoming farmer harvests are weighed on digital scales and evaluated against Nepali GAP standards.',
                icon: ShieldCheck,
              },
              {
                title: 'Batch Aggregation & Cold Chain Holding',
                desc: 'Small farmer lots are grouped into bulk consignments (500kg - 2,000kg) and pre-cooled.',
                icon: Building2,
              },
              {
                title: 'Verified Transit Logistics',
                desc: 'Consignments are loaded onto refrigerated or direct transport trucks bound for city markets.',
                icon: Truck,
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col items-center text-center group hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base font-display">{card.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
