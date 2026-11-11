export interface WipeDebrief {
  id: string;
  encounterName: string;
  difficulty: string;
  wipeTimeSeconds: number;
  bossHealthPercent: number;
  primaryCause: string;
  avoidableDeaths: {
    playerName: string;
    classColor: string;
    ability: string;
    secondsInHazard: number;
  }[];
  missedInterrupts: {
    target: string;
    ability: string;
    missedCount: number;
    wipedBecauseOfThis: boolean;
  }[];
  keyWinCondition: string;
  aiDebriefSummary: string;
}

export const SAMPLE_WIPE_DEBRIEF: WipeDebrief = {
  id: 'wipe-102',
  encounterName: 'Anub\'Rekhan — Ruins of Lordaeron (Forever Raid)',
  difficulty: 'Level 60 Mythic Progression',
  wipeTimeSeconds: 248,
  bossHealthPercent: 6.4,
  primaryCause: 'Crypt Guard Add B nåede at fuldføre "Locust Swarm" på 04:02. 2 interrupts manglede fra Melee.',
  avoidableDeaths: [
    {
      playerName: 'Shadowbolt-Silvermoon',
      classColor: '#8787ED', // Warlock purple
      ability: 'Impale Spikes',
      secondsInHazard: 3.4
    },
    {
      playerName: 'Healpala-TarrenMill',
      classColor: '#F58CBA', // Paladin pink
      ability: 'Locust Aura (Did not kite)',
      secondsInHazard: 4.8
    }
  ],
  missedInterrupts: [
    {
      target: 'Crypt Guard (Add B)',
      ability: 'Shadow Nova',
      missedCount: 2,
      wipedBecauseOfThis: true
    }
  ],
  keyWinCondition: 'Hold Healer Tranquility / Divine Hymn specifikt til 15% sub-fase i stedet for ved pull. Spar Warrior Pummel til Add B prioritets-fokus.',
  aiDebriefSummary: 'I var 6.4% fra et kill! DPS og healing throughput var over kravet (94.2 percentile). Wipet skete udelukkende på grund af 2 missede interrupts på sekundær Crypt Guard, hvilket gav unødvendig 3.2M raid-skade og dræbte jeres main healer.'
};
