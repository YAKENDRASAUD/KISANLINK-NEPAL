import React from 'react';
import { Product } from '../../types';
import {
  X,
  MapPin,
  ShieldCheck,
  Calendar,
  Layers,
  Phone,
  QrCode,
  Tag,
  ShoppingCart,
  Sparkles,
  Building2,
  CheckCircle2,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onOpenOrder: (product: Product, mode: 'order' | 'offer') => void;
  onOpenQr: (batchId: string) => void;
  onAskAi: (cropName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenOrder,
  onOpenQr,
  onAskAi,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image & Badges */}
          <div className="relative h-64 md:h-full min-h-[300px] bg-slate-900">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Farmer Listing
              </span>
              <span className="bg-white/90 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {product.quality}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs text-emerald-300 font-mono font-medium block">
                Batch ID: {product.batchId}
              </span>
              <p className="text-sm font-semibold flex items-center gap-1 mt-0.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                {product.location}
              </p>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="p-6 md:p-8 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                  {product.category}
                </span>
                <h2 className="text-2xl font-black text-slate-900 font-display mt-0.5">
                  {product.name}
                </h2>
              </div>

              {/* Price & Quantity Grid */}
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Direct Farm Gate Price</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-emerald-800 font-display">
                      Rs. {product.price}
                    </span>
                    <span className="text-sm font-bold text-slate-600">/{product.unit}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 font-medium block">Available Lot</span>
                  <span className="text-lg font-extrabold text-slate-900 font-display">
                    {product.quantity} {product.unit}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1 text-xs text-slate-600 leading-relaxed">
                <h4 className="font-bold text-slate-800">Harvest Details</h4>
                <p>{product.description}</p>
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block">Harvest Date</span>
                    <span className="font-bold text-slate-800">{product.harvestDate}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block">Collection Center</span>
                    <span className="font-bold text-slate-800 truncate block">Panauti Hub</span>
                  </div>
                </div>
              </div>

              {/* Farmer Info */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Cultivated by</p>
                  <p className="text-sm font-bold text-slate-900">{product.farmerName}</p>
                  <p className="text-[11px] text-emerald-700 font-semibold">{product.farmerPhone}</p>
                </div>
                <button
                  onClick={() => onOpenQr(product.batchId)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-emerald-50 text-slate-800 rounded-xl border border-slate-200 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>Passport</span>
                </button>
              </div>

              {/* AI Shortcut */}
              <button
                onClick={() => {
                  onClose();
                  onAskAi(product.name);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-100/70 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-colors cursor-pointer border border-emerald-300"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
                <span>Ask AI: Is Rs. {product.price}/{product.unit} fair for this batch?</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenOrder(product, 'offer');
                }}
                className="py-3 px-4 rounded-xl border-2 border-emerald-600 text-emerald-800 text-xs font-extrabold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Tag className="w-4 h-4" />
                <span>Make an Offer</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenOrder(product, 'order');
                }}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Purchase Order</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
