import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WoW Guud Games | FlipRadar & RaidBrain AI – WoW: Forever & Retail',
  description:
    'Live Cross-Realm Arbitrage, Keep or Toss™ Item Scanner og AI-drevet Post-Wipe Debrief Discord Bot for World of Warcraft.',
  keywords: [
    'WoW Forever',
    'WoW Classic+',
    'FlipRadar',
    'RaidBrain',
    'World of Warcraft gold sniping',
    'Keep or Toss WoW',
    'Warcraft Logs AI bot',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da" className="dark scroll-smooth">
      <body className="bg-neutral-950 text-neutral-100 min-h-screen flex flex-col antialiased selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
