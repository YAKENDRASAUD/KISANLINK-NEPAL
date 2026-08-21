import React from 'react';
import { Sprout, Phone, Mail, MapPin, Heart, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#052e16] text-slate-300 border-t border-emerald-900/60 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 pb-12 border-b border-emerald-900/60">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer inline-flex"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
                <Sprout className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight text-white font-display">
                    KisanLink
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40 uppercase">
                    Nepal
                  </span>
                </div>
                <p className="text-xs text-emerald-400 font-medium">From Farm to Fair Market 🌱</p>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              A digital agricultural bridge connecting Nepal’s hardworking smallholders directly with verified buyers,
              empowered by AI price intelligence, group bulk selling, collection-center logistics, and end-to-end QR traceability.
            </p>

            <div className="flex items-center gap-3 text-xs text-emerald-300 font-medium bg-emerald-950/80 border border-emerald-800/80 rounded-xl p-3 max-w-md">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Transforming Nepali agriculture through fair market access & direct digital trade.</span>
            </div>
          </div>

          {/* Col 2: Quick Links & Portals */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase font-display">Portals & Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'home', label: 'Home' },
                { id: 'marketplace', label: 'Marketplace' },
                { id: 'login-farmer', label: '🌾 Farmer Portal Login' },
                { id: 'login-buyer', label: '🛒 Wholesale Buyer Login' },
                { id: 'login-admin', label: '🛡️ Ministry Admin Portal' },
                { id: 'about', label: 'About Us' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Features */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase font-display">Features</h4>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'ai-price-advisor', label: 'AI Price Advisor' },
                { id: 'group-selling', label: 'Group Selling' },
                { id: 'centers-storage', label: 'Collection Centers' },
                { id: 'centers-storage', label: 'Storage Support' },
                { id: 'traceability', label: 'QR Traceability' },
                { id: 'farmer-dashboard', label: 'Farmer Dashboard' },
              ].map((f, i) => (
                <li key={i}>
                  <button
                    onClick={() => onNavigate(f.id)}
                    className="text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>{f.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Support & Contact */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase font-display">Farmer Support</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Toll-Free Farmer Hotline</span>
                  <span>1660-01-KISAN (54726)</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Helpdesk</span>
                  <span>support@kisanlink.np</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Agri Coordination Centers</span>
                  <span>Kathmandu • Kavre • Chitwan</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2026 KisanLink Nepal. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>AKEN CHETTRI & SURESH PUN </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
