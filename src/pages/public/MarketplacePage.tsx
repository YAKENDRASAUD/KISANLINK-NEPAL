import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { api } from '../../services/api';
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  ShieldCheck,
  Tag,
  ShoppingCart,
  QrCode,
  Phone,
  Calendar,
  Sparkles,
  ArrowUpDown,
  CheckCircle2,
  Sprout,
  X,
} from 'lucide-react';

interface MarketplacePageProps {
  onOpenProduct: (product: Product) => void;
  onOpenOrder: (product: Product, mode: 'order' | 'offer') => void;
  onOpenQr: (batchId: string) => void;
  onNavigate: (tab: string) => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  onOpenProduct,
  onOpenOrder,
  onOpenQr,
  onNavigate,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedQuality, setSelectedQuality] = useState('All');
  const [selectedSort, setSelectedSort] = useState('newest');

  const categories = ['All', 'Vegetables', 'Fruits', 'Cash Crops', 'Grains', 'Spices'];
  const locations = ['All', 'Kavre', 'Chitwan', 'Mustang', 'Jhapa', 'Dhading', 'Ilam'];
  const qualities = ['All', 'Grade A', 'Grade B', 'Organic'];

  const fetchFilteredProducts = async () => {
    setLoading(true);
    try {
      const res = await api.getProducts({
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        location: selectedLocation !== 'All' ? selectedLocation : undefined,
        quality: selectedQuality !== 'All' ? selectedQuality : undefined,
        search: searchTerm.trim() || undefined,
        sort: selectedSort,
      });
      setProducts(res.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [selectedCategory, selectedLocation, selectedQuality, selectedSort]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFilteredProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-emerald-800 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 w-1/3 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-2xl space-y-2 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-bold border border-emerald-500/50">
            <Sprout className="w-3.5 h-3.5" />
            <span>Direct Farm Gate Marketplace</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display">
            Fresh Nepali Farm Harvests
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Browse verified listings directly from smallholder farmers & agricultural cooperatives across Nepal. No middleman markups.
          </p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        
        {/* Search Bar & Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search crops (Tomato, Potato, Cauliflower...), farmer name, or district..."
              className="w-full pl-10 pr-24 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  fetchFilteredProducts();
                }}
                className="absolute right-12 top-2.5 text-xs text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <ArrowUpDown className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full sm:w-auto px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden cursor-pointer"
            >
              <option value="newest">Sort: Newest Harvest</option>
              <option value="lowest">Sort: Lowest Price (Rs.)</option>
              <option value="highest">Sort: Highest Price (Rs.)</option>
              <option value="quantity">Sort: Available Quantity</option>
            </select>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold mr-1 shrink-0">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary filters: Location & Quality */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold text-slate-600">Location:</span>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold text-slate-600">Grade / Quality:</span>
            <select
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              {qualities.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          <div className="ml-auto text-slate-500 text-xs font-medium">
            Showing <strong className="text-slate-800">{products.length}</strong> active farm batches
          </div>
        </div>

      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium">Fetching verified farm listings...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Sprout className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg font-display">No harvests matched your criteria</h3>
          <p className="text-xs text-slate-500">
            Try resetting your search query or selecting "All" categories to view all active listings in Nepal.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedLocation('All');
              setSelectedQuality('All');
              setSearchTerm('');
            }}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badges */}
                <div
                  onClick={() => onOpenProduct(p)}
                  className="relative h-48 overflow-hidden bg-slate-100 cursor-pointer"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    <span className="bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs border border-slate-200">
                      {p.quality}
                    </span>
                    <span className="bg-emerald-950/80 backdrop-blur-xs text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      {p.category}
                    </span>
                  </div>

                  {p.farmerVerified && (
                    <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  )}

                  <div className="absolute bottom-2 right-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenQr(p.batchId);
                      }}
                      title="View QR Traceability"
                      className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-800 shadow-md hover:scale-110 transition-all cursor-pointer"
                    >
                      <QrCode className="w-4 h-4 text-emerald-700" />
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate max-w-[130px]">{p.location}</span>
                    </span>
                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                      {p.batchId}
                    </span>
                  </div>

                  <h3
                    onClick={() => onOpenProduct(p)}
                    className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 transition-colors cursor-pointer truncate font-display"
                  >
                    {p.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-xl font-black text-emerald-700 font-display">
                        Rs. {p.price}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">/{p.unit}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">
                      {p.quantity} {p.unit} <span className="text-[11px] text-slate-400 font-normal">avail</span>
                    </span>
                  </div>

                  <div className="bg-emerald-50/50 p-2 rounded-xl border border-emerald-100/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-600">Farmer: <strong className="text-slate-900 font-semibold">{p.farmerName}</strong></span>
                    <span className="text-emerald-700 font-semibold">{p.farmerPhone}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenOrder(p, 'offer')}
                  className="py-2 px-2.5 rounded-xl border border-emerald-300 hover:bg-emerald-50 text-emerald-800 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Make Offer</span>
                </button>
                <button
                  onClick={() => onOpenOrder(p, 'order')}
                  className="py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Order Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
