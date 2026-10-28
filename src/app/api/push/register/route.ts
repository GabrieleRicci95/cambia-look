import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { endpoint, keys, deviceInfo } = body;

    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      return NextResponse.json(
        { success: false, error: 'Dati di sottoscrizione push mancanti' },
        { status: 400 }
      );
    }

    const pool = getDbPool();
    const id = `sub-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    await pool.query(
      `
      INSERT INTO public.cambia_look_push_subscribers (
        id, endpoint, p256dh, auth, device_info, created_at
      )
      VALUES ($1, $2, $3, $4, $5, NOW())
      ON CONFLICT (endpoint) DO UPDATE SET
        p256dh = EXCLUDED.p256dh,
        auth = EXCLUDED.auth,
        device_info = EXCLUDED.device_info;
      `,
      [id, endpoint, keys.p256dh, keys.auth, deviceInfo || '']
    );

    return NextResponse.json({ success: true, message: 'Dispositivo registrato con successo' });
  } catch (error: any) {
    console.error('API POST /api/push/register error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Errore registrazione push' },
      { status: 500 }
    );
  }
}
