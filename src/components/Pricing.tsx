'use client';

import React, { useState, useEffect } from 'react';
import InstagramIcon from './InstagramIcon';
import { Check, Sparkles, Zap, Shield, Crown, Tag } from 'lucide-react';

interface Props {
  onOpenDiscountModal?: () => void;
}

export default function Pricing({ onOpenDiscountModal }: Props) {
  const [activeCode, setActiveCode] = useState<string | null>(null);

  useEffect(() => {
    const code = localStorage.getItem('wow_ig_discount_code');
    if (code) {
      setActiveCode(code);
    }
  }, []);

  const plans = [
    {
      id: 'flipradar',
      name: 'FlipRadar Pro',
      badge: 'Gold Masters',
      originalPrice: '39 kr',
      discountedPrice: '29 kr',
      period: '/ mdr',
      usd: '$4.99/mo',
      desc: 'For guldmagere og auction house snipers på WoW: Forever og Retail.',
      features: [
        'Live Cross-Realm Arbitrage Scanner (EU & US)',
        'Warband-bank snipe alerts i realtid',
        'Ubegrænset Keep or Toss™ opslag',
        'Historisk pris- og efterspørgselsgraf',
        'Eksport til TSM / Auctionator importstrenge',
      ],
      cta: 'Start 7 dages prøveperiode',
      popular: false,
      color: 'indigo',
    },
    {
      id: 'bundle',
      name: 'Champion All-Access',
      badge: 'Mest Populære',
      originalPrice: '69 kr',
      discountedPrice: '51 kr',
      period: '/ mdr',
      usd: '$9.99/mo',
      desc: 'Komplet pakke: Både guld-arbitrage og AI Raid Leader i ét abonnement.',
      features: [
        'Alt i FlipRadar Pro (Ubegrænset guldscanner)',
        'Alt i RaidBrain Guild (Op til 3 Discord servere)',
        'AI Wipe Debrief på under 15 sekunder',
        'Prioriteret Cloud Compute kø ved raid-reset (onsdag)',
        'Eksklusiv Discord VIP rolle & tidlig adgang til nye værktøjer',
      ],
      cta: 'Få Champion Adgang Nu',
      popular: true,
      color: 'amber',
    },
    {
      id: 'raidbrain',
      name: 'RaidBrain Guild',
      badge: 'Raid Leaders',
      originalPrice: '55 kr',
      discountedPrice: '41 kr',
      period: '/ mdr',
      usd: '$7.99/mo',
      desc: 'For guild leaders og raid officers, der vil stoppe meningsløse wipes.',
      features: [
        'Officiel Discord Bot til jeres guild-server',
        'Automatisk Warcraft Logs analyse efter wipes',
        'Top 3 wipe-årsager serveret på under 15 sekunder',
        'Consumable & Enchants audit for hele raid rosteren',
        'Håndterer op til 40-mands raids (Classic & Forever)',
      ],
      cta: 'Tilføj til Discord Server',
      popular: false,
      color: 'rose',
    },
  ];

  return (
    <section id="pricing" className="py-12 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fair & Gennemsigtig Prissætning</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Tjen din månedspris hjem på én enkelt aften
        </h2>
        <p className="text-neutral-400 text-base mt-2">
          Et enkelt vellykket snipe eller et sparet repair-bill wipe dækker omkostningen med det samme.
        </p>
      </div>

      {/* Instagram Viral Discount Banner */}
      <div className="max-w-3xl mx-auto mb-10">
        {activeCode ? (
          <div className="bg-emerald-950/40 border border-emerald-500/50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg shadow-emerald-500/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">
                  Instagram Story Rabat Aktiv
                </span>
                <p className="text-sm font-semibold text-white">
                  25% rabat er fratrukket alle priser nedenfor med koden <code className="text-amber-400 font-mono font-bold">{activeCode}</code>
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-neutral-950 font-bold text-xs shrink-0">
              -25% Anvendt
            </span>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-rose-950/30 via-purple-950/20 to-amber-950/30 border border-rose-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-rose-400">
                  Viral Rabat Kampagne
                </span>
                <p className="text-sm font-semibold text-white">
                  Del en Story og tag <strong className="text-white">@guudgames</strong> – Få 25% rabat med det samme!
                </p>
              </div>
            </div>
            <button
              onClick={onOpenDiscountModal}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-400 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-rose-500/20 shrink-0"
            >
              Lås 25% Rabat Op
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => {
          const isAmber = plan.popular;
          const displayPrice = activeCode ? plan.discountedPrice : plan.originalPrice;

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                isAmber
                  ? 'bg-gradient-to-b from-amber-950/40 via-neutral-900 to-neutral-900 border-2 border-amber-500/60 shadow-2xl shadow-amber-500/10 scale-100 lg:-translate-y-2'
                  : 'bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {isAmber && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  {!isAmber && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-400">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="text-neutral-400 text-sm mb-6 min-h-[40px]">{plan.desc}</p>

                <div className="flex items-baseline gap-2 mb-6">
                  {activeCode ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-amber-400">{plan.discountedPrice}</span>
                      <span className="text-lg line-through text-neutral-500 font-semibold">{plan.originalPrice}</span>
                    </div>
                  ) : (
                    <span className="text-4xl font-black text-white">{plan.originalPrice}</span>
                  )}
                  <span className="text-neutral-400 text-sm font-medium">{plan.period}</span>
                  <span className="text-neutral-500 text-xs">({plan.usd})</span>
                </div>

                <div className="border-t border-neutral-800 pt-6 mb-8 space-y-3">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isAmber ? 'text-amber-400' : 'text-emerald-400'
                        }`}
                      />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() =>
                    alert(
                      `Stripe Checkout forbinder for ${plan.name} (${displayPrice}${plan.period}). ${
                        activeCode ? 'Kupon ' + activeCode + ' anvendes automatisk.' : ''
                      }`
                    )
                  }
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                    isAmber
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-neutral-950 shadow-amber-500/25'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                  }`}
                >
                  {isAmber && <Crown className="w-4 h-4" />}
                  <span>{plan.cta}</span>
                </button>
                <p className="text-center text-[11px] text-neutral-500 mt-2.5">
                  Sikker betaling via Stripe • Dansk moms inkluderet
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
