import React, { useState, useEffect } from 'react';
import { GroupSelling } from '../../types';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';
import {
  Users,
  Sprout,
  CheckCircle2,
  Plus,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  ShieldCheck,
  AlertCircle,
  X,
} from 'lucide-react';

interface GroupSellingPageProps {
  onNavigate: (tab: string) => void;
}

export const GroupSellingPage: React.FC<GroupSellingPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [groups, setGroups] = useState<GroupSelling[]>([]);
  const [loading, setLoading] = useState(true);

  // Join modal state
  const [selectedGroup, setSelectedGroup] = useState<GroupSelling | null>(null);
  const [contributeQty, setContributeQty] = useState<number>(50);
  const [isJoining, setIsJoining] = useState(false);

  // Create pool modal state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newProduct, setNewProduct] = useState('Tomato (गोलभेडा)');
  const [newTargetQty, setNewTargetQty] = useState(500);
  const [newTargetPrice, setNewTargetPrice] = useState(80);
  const [newLocation, setNewLocation] = useState('Kavrepalanchok, Bagmati');
  const [newBuyerRequirement, setNewBuyerRequirement] = useState('Kathmandu Hotel & Supermarket Bulk Order');
  const [newInitialQty, setNewInitialQty] = useState(100);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await api.getGroups();
      setGroups(res.groups);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleJoinPool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGroup || contributeQty <= 0) return;

    setIsJoining(true);
    try {
      const res = await api.joinGroup(selectedGroup.id, {
        farmerId: user?.id || 'user-farmer-1',
        farmerName: user?.name || 'Ram K.',
        quantity: contributeQty,
      });
      if (res.success) {
        confetti({
          particleCount: 70,
          spread: 50,
          origin: { y: 0.6 },
        });
        setSelectedGroup(null);
        fetchGroups();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsJoining(false);
    }
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.createGroup({
        groupName: newGroupName || `${newLocation} ${newProduct} Farmers Pool`,
        product: newProduct,
        targetQuantity: newTargetQty,
        targetPrice: newTargetPrice,
        location: newLocation,
        buyerRequirement: newBuyerRequirement,
        initialFarmerQuantity: newInitialQty,
        farmerId: user?.id || 'user-farmer-1',
        farmerName: user?.name || 'Ram K.',
      });
      if (res.success) {
        confetti({
          particleCount: 80,
          spread: 60,
        });
        setCreateModalOpen(false);
        fetchGroups();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-bold border border-emerald-500/50">
            <Users className="w-3.5 h-3.5" />
            <span>Cooperative Aggregation Model</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight font-display">
            Group Selling Pools
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Small farmers earn more together. Pool 40kg, 60kg, or 100kg lots with neighboring farmers to unlock high-volume commercial purchase contracts at premium farm-gate prices.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCreateModalOpen(true)}
              className="px-4 py-2 bg-white text-emerald-950 hover:bg-slate-100 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Start New Farmer Pool</span>
            </button>
            <div className="text-xs text-emerald-300 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct weighing at local collection centers</span>
            </div>
          </div>
        </div>
      </div>

      {/* How Group Selling Works Step Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            step: 'Step 1: Pool Demand',
            title: 'Verified Commercial Buyer Contract',
            desc: 'Hotels & grocery chains post bulk demand (e.g. 500kg Tomatoes at Rs. 80/kg).',
            icon: Building2,
          },
          {
            step: 'Step 2: Farmers Combine',
            title: 'Individual Farmers Contribute',
            desc: 'Farmer A (50kg) + Farmer B (100kg) + Farmer C (150kg) join the pool.',
            icon: Users,
          },
          {
            step: 'Step 3: Direct Payment',
            title: 'Consolidated Delivery & Payout',
            desc: 'Produce collected at Panauti Center and payouts distributed transparently.',
            icon: DollarSign,
          },
        ].map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block font-mono">
                {c.step}
              </span>
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-slate-900 text-sm font-display">{c.title}</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Active Group Selling Pools Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Active Group Selling Pools
            </h2>
            <p className="text-xs text-slate-500">
              Join open pools in your district to lock in guaranteed corporate rates.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
            {groups.length} Pools Active
          </span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs font-medium">Loading group pools...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => {
              const progress = Math.min(100, Math.round((group.totalQuantity / group.targetQuantity) * 100));
              const remaining = Math.max(0, group.targetQuantity - group.totalQuantity);
              const isTargetReached = group.totalQuantity >= group.targetQuantity;

              return (
                <div
                  key={group.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-lg transition-all p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 uppercase">
                          {group.status}
                        </span>
                        <h3 className="font-extrabold text-slate-900 text-base font-display mt-1">
                          {group.groupName}
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{group.location}</span>
                        </p>
                      </div>
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100 shrink-0">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {group.daysLeft} days left
                      </span>
                    </div>

                    {/* Pricing & Buyer Requirements */}
                    <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-500 block text-[11px]">Guaranteed Pool Price</span>
                        <span className="text-base font-black text-emerald-800 font-display">
                          Rs. {group.targetPrice}/kg
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 block text-[11px]">Individual Market Rate</span>
                        <span className="text-xs font-bold text-slate-600 line-through">
                          Rs. {group.marketPrice}/kg
                        </span>
                      </div>
                    </div>

                    {/* Buyer Requirement note */}
                    <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <strong>Buyer Contract:</strong> {group.buyerRequirement} ({group.buyerName})
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-700">
                          {group.totalQuantity} / {group.targetQuantity} kg
                        </span>
                        <span className="text-emerald-700">{progress}% filled</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-emerald-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">
                        {isTargetReached
                          ? '🎉 Target reached! Consolidating delivery.'
                          : `Need ${remaining} kg more to complete order`}
                      </p>
                    </div>

                    {/* Participating Farmers Roster */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[11px] font-bold text-slate-700 block">
                        Participating Farmers ({group.farmers.length})
                      </span>
                      <div className="space-y-1 max-h-24 overflow-y-auto pr-1 text-[11px]">
                        {group.farmers.map((f, i) => (
                          <div key={i} className="flex items-center justify-between py-1 px-2 bg-slate-50 rounded text-slate-700">
                            <span className="font-medium truncate">{f.name}</span>
                            <span className="font-bold text-emerald-700">{f.quantity} kg</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => setSelectedGroup(group)}
                    disabled={isTargetReached}
                    className={`w-full py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isTargetReached
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isTargetReached ? 'Target Reached (Closed)' : 'Contribute My Harvest to Pool'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Join Pool Modal */}
      {selectedGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base font-display">
                  Contribute to Group Pool
                </h3>
                <p className="text-xs text-emerald-700 font-semibold">{selectedGroup.groupName}</p>
              </div>
              <button
                onClick={() => setSelectedGroup(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleJoinPool} className="space-y-4">
              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 text-xs space-y-1">
                <p className="text-slate-600">
                  <strong>Crop:</strong> {selectedGroup.product}
                </p>
                <p className="text-slate-600">
                  <strong>Guaranteed Rate:</strong> Rs. {selectedGroup.targetPrice}/kg
                </p>
                <p className="text-slate-600">
                  <strong>Collection Location:</strong> {selectedGroup.location}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Contribution Quantity (kg)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="10"
                    max={selectedGroup.targetQuantity - selectedGroup.totalQuantity}
                    value={contributeQty}
                    onChange={(e) => setContributeQty(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
                    kg
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Expected farm-gate payout: <strong>Rs. {(contributeQty * selectedGroup.targetPrice).toLocaleString()}</strong>
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedGroup(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isJoining}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 cursor-pointer disabled:opacity-50"
                >
                  {isJoining ? 'Joining Pool...' : 'Confirm Pool Contribution'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New Group Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base font-display">
                  Start New Farmer Group Pool
                </h3>
                <p className="text-xs text-slate-500">Initiate bulk aggregation for your local cooperative</p>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Pool Name</label>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="e.g. Panauti Organic Tomato Syndicate"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Commodity</label>
                  <input
                    type="text"
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">District / Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Volume (kg)</label>
                  <input
                    type="number"
                    min="100"
                    value={newTargetQty}
                    onChange={(e) => setNewTargetQty(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Price (Rs./kg)</label>
                  <input
                    type="number"
                    min="10"
                    value={newTargetPrice}
                    onChange={(e) => setNewTargetPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Buyer Contract / Requirement</label>
                <input
                  type="text"
                  value={newBuyerRequirement}
                  onChange={(e) => setNewBuyerRequirement(e.target.value)}
                  placeholder="e.g. Kathmandu Hotel Association 500kg standing requirement"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Initial Contribution (kg)</label>
                <input
                  type="number"
                  min="10"
                  value={newInitialQty}
                  onChange={(e) => setNewInitialQty(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  Launch Pool
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
