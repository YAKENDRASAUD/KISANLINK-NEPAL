import React, { useState, useEffect } from 'react';
import { CollectionCenter, StorageFacility } from '../../types';
import { api } from '../../services/api';
import confetti from 'canvas-confetti';
import {
  Building2,
  Warehouse,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  Truck,
  Scale,
  Thermometer,
  ShieldCheck,
  Calendar,
  Sparkles,
  Search,
  X,
} from 'lucide-react';

export const CentersStoragePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'centers' | 'storage'>('centers');
  const [centers, setCenters] = useState<CollectionCenter[]>([]);
  const [storages, setStorages] = useState<StorageFacility[]>([]);
  const [loading, setLoading] = useState(true);

  // Booking modal
  const [bookingStorage, setBookingStorage] = useState<StorageFacility | null>(null);
  const [cropToStore, setCropToStore] = useState('Potato');
  const [quantityToStore, setQuantityToStore] = useState(200);
  const [durationMonths, setDurationMonths] = useState(2);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const [cRes, sRes] = await Promise.all([
          api.getCollectionCenters(),
          api.getStorageFacilities(),
        ]);
        if (isMounted) {
          setCenters(cRes.collectionCenters);
          setStorages(sRes.storageFacilities);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    confetti({
      particleCount: 70,
      spread: 60,
    });
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingStorage(null);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-emerald-800 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-bold border border-emerald-500/50">
            <Building2 className="w-3.5 h-3.5" />
            <span>Physical Agri Logistics & Cold Chain Network</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display">
            Collection Centers & Storage
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Eliminate distress sales and post-harvest spoilage. Find verified local collection centers for digital weighing and access nearby temperature-controlled cold storages across Nepal.
          </p>

          {/* Tab Switcher */}
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => setActiveTab('centers')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'centers'
                  ? 'bg-white text-emerald-950 shadow-md'
                  : 'bg-emerald-700/80 text-emerald-100 hover:bg-emerald-700'
              }`}
            >
              Collection Centers ({centers.length})
            </button>
            <button
              onClick={() => setActiveTab('storage')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'storage'
                  ? 'bg-white text-emerald-950 shadow-md'
                  : 'bg-emerald-700/80 text-emerald-100 hover:bg-emerald-700'
              }`}
            >
              Cold & Grain Storage ({storages.length})
            </button>
          </div>
        </div>
      </div>

      {/* Collection Centers View */}
      {activeTab === 'centers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                Registered Collection Centers
              </h2>
              <p className="text-xs text-slate-500">
                Drop your crop off for certified weighing, quality inspection, and consolidated dispatch.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {centers.map((center) => (
              <div
                key={center.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all p-6 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base font-display">
                        {center.name}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{center.district}, {center.province}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                    {center.status}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Supervisor:</span>
                    <strong className="text-slate-900">{center.supervisor}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Direct Contact:</span>
                    <span className="font-semibold text-emerald-700">{center.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Operating Hours:</span>
                    <span className="text-slate-700 font-medium">{center.timing}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                    <span className="text-slate-500">Daily Intake Capacity:</span>
                    <span className="font-bold text-slate-800">{center.dailyCapacity}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-700 block">Available Hub Services:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {center.services.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">Free digital scale weighing</span>
                  <a
                    href={`tel:${center.phone}`}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                  >
                    Call Supervisor
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Storage Facilities View */}
      {activeTab === 'storage' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                Cold Storage & Warehouses
              </h2>
              <p className="text-xs text-slate-500">
                Preserve produce to sell when market prices peak.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {storages.map((storage) => {
              const used = storage.totalCapacity - storage.availableSpace;
              const usedPercentage = Math.round((used / storage.totalCapacity) * 100);

              return (
                <div
                  key={storage.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                          <Warehouse className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-base font-display">
                            {storage.name}
                          </h3>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{storage.location}</span>
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-800 shrink-0 flex items-center gap-1">
                        <Thermometer className="w-3 h-3" />
                        {storage.temperature}
                      </span>
                    </div>

                    {/* Capacity Progress */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-slate-700">Space Availability</span>
                        <span className="text-emerald-700">
                          {storage.availableSpace} {storage.unit} free of {storage.totalCapacity} {storage.unit}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-emerald-600 h-2.5 rounded-full"
                          style={{ width: `${usedPercentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>{usedPercentage}% capacity utilized</span>
                        <span>Rate: <strong className="text-slate-800">Rs. {storage.ratePerKgPerMonth}/kg/month</strong></span>
                      </div>
                    </div>

                    {/* Suitable crops */}
                    <div className="space-y-1 text-xs">
                      <span className="text-[11px] font-bold text-slate-700 block">Suitable Commodities:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {storage.suitableCrops.map((crop, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Contact: {storage.contactPhone}</span>
                    <button
                      onClick={() => setBookingStorage(storage)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                    >
                      Reserve Storage Slot
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Booking Slot Modal */}
      {bookingStorage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base font-display">
                  Reserve Storage Capacity
                </h3>
                <p className="text-xs text-emerald-700 font-semibold">{bookingStorage.name}</p>
              </div>
              <button
                onClick={() => setBookingStorage(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-base">Reservation Confirmed!</h4>
                <p className="text-xs text-slate-500">
                  Facility manager has received your slot request for {quantityToStore} kg of {cropToStore}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Crop to Store</label>
                  <input
                    type="text"
                    value={cropToStore}
                    onChange={(e) => setCropToStore(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Quantity (kg)</label>
                    <input
                      type="number"
                      min="50"
                      value={quantityToStore}
                      onChange={(e) => setQuantityToStore(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Duration (Months)</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={durationMonths}
                      onChange={(e) => setDurationMonths(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex items-center justify-between">
                  <span className="text-slate-600">Estimated Storage Cost:</span>
                  <span className="font-bold text-emerald-800 text-sm font-display">
                    Rs. {(quantityToStore * durationMonths * bookingStorage.ratePerKgPerMonth).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setBookingStorage(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20 cursor-pointer"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
