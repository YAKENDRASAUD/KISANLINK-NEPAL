import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { TraceabilityBatch } from '../../types';
import { api } from '../../services/api';
import {
  QrCode,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Calendar,
  Sprout,
  Building2,
  Search,
  Printer,
  Sparkles,
  Award,
  Layers,
} from 'lucide-react';

interface TraceabilityPageProps {
  initialBatchId?: string;
}

export const TraceabilityPage: React.FC<TraceabilityPageProps> = ({
  initialBatchId = 'KLN-2026-TM-049',
}) => {
  const [batchIdInput, setBatchIdInput] = useState(initialBatchId);
  const [batch, setBatch] = useState<TraceabilityBatch | null>(null);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const sampleBatches = [
    'KLN-2026-TM-049',
    'KLN-2026-PT-088',
    'KLN-2026-CF-012',
    'KLN-2026-AP-093',
    'KLN-2026-RC-074',
  ];

  const fetchBatch = async (id: string) => {
    setLoading(true);
    try {
      const res = await api.getTraceability(id);
      setBatch(res.batch);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatch(batchIdInput);
  }, []);

  useEffect(() => {
    if (batch && canvasRef.current) {
      const url = `${window.location.origin}/#traceability?batch=${batch.batchId}`;
      QRCode.toCanvas(
        canvasRef.current,
        url,
        {
          width: 180,
          margin: 1.5,
          color: {
            dark: '#052e16',
            light: '#ffffff',
          },
        },
        (error) => {
          if (error) console.error(error);
        }
      );
    }
  }, [batch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (batchIdInput.trim()) {
      fetchBatch(batchIdInput.trim());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-emerald-800 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-bold border border-emerald-500/50">
            <QrCode className="w-3.5 h-3.5" />
            <span>Farm-to-Fork Transparency Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display">
            Batch QR Traceability Verification
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Scan any batch QR code or enter a lot identifier to audit origin farm GPS, pesticide residue safety checks, collection center intake timestamps, and good agricultural practice compliance.
          </p>
        </div>
      </div>

      {/* Batch Lookup Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={batchIdInput}
              onChange={(e) => setBatchIdInput(e.target.value)}
              placeholder="Enter Batch ID (e.g. KLN-2026-TM-049)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
          >
            Verify Batch
          </button>
        </form>

        <div className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
          <span className="font-semibold shrink-0">Sample Batch IDs:</span>
          {sampleBatches.map((id) => (
            <button
              key={id}
              onClick={() => {
                setBatchIdInput(id);
                fetchBatch(id);
              }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 rounded-md font-mono text-[11px] transition-colors cursor-pointer"
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      {/* Results view */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium">Verifying digital audit trail...</p>
        </div>
      ) : batch ? (
        <div className="space-y-6">
          
          {/* Top Overview & QR Passport */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 text-center shrink-0">
              <canvas ref={canvasRef} className="mx-auto shadow-xs rounded-lg" />
              <span className="text-[11px] text-slate-500 font-mono font-medium block mt-2">
                Batch: {batch.batchId}
              </span>
            </div>

            <div className="space-y-3 flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold flex items-center gap-1.5 border border-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  {batch.verificationStatus} Produce
                </span>
                <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
                  {batch.category} • {batch.quantity} {batch.unit}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                {batch.productName}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Origin Farm:</strong> {batch.farmerName} • {batch.farmLocation}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Harvest Date</span>
                  <span className="font-bold text-slate-900">{batch.harvestDate}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Quality Specification</span>
                  <span className="font-bold text-slate-900">{batch.quality}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
                  <span className="text-slate-500 block text-[11px]">Collection Hub</span>
                  <span className="font-bold text-slate-900 truncate block">{batch.collectionCenter}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                {batch.certifications.map((c, i) => (
                  <span key={i} className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quality & Safety Test Parameters */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>Certified Quality & Lab Inspection Parameters</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {batch.qualityTests.map((test, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 text-xs">{test.parameter}</p>
                    <p className="text-[11px] text-slate-500">Standard: {test.standard}</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg flex items-center gap-1 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {test.result}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Step-by-Step Chain of Custody */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                Supply Chain Custody & Transit Timeline
              </h3>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>
            </div>

            <div className="relative pl-8 border-l-2 border-emerald-300 space-y-6">
              {batch.timeline.map((step, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[41px] top-0.5 w-6 h-6 rounded-full bg-emerald-600 border-2 border-white ring-4 ring-emerald-100 flex items-center justify-center text-white text-xs font-bold">
                    {step.step}
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
                      <span className="text-xs text-slate-500 font-medium">{step.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong>Location:</strong> {step.location}
                    </p>
                    <p className="text-xs text-emerald-700 font-semibold">
                      Verified by: {step.verifiedBy}
                    </p>
                    {step.notes && (
                      <p className="text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-100 mt-1">
                        {step.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : null}

    </div>
  );
};
