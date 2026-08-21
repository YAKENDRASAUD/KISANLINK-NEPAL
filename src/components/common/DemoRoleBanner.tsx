import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sprout, ShoppingCart, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
import { UserRole } from '../../types';

interface DemoRoleBannerProps {
  onNavigate?: (tab: string) => void;
}

export const DemoRoleBanner: React.FC<DemoRoleBannerProps> = ({ onNavigate }) => {
  const { user, role, switchDemoRole } = useAuth();

  const roles: { role: UserRole; label: string; name: string; icon: any; color: string }[] = [
    {
      role: 'farmer',
      label: 'Farmer View',
      name: 'Ram K. (Kavre)',
      icon: Sprout,
      color: 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-400',
    },
    {
      role: 'buyer',
      label: 'Buyer View',
      name: 'Kathmandu Fresh',
      icon: ShoppingCart,
      color: 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-400',
    },
    {
      role: 'admin',
      label: 'Admin View',
      name: 'Sita Nepal (Govt/Agri)',
      icon: ShieldCheck,
      color: 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-400',
    },
  ];

  return (
    <div className="bg-[#052e16] text-emerald-100 text-xs px-4 py-2 border-b border-emerald-800 flex flex-wrap items-center justify-between gap-2 z-50">
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline text-emerald-300/80">
          Current Demo Persona: <strong className="text-white font-semibold">{user?.name}</strong> ({role.toUpperCase()})
        </span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
        <span className="text-emerald-400 text-[11px] font-medium mr-1 hidden md:inline">Switch Persona:</span>
        {roles.map((r) => {
          const Icon = r.icon;
          const isActive = role === r.role;
          return (
            <button
              key={r.role}
              id={`switch-role-${r.role}`}
              onClick={() => {
                switchDemoRole(r.role);
                if (onNavigate) {
                  if (r.role === 'farmer') onNavigate('farmer-dashboard');
                  else if (r.role === 'buyer') onNavigate('buyer-dashboard');
                  else if (r.role === 'admin') onNavigate('admin-dashboard');
                }
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all text-[11px] font-medium whitespace-nowrap cursor-pointer ${
                isActive
                  ? r.color
                  : 'bg-emerald-950/60 hover:bg-emerald-900 text-emerald-200 border border-emerald-800/80'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{r.label}</span>
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
