'use client';

import React, { useState, useEffect } from 'react';
import InstagramIcon from './InstagramIcon';
import {
  X,
  CheckCircle2,
  Copy,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Check,
  Flame,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApplyDiscount?: (code: string) => void;
}

export default function InstagramDiscountModal({ isOpen, onClose, onApplyDiscount }: Props) {
  const [handle, setHandle] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifiedData, setVerifiedData] = useState<{ code: string; percent: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Tjek om brugeren allerede har verificeret i denne session
    const savedCode = localStorage.getItem('wow_ig_discount_code');
    if (savedCode) {
      setVerifiedData({ code: savedCode, percent: 25 });
    }
  }, []);

  if (!isOpen) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) {
      setError('Indtast venligst dit Instagram brugernavn');
      return;
    }

    setError(null);
    setVerifying(true);

    try {
      const res = await fetch('/api/instagram/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Kunne ikke verificere Instagram Story');
      }

      // Simulér kort netværkstjek for lækker UX
      setTimeout(() => {
        setVerifying(false);
        setVerifiedData({ code: data.discountCode, percent: data.discountPercent });
        localStorage.setItem('wow_ig_discount_code', data.discountCode);
        if (onApplyDiscount) {
          onApplyDiscount(data.discountCode);
        }
      }, 1200);
    } catch (err: any) {
      setVerifying(false);
      setError(err.message);
    }
  };

  const copyToClipboard = () => {
    if (verifiedData?.code) {
      navigator.clipboard.writeText(verifiedData.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-neutral-100 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-lg shadow-rose-500/20 text-white">
            <InstagramIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Viral Story Rabat</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Få 25% Rabat på Alt</h2>
          </div>
        </div>

        <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
          Del en Story på Instagram hvor du tagger <strong className="text-white">@guudgames</strong>, og lås øjeblikkeligt op for 25% rabat på <em>FlipRadar Pro</em> eller <em>RaidBrain Guild</em>.
        </p>

        {!verifiedData ? (
          <div>
            {/* Step instructions */}
            <div className="space-y-3.5 mb-6">
              <div className="flex items-start gap-3 bg-neutral-950/70 border border-neutral-800/80 rounded-2xl p-3.5">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div className="text-xs">
                  <p className="font-semibold text-neutral-200">Læg en Story op på Instagram</p>
                  <p className="text-neutral-400 mt-0.5">
                    Vis et Keep or Toss opslag eller FlipRadar guld-arbitrage, og tag <strong className="text-rose-400">@guudgames</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-neutral-950/70 border border-neutral-800/80 rounded-2xl p-3.5">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div className="text-xs">
                  <p className="font-semibold text-neutral-200">Indtast dit brugernavn nedenfor</p>
                  <p className="text-neutral-400 mt-0.5">
                    Vores automatiske Story Webhook bekræfter delingen og udløser din rabatkode med det samme.
                  </p>
                </div>
              </div>
            </div>

            {/* Input form */}
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                  Dit Instagram Brugernavn
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-bold">
                    @
                  </span>
                  <input
                    type="text"
                    value={handle.replace(/^@/, '')}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="dit_instagram_handle"
                    disabled={verifying}
                    className="w-full bg-neutral-950 border border-neutral-700/80 rounded-xl pl-9 pr-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all text-sm font-medium"
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg p-2.5">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={verifying}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-400 hover:to-purple-500 text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 disabled:opacity-50"
              >
                {verifying ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Tjekker Instagram Story...</span>
                  </>
                ) : (
                  <>
                    <span>Bekræft Story & Få 25% Rabat</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white mb-1">Story Bekræftet! 🎉</h3>
            <p className="text-xs text-neutral-300 mb-5">
              Tak fordi du delte med dit netværk! Din personlige 25% rabatkode er nu aktiv:
            </p>

            <div className="flex items-center justify-between gap-3 bg-neutral-950 border border-emerald-500/40 rounded-xl p-3 mb-4">
              <span className="font-mono text-xl font-black text-amber-400 tracking-wider">
                {verifiedData.code}
              </span>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Kopieret!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kopier</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all"
            >
              Gå til Priser & Brug Rabat
            </button>
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Officielt Meta API & Stripe Valideret</span>
          </span>
          <span>Gyldig i 48 timer</span>
        </div>
      </div>
    </div>
  );
}
