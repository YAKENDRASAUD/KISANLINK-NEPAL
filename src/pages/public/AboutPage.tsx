import React from 'react';
import {
  Sprout,
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
  Award,
  Globe,
  ArrowRight,
  TrendingUp,
  Building2,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="bg-emerald-800 text-white rounded-3xl p-6 sm:p-12 shadow-lg text-center space-y-4 relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-bold border border-emerald-500/50">
          <Sparkles className="w-3.5 h-3.5" />
          <span>National Digital Agriculture Platform</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-tight">
          Empowering Nepal’s Smallholders Through Direct Digital Trade
        </h1>
        <p className="text-emerald-100 text-xs sm:text-base max-w-3xl mx-auto leading-relaxed">
          KisanLink Nepal was built to solve one of our nation's deepest socioeconomic challenges: the severe price gap between rural producers and urban consumers.
        </p>
      </div>

      {/* The Mission & Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Our Origin Story</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            From the Terraces of Kavre to the Markets of Kathmandu
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In Nepal, over 65% of the population relies on agriculture. Yet, when a farmer sells tomatoes in Panauti for Rs. 35/kg, urban families in Kathmandu pay Rs. 100/kg. Up to 4 to 5 layers of commission agents, brokers, and informal cartels swallow the hard-earned fruits of Nepali labor.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong>KisanLink Nepal</strong> transforms this status quo by unifying direct farm-to-buyer e-commerce with decentralized <strong>Group Selling pools</strong>, real-time <strong>Kalimati price telemetry</strong>, and certified <strong>Collection Center weighing hubs</strong>.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-lg font-black text-emerald-800 font-display">10,000+</span>
              <p className="text-xs text-slate-600 font-medium">Smallholders Onboarded</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-lg font-black text-emerald-800 font-display">50+ Hubs</span>
              <p className="text-xs text-slate-600 font-medium">Collection & Cold Centers</p>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white">
          <img
            src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80"
            alt="Nepali agricultural landscape"
            className="w-full h-80 sm:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6 text-white">
            <div>
              <p className="text-xs text-emerald-300 font-bold">Panauti Collection Hub, Kavre</p>
              <h4 className="text-lg font-extrabold font-display">Transparent Digital Weighing in Action</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Core Pillars */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-slate-900 font-display">
            The 4 Pillars of KisanLink Nepal
          </h2>
          <p className="text-xs text-slate-500">How our technology creates long-term rural prosperity.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Fair Farm-Gate Realization',
              desc: 'Enabling smallholders to retain +25-35% more revenue by removing speculative middlemen.',
              icon: TrendingUp,
            },
            {
              title: 'Cooperative Bulk Power',
              desc: 'Group Selling turns 50kg micro-lots into institutional 1,000kg consignments for hotels.',
              icon: Users,
            },
            {
              title: 'AI Price Intelligence',
              desc: 'Gemini 3.7 models analyze seasonal supply and Kalimati demand to prevent under-selling.',
              icon: Sparkles,
            },
            {
              title: 'Farm-to-Fork Traceability',
              desc: 'QR passports guarantee pesticide safety, harvest timestamp, and authentic Nepali origin.',
              icon: ShieldCheck,
            },
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5 hover:border-emerald-300 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm font-display">{pillar.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 text-center space-y-4">
        <h3 className="text-2xl font-extrabold font-display">
          Be Part of Nepal’s Agricultural Renaissance
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Whether you are a farmer in Mustang, a wholesale merchant in Kalimati, or a cooperative in Chitwan, KisanLink is your platform.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('register')}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 cursor-pointer"
          >
            Create Free Account
          </button>
        </div>
      </div>

    </div>
  );
};
