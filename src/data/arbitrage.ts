export interface ArbitrageDeal {
  id: string;
  itemName: string;
  itemQuality: 'epic' | 'rare' | 'uncommon' | 'common';
  icon: string;
  sourceRealm: string;
  sourcePriceGold: number;
  targetRealm: string;
  targetPriceGold: number;
  estProfitGold: number;
  roiPercent: number;
  volumeScore: 'Høj' | 'Medium' | 'Lav';
  detectedMinutesAgo: number;
}

export const SAMPLE_ARBITRAGE_DEALS: ArbitrageDeal[] = [
  {
    id: 'arb-1',
    itemName: 'Captured Firefly (Battle Pet)',
    itemQuality: 'rare',
    icon: '🪲',
    sourceRealm: 'Moonglade (EU)',
    sourcePriceGold: 6500,
    targetRealm: 'Silvermoon (EU)',
    targetPriceGold: 48000,
    estProfitGold: 41500,
    roiPercent: 638,
    volumeScore: 'Høj',
    detectedMinutesAgo: 4
  },
  {
    id: 'arb-2',
    itemName: 'Recipe: Savory Deviate Delight',
    itemQuality: 'uncommon',
    icon: '📜',
    sourceRealm: 'Darkspear (EU)',
    sourcePriceGold: 1200,
    targetRealm: 'Tarren Mill (EU)',
    targetPriceGold: 11500,
    estProfitGold: 10300,
    roiPercent: 858,
    volumeScore: 'Høj',
    detectedMinutesAgo: 11
  },
  {
    id: 'arb-3',
    itemName: 'Edgemaster\'s Handguards (BoE Mail)',
    itemQuality: 'epic',
    icon: '🥊',
    sourceRealm: 'Defias Brotherhood (EU)',
    sourcePriceGold: 185000,
    targetRealm: 'Gehennas (EU)',
    targetPriceGold: 340000,
    estProfitGold: 155000,
    roiPercent: 83,
    volumeScore: 'Medium',
    detectedMinutesAgo: 22
  },
  {
    id: 'arb-4',
    itemName: 'Ancona Chicken (Vanity Pet)',
    itemQuality: 'common',
    icon: '🐔',
    sourceRealm: 'The Maelstrom (EU)',
    sourcePriceGold: 350,
    targetRealm: 'Ravencrest (EU)',
    targetPriceGold: 3900,
    estProfitGold: 3550,
    roiPercent: 1014,
    volumeScore: 'Høj',
    detectedMinutesAgo: 38
  }
];
