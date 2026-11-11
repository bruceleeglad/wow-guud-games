import { NextRequest, NextResponse } from 'next/server';

// In-memory cache over bekræftede Instagram handles (gemmer op til 1.000 seneste tags)
const verifiedHandles = new Set<string>();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Meta Webhook handshake verification
  const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'guud_instagram_viral_token_2026';

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.object === 'instagram') {
      for (const entry of body.entry || []) {
        for (const messaging of entry.messaging || []) {
          // Tjek for story mention eller almindelig besked med tag
          if (messaging.message && messaging.message.attachments) {
            for (const att of messaging.message.attachments) {
              if (att.type === 'story_mention' || att.type === 'share') {
                const senderId = messaging.sender?.id;
                if (senderId) {
                  verifiedHandles.add(senderId.toLowerCase());
                }
              }
            }
          }
        }
      }
      return NextResponse.json({ status: 'EVENT_RECEIVED' }, { status: 200 });
    }

    return NextResponse.json({ status: 'ignored' }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export { verifiedHandles };
