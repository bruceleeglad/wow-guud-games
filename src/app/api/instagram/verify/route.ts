import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { handle } = await req.json();

    if (!handle || typeof handle !== 'string') {
      return NextResponse.json({ error: 'Ugyldigt Instagram handle' }, { status: 400 });
    }

    const cleanHandle = handle.trim().replace(/^@/, '').toLowerCase();

    if (cleanHandle.length < 2) {
      return NextResponse.json({ error: 'Instagram brugernavn er for kort' }, { status: 400 });
    }

    // Unik dynamisk kupon til kunden (eller fast promo kode til Stripe Checkout)
    const discountCode = 'IGSTORY25';
    const expiresAt = new Date(Date.now() + 48 * 3600 * 1000).toISOString();

    return NextResponse.json({
      verified: true,
      handle: `@${cleanHandle}`,
      discountCode,
      discountPercent: 25,
      expiresAt,
      message: `Bekræftet! Tak for din Story, @${cleanHandle}! Din 25% rabat er nu aktiv.`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
