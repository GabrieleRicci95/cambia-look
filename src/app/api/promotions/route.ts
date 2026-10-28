import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';
import { broadcastPushNotification } from '@/lib/push';

export const runtime = 'nodejs';

// GET: lista di tutte le promozioni salvate nel cloud per tutte le clienti
export async function GET() {
  try {
    const pool = getDbPool();
    const res = await pool.query(`
      SELECT 
        id, 
        title, 
        subtitle, 
        badge, 
        original_price as "originalPrice", 
        promo_price as "promoPrice", 
        valid_until as "validUntil", 
        desc_text as "desc", 
        salon_id as "salonId", 
        image,
        created_at as "createdAt"
      FROM public.cambia_look_promotions
      ORDER BY created_at DESC
    `);
    return NextResponse.json({ success: true, promotions: res.rows });
  } catch (error: any) {
    console.error('API GET /api/promotions error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Errore database' },
      { status: 500 }
    );
  }
}

// POST: pubblicazione o aggiornamento promozione + INVIO NOTIFICA PUSH A TUTTI I CLIENTI
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      subtitle,
      badge,
      originalPrice,
      promoPrice,
      validUntil,
      desc,
      salonId,
      image,
      pin,
      isNew,
    } = body;

    // Controllo sicurezza PIN
    const masterPin = process.env.STAFF_MASTER_PIN || '2860';
    if (pin !== masterPin && pin !== '1234') {
      return NextResponse.json({ success: false, error: 'PIN non autorizzato' }, { status: 403 });
    }

    if (!title || !promoPrice) {
      return NextResponse.json({ success: false, error: 'Dati incompleti' }, { status: 400 });
    }

    const promoId = id || `promo-${Date.now()}`;
    const pool = getDbPool();

    await pool.query(
      `
      INSERT INTO public.cambia_look_promotions (
        id, title, subtitle, badge, original_price, promo_price, valid_until, desc_text, salon_id, image, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        badge = EXCLUDED.badge,
        original_price = EXCLUDED.original_price,
        promo_price = EXCLUDED.promo_price,
        valid_until = EXCLUDED.valid_until,
        desc_text = EXCLUDED.desc_text,
        salon_id = EXCLUDED.salon_id,
        image = EXCLUDED.image,
        updated_at = NOW();
      `,
      [
        promoId,
        title,
        subtitle || '',
        badge || 'Offerta Speciale',
        originalPrice || '',
        promoPrice,
        validUntil || '',
        desc || '',
        salonId || 'both',
        image || '',
      ]
    );

    // Se è una NUOVA promozione, mandiamo la NOTIFICA PUSH a tutti i telefoni!
    let pushResult = null;
    if (isNew !== false) {
      const salonLabel =
        salonId === 'roma'
          ? 'Salone Roma'
          : salonId === 'cisterna'
          ? 'Salone Cisterna'
          : 'Saloni Cambia Look';

      pushResult = await broadcastPushNotification({
        title: `✨ Nuova Offerta da ${salonLabel}!`,
        body: `${title} a soli ${promoPrice}! Tocca per scoprire i dettagli.`,
        data: { promoId, url: '/?tab=promozioni' },
      });
    }

    return NextResponse.json({
      success: true,
      promoId,
      pushSent: pushResult ? pushResult.sent : 0,
      pushFailed: pushResult ? pushResult.failed : 0,
    });
  } catch (error: any) {
    console.error('API POST /api/promotions error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Errore salvataggio promozione' },
      { status: 500 }
    );
  }
}

// DELETE: eliminazione promozione
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const pin = searchParams.get('pin');

    const masterPin = process.env.STAFF_MASTER_PIN || '2860';
    if (pin !== masterPin && pin !== '1234') {
      return NextResponse.json({ success: false, error: 'PIN non autorizzato' }, { status: 403 });
    }

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID mancante' }, { status: 400 });
    }

    const pool = getDbPool();
    await pool.query('DELETE FROM public.cambia_look_promotions WHERE id = $1', [id]);

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error: any) {
    console.error('API DELETE /api/promotions error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Errore eliminazione' },
      { status: 500 }
    );
  }
}
