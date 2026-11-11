export interface WowItem {
  id: string;
  name: string;
  quality: 'poor' | 'common' | 'uncommon' | 'rare' | 'epic';
  icon: string;
  verdict: 'KEEP' | 'TOSS' | 'AUCTION';
  vendorPrice: string;
  ahMedianPrice: string;
  category: 'Crafting' | 'Quest Item' | 'Consumable' | 'Reputation' | 'Gear';
  reason: string;
  foreverNote?: string;
}

export const FOREVER_ITEMS: WowItem[] = [
  {
    id: '1',
    name: 'Larval Acid',
    quality: 'uncommon',
    icon: '🐛',
    verdict: 'KEEP',
    vendorPrice: '2s 50c',
    ahMedianPrice: '12g 50s',
    category: 'Crafting',
    reason: 'Kritisk reagens til Hide of the Wild og Nature Resistance gear.',
    foreverNote: 'Efterspørgslen eksploderer i det nye Ruins of Lordaeron raid!'
  },
  {
    id: '2',
    name: 'Ruined Ogre Chitin',
    quality: 'poor',
    icon: '🪨',
    verdict: 'TOSS',
    vendorPrice: '85s 10c',
    ahMedianPrice: '0g',
    category: 'Quest Item',
    reason: 'Rent gråt junk item. Sælg direkte til vendor for fri guld.',
    foreverNote: 'Har ingen quest i WoW: Forever.'
  },
  {
    id: '3',
    name: 'Felcloth',
    quality: 'uncommon',
    icon: '🧵',
    verdict: 'AUCTION',
    vendorPrice: '15s 00c',
    ahMedianPrice: '8g 20s',
    category: 'Crafting',
    reason: 'Renses til Mooncloth af Tailors. Konstant høj efterspørgsel.',
    foreverNote: 'Nødvendig til nye Shadow-resist opskrifter i Hyjal.'
  },
  {
    id: '4',
    name: 'Black Lotus',
    quality: 'rare',
    icon: '🌸',
    verdict: 'KEEP',
    vendorPrice: '25s 00c',
    ahMedianPrice: '165g 00s',
    category: 'Crafting',
    reason: 'Det mest værdifulde flus-materiale til Flask of Supreme Power og Titans.',
    foreverNote: 'Gem altid til progression raid-aftener tirsdag/torsdag for maksimal profit.'
  },
  {
    id: '5',
    name: 'Oozing Bag',
    quality: 'uncommon',
    icon: '🧪',
    verdict: 'KEEP',
    vendorPrice: '50s 00c',
    ahMedianPrice: '45g 00s',
    category: 'Consumable',
    reason: 'Kan indeholde Disgusting Oozeling companion pet!',
    foreverNote: 'Åbn den altid selv eller sælg uåbnet for fast høj pris.'
  },
  {
    id: '6',
    name: 'Broken Boar Tusk',
    quality: 'poor',
    icon: '🐗',
    verdict: 'TOSS',
    vendorPrice: '12c',
    ahMedianPrice: '0g',
    category: 'Quest Item',
    reason: 'Start-zone junk. Spild ikke taske-plads på den.',
    foreverNote: 'Vendor med det samme.'
  },
  {
    id: '7',
    name: 'Essence of Fire',
    quality: 'uncommon',
    icon: '🔥',
    verdict: 'AUCTION',
    vendorPrice: '50s 00c',
    ahMedianPrice: '14g 50s',
    category: 'Crafting',
    reason: 'Brugt til Spellpower weapon enchants og Fire Resistance gear.',
    foreverNote: 'Ekstrem høj efterspørgsel på Forever servere lige nu.'
  },
  {
    id: '8',
    name: 'Small Lustrous Pearl',
    quality: 'common',
    icon: '⚪',
    verdict: 'KEEP',
    vendorPrice: '10s 00c',
    ahMedianPrice: '3g 80s',
    category: 'Crafting',
    reason: 'Nødvendig til low-level Tailoring, Enchanting og Blacksmithing.',
    foreverNote: 'Mange tror det er vendor junk, men det er guld værd for twink-crafters.'
  },
  {
    id: '9',
    name: 'Staff of Jordan',
    quality: 'epic',
    icon: '🪄',
    verdict: 'AUCTION',
    vendorPrice: '3g 50s',
    ahMedianPrice: '450g 00s',
    category: 'Gear',
    reason: 'Det ultimative Level 35 BoE caster våben. Twink og leveling favorit.',
    foreverNote: 'Sælg på weekend-aftener for maksimal guldudbytte.'
  },
  {
    id: '10',
    name: 'Solid Stone',
    quality: 'common',
    icon: '⛏️',
    verdict: 'KEEP',
    vendorPrice: '5s 00c',
    ahMedianPrice: '4g 20s / stack',
    category: 'Crafting',
    reason: 'Bruges til Solid Sharpening Stones og Goblin Sapper Charges.',
    foreverNote: 'Enhver Engineer i raidet har brug for disse hver uge.'
  }
];
