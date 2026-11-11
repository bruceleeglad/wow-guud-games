import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const { planId, discountCode } = await req.json();

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY er ikke konfigureret på serveren' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16' as any,
    });

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

    // 25% rabat hvis gyldig social kupon er anvendt
    const finalPriceDkk = isDiscounted
      ? Math.round(targetPlan.priceDkk * 0.75)
      : targetPlan.priceDkk;

    const origin = req.headers.get('origin') || 'https://wow.guud.games';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'dkk',
            product_data: {
              name: targetPlan.name,
              description: targetPlan.desc,
            },
            unit_amount: finalPriceDkk * 100, // DKK øre
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        planId,
        discountCode: isDiscounted ? discountCode : 'none',
      },
      success_url: `${origin}/?checkout=success&plan=${planId}`,
      cancel_url: `${origin}/?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
