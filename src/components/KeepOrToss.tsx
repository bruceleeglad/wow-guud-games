'use client';

import React, { useState } from 'react';
import { FOREVER_ITEMS, WowItem } from '@/data/items';
import { Search, CheckCircle2, XCircle, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';

export default function KeepOrToss() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');

  const categories = ['Alle', 'Crafting', 'Quest Item', 'Consumable', 'Gear'];

  const filteredItems = FOREVER_ITEMS.filter(item => {
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) ||
                         item.reason.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'Alle' || item.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>WoW: Forever & Classic Item Database</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Keep or Toss™ Scanner</h2>
          <p className="text-neutral-400 text-sm mt-1">
            Undgå at sælge værdifulde quest- og crafting-items til 20 kobber. Tast et item for øjeblikkeligt svar.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Søg f.eks. 'Larval Acid', 'Felcloth', 'Boar Tusk', 'Jordan'..."
          className="w-full bg-neutral-950/80 border border-neutral-700/80 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 transition-all text-base"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-neutral-800/60 text-neutral-400 hover:text-white border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-neutral-950/60 border border-neutral-800 hover:border-neutral-700 rounded-xl p-4 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xl shadow-inner">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className={`font-bold text-base leading-tight ${
                      item.quality === 'epic' ? 'text-purple-400' :
                      item.quality === 'rare' ? 'text-blue-400' :
                      item.quality === 'uncommon' ? 'text-green-400' :
                      item.quality === 'poor' ? 'text-neutral-500' : 'text-neutral-200'
                    }`}>
                      {item.name}
                    </h3>
                    <span className="text-xs text-neutral-500">{item.category}</span>
                  </div>
                </div>

                {/* Verdict Badge */}
                <div>
                  {item.verdict === 'KEEP' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs tracking-wide">
                      <CheckCircle2 className="w-3.5 h-3.5" /> KEEP
                    </span>
                  )}
                  {item.verdict === 'AUCTION' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs tracking-wide">
                      <TrendingUp className="w-3.5 h-3.5" /> AH FLIP
                    </span>
                  )}
                  {item.verdict === 'TOSS' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold text-xs tracking-wide">
                      <XCircle className="w-3.5 h-3.5" /> VENDOR
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                {item.reason}
              </p>

              {item.foreverNote && (
                <div className="mt-3 p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Forever Værdi:</strong> {item.foreverNote}</span>
                </div>
              )}
            </div>

            {/* Price Footer */}
            <div className="flex items-center justify-between border-t border-neutral-800/80 pt-3 mt-4 text-xs">
              <span className="text-neutral-500">
                Vendor: <strong className="text-neutral-300">{item.vendorPrice}</strong>
              </span>
              <span className="text-neutral-500">
                AH Gennemsnit: <strong className="text-amber-400 font-mono font-semibold">{item.ahMedianPrice}</strong>
              </span>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full py-12 text-center text-neutral-500">
            Ingen items fundet for &quot;{query}&quot;. Tilføj flere via Blizzard API integration.
          </div>
        )}
      </div>
    </div>
  );
}
