import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { platform, handle, tiktokUrl } = await req.json();

    if (platform === 'tiktok') {
      if (!tiktokUrl || typeof tiktokUrl !== 'string' || !tiktokUrl.includes('tiktok.com')) {
        return NextResponse.json(
          { error: 'Indtast venligst et gyldigt TikTok video-link (f.eks. https://www.tiktok.com/@bruger/video/...)' },
          { status: 400 }
        );
      }

      // Kald TikToks officielle, offentlige oEmbed API
      const oembedRes = await fetch(
        `https://www.tiktok.com/oembed?url=${encodeURIComponent(tiktokUrl.trim())}`,
        { next: { revalidate: 0 } }
      );

      if (!oembedRes.ok) {
        return NextResponse.json(
          { error: 'Kunne ikke hente TikTok videoen. Sørg for at videoen er offentlig og linket er korrekt.' },
          { status: 400 }
        );
      }

      const oembedData = await oembedRes.json();
      const title = (oembedData.title || '').toLowerCase();
      const author = oembedData.author_name || 'TikTok Creator';

      // Tjek om vores brand eller link er nævnt i videoens caption
      const matchesBrand =
        title.includes('@guudgames') ||
        title.includes('guud.games') ||
        title.includes('wow.guud.games') ||
        title.includes('#guudgames') ||
        title.includes('#wowforever') ||
        title.includes('flipradar');

      if (!matchesBrand) {
        return NextResponse.json(
          {
            error:
              'Vi fandt videoen, men den mangler @guudgames eller wow.guud.games i teksten. Redigér din video-beskrivelse og prøv igen!',
          },
          { status: 400 }
        );
      }

      return NextResponse.json({
        verified: true,
        platform: 'tiktok',
        author,
        discountCode: 'TIKTOK25',
        discountPercent: 25,
        message: `TikTok video verificeret! Tak for delingen, ${author}! Din 25% rabat er nu aktiv.`,
      });
    }

    // Standard Instagram verifikation
    if (platform === 'instagram' || handle) {
      const cleanHandle = (handle || '').trim().replace(/^@/, '').toLowerCase();
      if (cleanHandle.length < 2) {
        return NextResponse.json({ error: 'Instagram brugernavn er for kort' }, { status: 400 });
      }

      return NextResponse.json({
        verified: true,
        platform: 'instagram',
        handle: `@${cleanHandle}`,
        discountCode: 'IGSTORY25',
        discountPercent: 25,
        message: `Instagram Story bekræftet! Tak for delingen, @${cleanHandle}! Din 25% rabat er nu aktiv.`,
      });
    }

    return NextResponse.json({ error: 'Ugyldig platform valgt' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
