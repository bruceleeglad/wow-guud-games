'use client';

import React, { useState } from 'react';
import { SAMPLE_ARBITRAGE_DEALS } from '@/data/arbitrage';
import { Zap, ArrowRight, Copy, Check, Clock, ShieldCheck } from 'lucide-react';

export default function ArbitrageFeed() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm uppercase tracking-wider mb-1">
            <Zap className="w-4 h-4" />
            <span>Warband Cross-Realm Scanner</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">FlipRadar™ Live Arbitrage</h2>
          <p className="text-neutral-400 text-sm mt-1">
            Realtids-scanning af Blizzards forbundne auktionshuse. Køb billigt på en realm, sælg dyrt via Warband-banken.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>EU Live Feed Aktiv</span>
        </div>
      </div>

      {/* Deals List */}
      <div className="space-y-3.5">
        {SAMPLE_ARBITRAGE_DEALS.map(deal => (
          <div
            key={deal.id}
            className="bg-neutral-950/70 border border-neutral-800 hover:border-indigo-500/40 rounded-xl p-4 sm:p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Left: Item info */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-2xl shadow-inner shrink-0">
                {deal.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold text-base ${
                    deal.itemQuality === 'epic' ? 'text-purple-400' :
                    deal.itemQuality === 'rare' ? 'text-blue-400' : 'text-green-400'
                  }`}>
                    {deal.itemName}
                  </h3>
                  <button
                    onClick={() => handleCopy(deal.id, deal.itemName)}
                    title="Kopier item-navn til in-game søgning"
                    className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all"
                  >
                    {copiedId === deal.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {deal.detectedMinutesAgo} min siden
                  </span>
                  <span>•</span>
                  <span>Omsætning: <strong className="text-neutral-300">{deal.volumeScore}</strong></span>
                </div>
              </div>
            </div>

            {/* Middle: Route */}
            <div className="flex items-center gap-3 bg-neutral-900/60 border border-neutral-800/80 px-4 py-2.5 rounded-lg text-xs">
              <div className="text-left">
                <span className="text-neutral-500 block">Køb på</span>
                <span className="font-semibold text-neutral-200">{deal.sourceRealm}</span>
                <span className="block font-mono text-amber-400 font-bold">{deal.sourcePriceGold.toLocaleString('da-DK')}g</span>
              </div>

              <ArrowRight className="w-4 h-4 text-neutral-600 shrink-0" />

              <div className="text-left">
                <span className="text-neutral-500 block">Sælg på</span>
                <span className="font-semibold text-neutral-200">{deal.targetRealm}</span>
                <span className="block font-mono text-emerald-400 font-bold">{deal.targetPriceGold.toLocaleString('da-DK')}g</span>
              </div>
            </div>

            {/* Right: Profit & Action */}
            <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
              <div className="text-right">
                <span className="text-xs text-neutral-500 block">Estimeret Profit</span>
                <span className="text-lg font-extrabold text-emerald-400 font-mono">
                  +{deal.estProfitGold.toLocaleString('da-DK')}g
                </span>
                <span className="text-xs text-emerald-500/90 font-semibold block">
                  +{deal.roiPercent}% ROI
                </span>
              </div>

              <button
                onClick={() => alert(`Kopieret søgestreng for '${deal.itemName}'. Åbn WoW og paste i auktionshuset.`)}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/20"
              >
                Snipe Nu
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 p-3 rounded-xl bg-neutral-950/40 border border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Opdateres automatisk hvert 15. minut via officiel Battle.net REST API.</span>
        </span>
        <span className="text-indigo-400 font-semibold hover:underline cursor-pointer">
          Opgradér til Pro for live Discord-webhooks ➔
        </span>
      </div>
    </div>
  );
}
