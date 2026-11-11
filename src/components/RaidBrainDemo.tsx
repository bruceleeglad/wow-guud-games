'use client';

import React, { useState } from 'react';
import { SAMPLE_WIPE_DEBRIEF } from '@/data/raidLogs';
import { Bot, Skull, Zap, AlertTriangle, Shield, CheckCircle, ExternalLink } from 'lucide-react';

export default function RaidBrainDemo() {
  const [logUrl, setLogUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(true);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm uppercase tracking-wider mb-1">
            <Bot className="w-4 h-4" />
            <span>AI Post-Wipe Assistant & Discord Bot</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">RaidBrain AI™ Combat Debrief</h2>
          <p className="text-neutral-400 text-sm mt-1">
            Slut med tavshed og brok efter et wipe på 4%. Få et præcist 3-punkts AI resumé direkte i Discord.
          </p>
        </div>

        <button
          onClick={() => alert('Discord Bot link: Tilføj RaidBrain til din guild-server for automatiske rapporter efter hvert wipe.')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-[#5865F2]/20 shrink-0 self-start sm:self-auto"
        >
          <span>Tilføj til Discord</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Input box */}
      <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={logUrl}
          onChange={(e) => setLogUrl(e.target.value)}
          placeholder="Indsæt Warcraft Logs URL (f.eks. https://warcraftlogs.com/reports/...)"
          className="flex-1 bg-neutral-950/80 border border-neutral-700/80 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500/80 focus:ring-1 focus:ring-rose-500/50 text-sm"
        />
        <button
          type="submit"
          disabled={analyzing}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-sm transition-all shadow-md shadow-rose-600/20 disabled:opacity-50 shrink-0"
        >
          {analyzing ? 'Analyserer Combat Log...' : 'Kør AI Wipe Analyse'}
        </button>
      </form>

      {/* Discord Message Card Simulation */}
      {showResult && (
        <div className="bg-[#1E1F22] border border-[#2B2D31] rounded-xl p-5 sm:p-6 text-sm font-sans shadow-xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-[#2B2D31] pb-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white text-lg font-bold shadow-md">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">RaidBrain AI</span>
                <span className="px-1.5 py-0.5 rounded bg-[#5865F2] text-[10px] text-white font-bold uppercase tracking-wider">BOT</span>
                <span className="text-xs text-neutral-400">I dag kl. 21:44</span>
              </div>
              <span className="text-xs text-neutral-400">Automatisk Post-Wipe Debrief • Mythic Hold 1</span>
            </div>
          </div>

          {/* Wipe Metadata Banner */}
          <div className="p-3 rounded-lg bg-[#2B2D31] mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Skull className="w-4 h-4 text-rose-400" />
              <strong className="text-white text-sm">{SAMPLE_WIPE_DEBRIEF.encounterName}</strong>
            </div>
            <div className="flex items-center gap-4 text-neutral-300">
              <span>Wipe tid: <strong>04:08</strong></span>
              <span>Boss tilbage: <strong className="text-rose-400 font-bold">{SAMPLE_WIPE_DEBRIEF.bossHealthPercent}%</strong></span>
            </div>
          </div>

          {/* AI Summary */}
          <p className="text-neutral-200 text-sm leading-relaxed mb-4">
            {SAMPLE_WIPE_DEBRIEF.aiDebriefSummary}
          </p>

          {/* 3 Pillars of Debrief */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-4">
            {/* 1. Primary Cause */}
            <div className="bg-[#2B2D31]/70 border border-rose-500/30 rounded-lg p-3.5">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>1. Hovedårsag til Wipe</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {SAMPLE_WIPE_DEBRIEF.primaryCause}
              </p>
            </div>

            {/* 2. Avoidable Damage */}
            <div className="bg-[#2B2D31]/70 border border-amber-500/30 rounded-lg p-3.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1.5">
                <Zap className="w-4 h-4 shrink-0" />
                <span>2. Undgåelige Dødsfald</span>
              </div>
              <div className="space-y-1.5 text-xs text-neutral-300">
                {SAMPLE_WIPE_DEBRIEF.avoidableDeaths.map((d, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span style={{ color: d.classColor }} className="font-semibold">{d.playerName}</span>
                    <span className="text-neutral-400">{d.secondsInHazard}s i {d.ability}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Key Win Condition */}
            <div className="bg-[#2B2D31]/70 border border-emerald-500/30 rounded-lg p-3.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1.5">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>3. Løsning Næste Pull</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {SAMPLE_WIPE_DEBRIEF.keyWinCondition}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-500 border-t border-[#2B2D31] pt-3">
            <span>Drevet af OmniRoute AI Pipeline (0 kr. inferens-omkostning)</span>
            <span className="text-rose-400 font-semibold cursor-pointer hover:underline">Se fuldt combat-replay på wow.guud.games ➔</span>
          </div>
        </div>
      )}
    </div>
  );
}
