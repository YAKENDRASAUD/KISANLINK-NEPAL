import React, { useState } from 'react';
import { Product, Order } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import confetti from 'canvas-confetti';
import {
  X,
  ShoppingCart,
  MapPin,
  Truck,
  Building2,
  CheckCircle2,
  AlertCircle,
  Tag,
} from 'lucide-react';

interface OrderModalProps {
  product: Product;
  mode?: 'order' | 'offer';
  onClose: () => void;
  onSuccess: (order: Order) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  product,
  mode = 'order',
  onClose,
  onSuccess,
}) => {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState<number>(Math.min(100, product.quantity));
  const [offerPrice, setOfferPrice] = useState<number>(product.price);
  const [deliveryType, setDeliveryType] = useState<
    'Collection Center' | 'Direct Farm Pickup' | 'Doorstep Delivery'
  >('Collection Center');
  const [collectionCenterName, setCollectionCenterName] = useState('Kavre Collection Center (Panauti)');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const currentPrice = mode === 'offer' ? offerPrice : product.price;
  const totalAmount = quantity * currentPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0) {
      setError('Please enter a valid quantity.');
      return;
    }
    if (quantity > product.quantity) {
      setError(`Maximum available quantity is ${product.quantity} ${product.unit}.`);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await api.createOrder({
        buyerId: user?.id || 'user-buyer-1',
        buyerName: user?.name || 'Kathmandu Fresh Wholesalers',
        buyerPhone: user?.phone || '+977 9849876543',
        productId: product.id,
        quantity,
        deliveryType,
        collectionCenterName: deliveryType === 'Collection Center' ? collectionCenterName : undefined,
        notes: mode === 'offer' ? `Buyer proposed offer of Rs. ${offerPrice}/${product.unit}. ${notes}` : notes,
      });

      if (res.success) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
        onSuccess(res.order);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to place order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200">
        {/* Header */}
        <div className="bg-emerald-800 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700/80 flex items-center justify-center border border-emerald-500/50">
              {mode === 'offer' ? <Tag className="w-4 h-4 text-emerald-200" /> : <ShoppingCart className="w-4 h-4 text-emerald-200" />}
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg font-display">
                {mode === 'offer' ? 'Make a Price Offer' : 'Send Purchase Order'}
              </h3>
              <p className="text-xs text-emerald-200">To: {product.farmerName} ({product.location})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-700/60 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Product Snippet */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-14 h-14 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-900 text-sm truncate">{product.name}</h4>
              <p className="text-xs text-slate-500">Available: {product.quantity} {product.unit} • {product.quality}</p>
              <p className="text-xs font-bold text-emerald-700">Listed: Rs. {product.price}/{product.unit}</p>
            </div>
          </div>

          {/* Quantity selector */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700">Order Quantity ({product.unit})</label>
              <span className="text-xs text-slate-500">Max: {product.quantity} {product.unit}</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max={product.quantity}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.quantity, Number(e.target.value))))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
              <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
                {product.unit}
              </span>
            </div>
          </div>

          {/* Offer Price if in offer mode */}
          {mode === 'offer' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Proposed Price (Rs. per {product.unit})
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">Rs.</span>
                <input
                  type="number"
                  min="1"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                The farmer will review your proposed rate of Rs. {offerPrice}/{product.unit}.
              </p>
            </div>
          )}

          {/* Delivery & Logistics */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Logistics & Delivery Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: 'Collection Center', label: 'Collection Center', icon: Building2, desc: 'Pick up at hub' },
                { id: 'Direct Farm Pickup', label: 'Farm Pickup', icon: MapPin, desc: 'Buyer trucks at farm' },
                { id: 'Doorstep Delivery', label: 'Delivery', icon: Truck, desc: 'Direct to business' },
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = deliveryType === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setDeliveryType(opt.id as any)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1 ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`} />
                    <p className="font-bold text-[11px]">{opt.label}</p>
                    <p className="text-[10px] text-slate-500">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {deliveryType === 'Collection Center' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Designated Collection Center
              </label>
              <select
                value={collectionCenterName}
                onChange={(e) => setCollectionCenterName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 bg-white focus:outline-hidden"
              >
                <option value="Kavre Collection Center (Panauti)">Kavre Collection Center (Panauti) - 2.5 km</option>
                <option value="Panauti Center (Kavre)">Panauti Center (Bazar) - 5 km</option>
                <option value="Banepa Center (Kavre)">Banepa Center - 8 km</option>
                <option value="Chitwan Agri Hub (Bharatpur)">Chitwan Agri Hub - 12 km</option>
              </select>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Order Instructions & Special Requirements (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Please pack into 20kg perforated crates. Required for Thursday morning shipment."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Total Calculation */}
          <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-600 block">Total Payable Estimate</span>
              <span className="text-[11px] text-slate-500">
                {quantity} {product.unit} × Rs. {currentPrice}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xl font-extrabold text-emerald-800 font-display">
                Rs. {totalAmount.toLocaleString()}
              </span>
              <span className="block text-[10px] text-emerald-600 font-medium">
                No Middleman Surcharges
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{mode === 'offer' ? 'Send Offer to Farmer' : 'Confirm Order Request'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
