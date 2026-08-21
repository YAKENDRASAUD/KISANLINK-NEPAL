import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Sprout,
  Menu,
  X,
  Sparkles,
  TrendingUp,
  Store,
  Users,
  Building2,
  QrCode,
  Info,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  User as UserIcon,
  Phone,
  ShoppingCart,
  Shield,
  LogIn,
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, payload?: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate }) => {
  const { user, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'market-prices', label: 'Market Prices' },
    { id: 'group-selling', label: 'Group Selling' },
    { id: 'centers-storage', label: 'Centers & Storage' },
    { id: 'traceability', label: 'QR Traceability' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About Us' },
  ];

  const handleNavClick = (tab: string, payload?: any) => {
    onNavigate(tab, payload);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setLoginDropdownOpen(false);
  };

  const getDashboardRoute = () => {
    if (role === 'farmer') return 'farmer-dashboard';
    if (role === 'buyer') return 'buyer-dashboard';
    return 'admin-dashboard';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          
          {/* Logo */}
          <div
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 font-display">
                  KisanLink
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase border border-emerald-300">
                  Nepal
                </span>
              </div>
              <p className="text-[10px] text-emerald-700 font-medium tracking-tight -mt-0.5 hidden sm:block">
                From Farm to Fair Market 🌱
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* AI Advisor Badge Button */}
            <button
              id="quick-ai-advisor-btn"
              onClick={() => handleNavClick('ai-price-advisor')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>AI Price Advisor</span>
            </button>

            {user ? (
              <div className="relative">
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-300 bg-white hover:bg-emerald-50/50 transition-all cursor-pointer"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-emerald-500/30"
                  />
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[110px]">
                      {user.name}
                    </p>
                    <span className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider block">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                        {user.role.toUpperCase()} • {user.location}
                      </span>
                    </div>

                    <button
                      id="dropdown-dashboard-btn"
                      onClick={() => handleNavClick(getDashboardRoute())}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                      <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard</span>
                    </button>

                    {user.role === 'farmer' && (
                      <>
                        <button
                          id="dropdown-my-products-btn"
                          onClick={() => handleNavClick('farmer-products')}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer font-medium"
                        >
                          <Store className="w-4 h-4 text-emerald-600" />
                          <span>My Listed Products</span>
                        </button>
                        <button
                          id="dropdown-add-product-btn"
                          onClick={() => handleNavClick('farmer-add-product')}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer font-medium"
                        >
                          <Sprout className="w-4 h-4 text-emerald-600" />
                          <span>Add New Harvest</span>
                        </button>
                      </>
                    )}

                    {user.role === 'buyer' && (
                      <button
                        id="dropdown-buyer-orders-btn"
                        onClick={() => handleNavClick('buyer-orders')}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer font-medium"
                      >
                        <Store className="w-4 h-4 text-emerald-600" />
                        <span>My Purchase Orders</span>
                      </button>
                    )}

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        id="dropdown-logout-btn"
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          handleNavClick('home');
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-rose-600 hover:bg-rose-50 cursor-pointer font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="flex items-center rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-2xs">
                    <button
                      id="nav-login-btn"
                      onClick={() => handleNavClick('login')}
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-emerald-700 cursor-pointer flex items-center gap-1.5"
                    >
                      <LogIn className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Login</span>
                    </button>
                    <button
                      id="nav-login-dropdown-btn"
                      onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                      className="p-1.5 border-l border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-r-xl cursor-pointer"
                      title="Select login portal"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {loginDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3.5 py-1.5 border-b border-slate-100">
                        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          Select Login Portal
                        </p>
                      </div>
                      
                      <button
                        id="nav-portal-farmer-btn"
                        onClick={() => handleNavClick('login-farmer')}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 hover:bg-emerald-50 text-left cursor-pointer transition-colors group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Sprout className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">🌾 Farmer Portal (किसान लगइन)</p>
                          <p className="text-[10px] text-slate-500">Sell harvests, AI prices & group pool</p>
                        </div>
                      </button>

                      <button
                        id="nav-portal-buyer-btn"
                        onClick={() => handleNavClick('login-buyer')}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 hover:bg-slate-100 text-left cursor-pointer transition-colors group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <ShoppingCart className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-slate-950">🛒 Wholesale Buyer Portal</p>
                          <p className="text-[10px] text-slate-500">Hotels, supermarkets & procurement</p>
                        </div>
                      </button>

                      <button
                        id="nav-portal-admin-btn"
                        onClick={() => handleNavClick('login-admin')}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 hover:bg-slate-100 text-left cursor-pointer transition-colors group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">🛡️ Ministry / Admin Portal</p>
                          <p className="text-[10px] text-slate-500">KYC verification & governance</p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                <button
                  id="nav-register-btn"
                  onClick={() => handleNavClick('register')}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs cursor-pointer transition-all"
                >
                  Join KisanLink
                </button>
              </div>
            )}

            {/* Dashboard Quick Pill button */}
            {user && (
              <button
                id="main-dashboard-cta"
                onClick={() => handleNavClick(getDashboardRoute())}
                className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-2">
            <button
              id="mobile-quick-dashboard"
              onClick={() => handleNavClick(getDashboardRoute())}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>My Dashboard</span>
            </button>
            <button
              id="mobile-quick-ai"
              onClick={() => handleNavClick('ai-price-advisor')}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>AI Advisor</span>
            </button>
          </div>

          <div className="border-t border-slate-100 pt-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer ${
                  currentTab === item.id
                    ? 'text-emerald-700 bg-emerald-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {user ? (
            <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="text-xs font-bold text-slate-900">{user.name}</p>
                  <p className="text-[10px] text-emerald-600 capitalize font-medium">{user.role} • {user.location}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-md font-semibold cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="border-t border-slate-100 pt-3 space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Login to Portals</p>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => handleNavClick('login-farmer')}
                  className="py-2 px-1 text-center text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl"
                >
                  🌾 Farmer
                </button>
                <button
                  onClick={() => handleNavClick('login-buyer')}
                  className="py-2 px-1 text-center text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 rounded-xl"
                >
                  🛒 Buyer
                </button>
                <button
                  onClick={() => handleNavClick('login-admin')}
                  className="py-2 px-1 text-center text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 rounded-xl"
                >
                  🛡️ Admin
                </button>
              </div>
              <button
                onClick={() => handleNavClick('register')}
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-emerald-600 rounded-xl shadow-xs"
              >
                Create New Account
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
