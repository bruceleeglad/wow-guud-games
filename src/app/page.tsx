'use client';

import React, { useState } from 'react';
import KeepOrToss from '@/components/KeepOrToss';
import ArbitrageFeed from '@/components/ArbitrageFeed';
import RaidBrainDemo from '@/components/RaidBrainDemo';
import Pricing from '@/components/Pricing';
import {
  Sparkles,
  Zap,
  Bot,
  Search,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Flame,
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'keep-toss' | 'arbitrage' | 'raidbrain'>('keep-toss');

  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] text-neutral-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border-b border-amber-500/30 text-amber-300 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 font-bold">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>WoW: Forever Er Live!</span>
        </span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">Keep or Toss™ databasen er opdateret med samtlige 1.000+ nye Classic+ items og quests.</span>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/80 border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-neutral-950 font-black text-lg">
              W
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                wow.<span className="text-amber-400">guud.games</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-bold rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700">
                Forever & Retail
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
            <button
              onClick={() => setActiveTab('keep-toss')}
              className={`hover:text-amber-400 transition-colors ${
                activeTab === 'keep-toss' ? 'text-amber-400 font-bold' : ''
              }`}
            >
              Keep or Toss™
            </button>
            <button
              onClick={() => setActiveTab('arbitrage')}
              className={`hover:text-indigo-400 transition-colors ${
                activeTab === 'arbitrage' ? 'text-indigo-400 font-bold' : ''
              }`}
            >
              FlipRadar™
            </button>
            <button
              onClick={() => setActiveTab('raidbrain')}
              className={`hover:text-rose-400 transition-colors ${
                activeTab === 'raidbrain' ? 'text-rose-400 font-bold' : ''
              }`}
            >
              RaidBrain AI™
            </button>
            <a href="#pricing" className="hover:text-white transition-colors">
              Priser
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#pricing"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20"
            >
              Prøv Gratis
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-20 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-br from-amber-500/10 via-indigo-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Fremtidens WoW værktøjer samlet ét sted</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Tjen mere guld. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
              Undgå dumme wipes.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Avancerede værktøjer bygget specifikt til <strong>WoW: Forever (Classic+)</strong> og <strong>The War Within</strong>.
            Scan taskerne med Keep or Toss, snip på tværs af realms med FlipRadar, og få AI-forklaring på dine wipes.
          </p>

          {/* Value props bullets */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Blizzard ToS Sikker</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>0% Spil-lag (Kører i skyen)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-indigo-400" />
              <span>Claude & DeepSeek AI-drevet</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Tool Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 w-full relative z-10">
        {/* Navigation Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-neutral-900 border border-neutral-800 max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('keep-toss')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                activeTab === 'keep-toss'
                  ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/25'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>1. Keep or Toss™ Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab('arbitrage')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                activeTab === 'arbitrage'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>2. FlipRadar™ Arbitrage</span>
            </button>

            <button
              onClick={() => setActiveTab('raidbrain')}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                activeTab === 'raidbrain'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>3. RaidBrain AI™ Debrief</span>
            </button>
          </div>
        </div>

        {/* Dynamic Tool Display */}
        <div className="transition-all duration-300">
          {activeTab === 'keep-toss' && <KeepOrToss />}
          {activeTab === 'arbitrage' && <ArbitrageFeed />}
          {activeTab === 'raidbrain' && <RaidBrainDemo />}
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="bg-neutral-950/60 border-t border-b border-neutral-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Ingen Addon Bloat</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Modsat TradeSkillMaster (TSM) der sluger 500 MB RAM og gør loading-skærme uendelige, kører vores analyse i en lynhurtig browser-fane.
              </p>
            </div>

            <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Warband Cross-Realm Guld</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Flyt guld og varer mellem servere lovligt via Blizzards nye Warband Bank. Find store prisforskelle mellem f.eks. Silvermoon og Kazzak.
              </p>
            </div>

            <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Mindre Drama, Flere Kills</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                RaidBrain forklarer objektivt og diplomatisk hvad der gik galt, så guilden kan justere taktikken uden skænderier i voice-chatten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <Pricing />
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-8">
          Ofte Stillede Spørgsmål
        </h2>
        <div className="space-y-4">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5">
            <h3 className="font-bold text-white mb-1">Er det lovligt ifølge Blizzard ToS?</h3>
            <p className="text-sm text-neutral-400">
              Ja, 100%. Vi anvender kun Blizzards officielle Battle.net Game Data API og Warcraft Logs offentlige endpoints. Der foretages ingen modifikation af WoW-klientens hukommelse eller filer.
            </p>
          </div>
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5">
            <h3 className="font-bold text-white mb-1">Fungerer det både på WoW: Forever og Retail?</h3>
            <p className="text-sm text-neutral-400">
              Ja! Keep or Toss indeholder specifikke Forever / Classic+ tabeller (level 60 cap, nye zones og opskrifter), mens FlipRadar og RaidBrain fungerer på tværs af både Forever, Classic og The War Within.
            </p>
          </div>
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5">
            <h3 className="font-bold text-white mb-1">Hvordan virker Discord botten?</h3>
            <p className="text-sm text-neutral-400">
              Du inviterer blot RaidBrain botten til jeres Discord server og indtaster jeres Warcraft Logs guild-URL. Når loggen uploades under raidet, poster botten automatisk et lynhurtigt 3-punkts debrief.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-12 text-sm text-neutral-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-black font-black flex items-center justify-center text-xs">
              W
            </div>
            <span className="font-bold text-neutral-300">wow.guud.games</span>
            <span>• En del af Guud Games & Bruce Ventures</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a href="https://guud.games" className="hover:text-amber-400 transition-colors">
              guud.games
            </a>
            <a href="https://fishing.guud.pro" className="hover:text-amber-400 transition-colors">
              fishing.guud.pro
            </a>
            <a href="mailto:kontakt@guud.games" className="hover:text-amber-400 transition-colors">
              Support & Kontakt
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
