import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { planId, discountCode } = await req.json();

    const PLANS: Record<string, { name: string; priceDkk: number; desc: string }> = {
      flipradar: {
        name: 'FlipRadar Pro (WoW: Forever & Retail)',
        priceDkk: 39,
        desc: 'Cross-Realm AH Arbitrage, Warband Snipe Alerts & Keep or Toss opslag.',
      },
      bundle: {
        name: 'Champion All-Access Bundle',
        priceDkk: 69,
        desc: 'Komplet pakke: Både FlipRadar Pro og RaidBrain Guild Discord bot.',
      },
      raidbrain: {
        name: 'RaidBrain Guild (AI Wipe Debrief Bot)',
        priceDkk: 55,
        desc: 'AI Discord bot med automatisk Warcraft Logs combat debrief efter wipes.',
      },
    };

    const targetPlan = PLANS[planId] || PLANS['bundle'];
    const isDiscounted =
      discountCode &&
      ['IGSTORY25', 'TIKTOK25', 'SOCIAL25'].includes(discountCode.toUpperCase());

    const finalPriceDkk = isDiscounted
      ? Math.round(targetPlan.priceDkk * 0.75)
      : targetPlan.priceDkk;

    const discountAmount = isDiscounted ? (targetPlan.priceDkk - finalPriceDkk) : 0;
    const orderId = `WOW-${planId.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

    // Benyt den verificerede produktion Stripe Gateway
    const gatewayRes = await fetch('https://tee-pusher.shop/api/stripe-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        customerName: 'WoW Guud Games Abonnent',
        email: 'abonnent@wow.guud.games',
        items: [
          {
            id: planId,
            name: `${targetPlan.name} ${isDiscounted ? '(25% Social Rabat)' : ''}`,
            price: targetPlan.priceDkk,
            qty: 1,
            image: 'https://wow.guud.games/favicon.ico',
          },
        ],
        discountAmount,
      }),
    });

    const data = await gatewayRes.json();

    if (!gatewayRes.ok || !data.url) {
      throw new Error(data.error || 'Kunne ikke oprette Stripe session');
    }

    return NextResponse.json({ url: data.url });
  } catch (err: any) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
