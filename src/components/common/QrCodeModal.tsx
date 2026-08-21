import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { TraceabilityBatch } from '../../types';
import { api } from '../../services/api';
import {
  X,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Sprout,
  Building2,
  Download,
  Share2,
  Printer,
  Sparkles,
} from 'lucide-react';

interface QrCodeModalProps {
  batchId: string;
  onClose: () => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ batchId, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [batch, setBatch] = useState<TraceabilityBatch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const res = await api.getTraceability(batchId);
        if (isMounted) {
          setBatch(res.batch);
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
  }, [batchId]);

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 relative">
        {/* Header */}
        <div className="sticky top-0 bg-emerald-800 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700/80 flex items-center justify-center border border-emerald-500/50">
              <QrCode className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight font-display">
                Digital Traceability Passport
              </h3>
              <p className="text-xs text-emerald-200">Batch ID: {batchId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-700/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-medium">Verifying blockchain-style audit trail...</p>
          </div>
        ) : batch ? (
          <div className="p-6 space-y-6">
            
            {/* Top QR & Summary Card */}
            <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100 flex flex-col sm:flex-row items-center gap-6">
              <div className="bg-white p-2.5 rounded-xl shadow-xs border border-emerald-200 text-center shrink-0">
                <canvas ref={canvasRef} className="mx-auto" />
                <span className="text-[10px] text-slate-500 font-mono font-medium block mt-1">
                  Scan with any phone camera
                </span>
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>{batch.verificationStatus} Produce</span>
                </div>
                <h4 className="text-lg font-extrabold text-slate-900 font-display">
                  {batch.productName}
                </h4>
                <p className="text-xs text-slate-600">
                  <strong>Farmer / Origin:</strong> {batch.farmerName} • {batch.farmLocation}
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="bg-white p-2 rounded-lg border border-emerald-100">
                    <span className="text-slate-600 block text-[11px]">Harvest Date</span>
                    <span className="font-bold text-slate-800">{batch.harvestDate}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-emerald-100">
                    <span className="text-slate-600 block text-[11px]">Quality Grade</span>
                    <span className="font-bold text-slate-800">{batch.quality}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality & Safety Tests */}
            <div className="space-y-2.5">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Verified Quality & Lab Parameters
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {batch.qualityTests.map((t, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{t.parameter}</p>
                      <p className="text-[11px] text-slate-600">Std: {t.standard}</p>
                    </div>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-md flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {t.result}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Timeline */}
            <div className="space-y-2.5">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Supply Chain Journey & Custody
              </h5>
              <div className="relative pl-6 border-l-2 border-emerald-200 space-y-4 text-xs">
                {batch.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-200 flex items-center justify-center text-white text-[9px] font-bold">
                      {step.step}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <p className="font-bold text-slate-900 text-sm">{step.title}</p>
                        <span className="text-[11px] text-slate-500 font-medium">{step.timestamp}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-0.5">
                        <span className="font-semibold">Location:</span> {step.location}
                      </p>
                      <p className="text-emerald-700 text-[11px] font-medium">
                        Verified by: {step.verifiedBy}
                      </p>
                      {step.notes && (
                        <p className="text-slate-500 text-[11px] bg-slate-50 p-1.5 rounded mt-1 border border-slate-100">
                          {step.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] text-slate-500">
                Verified through KisanLink Nepal Digital Gateway
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>

          </div>
        ) : null}
      </div>
    </div>
  );
};
