import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Lock, Smartphone, MessageCircle, FileText } from "lucide-react";

export const metadata = {
  title: "Informativa sulla Privacy • Cambia Look",
  description: "Informativa sul trattamento dei dati personali (GDPR) dell'applicazione Cambia Look Salone Donna.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#D11936] text-white flex flex-col relative font-sans shadow-2xl">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#A60F25]/95 backdrop-blur-xl border-b border-black/20 px-5 py-4 flex items-center justify-between">
        <Link 
          href="/" 
          className="w-9 h-9 rounded-full bg-black/25 flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/15"
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="text-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#E8D3A2]">Conformità GDPR</span>
          <h1 className="text-base font-bold text-white leading-tight">Privacy Policy</h1>
        </div>
        <div className="w-9" />
      </header>

      {/* CONTENT */}
      <main className="flex-1 px-5 py-6 space-y-6 text-xs text-white/90 leading-relaxed">
        
        {/* INTRO BADGE */}
        <div className="p-4 rounded-2xl bg-black/40 border border-[#E8D3A2]/40 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E8D3A2] to-[#B38F46] text-[#D11936] mx-auto flex items-center justify-center font-bold shadow">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-sm font-bold text-white">Informativa sul Trattamento dei Dati Personali</h2>
          <p className="text-[11px] text-white/75">
            Ai sensi del Regolamento Europeo (UE) 2016/679 (GDPR) e del D.Lgs. 196/2003 e s.m.i.
          </p>
          <span className="inline-block text-[10px] bg-white/10 px-2.5 py-0.5 rounded-full text-[#E8D3A2]">
            Ultimo aggiornamento: Ottobre 2026
          </span>
        </div>

        {/* 1. TITOLARE DEL TRATTAMENTO */}
        <section className="space-y-2 p-4 rounded-2xl bg-black/30 border border-white/15">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <FileText size={16} className="text-[#E8D3A2]" />
            <h3>1. Titolare del Trattamento</h3>
          </div>
          <p>
            Il Titolare del trattamento dei dati è <strong>Cambia Look Salone Donna</strong>, con sedi operative in:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] text-white/80">
            <li><strong>Cisterna di Latina (LT):</strong> Corso della Repubblica, 184 • Tel: 06 969 9412</li>
            <li><strong>Roma (RM):</strong> Via delle Cave, 72 (Zona Colli Albani) • Tel: 06 780 4521</li>
          </ul>
          <p className="text-[11px] text-white/70">
            Per qualsiasi chiarimento in materia di privacy, è possibile rivolgersi direttamente ai recapiti telefonici indicati sopra o presso i saloni fisici.
          </p>
        </section>

        {/* 2. DATI TRATTATI E COOKIE POLICY */}
        <section className="space-y-2 p-4 rounded-2xl bg-black/30 border border-white/15">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Lock size={16} className="text-[#E8D3A2]" />
            <h3>2. Dati Trattati e Cookie Policy</h3>
          </div>
          <p>
            <strong>Nessun Cookie di Profilazione o Tracciamento Pubblicitario:</strong> L'applicazione non utilizza cookie di terze parti né strumenti di tracciamento commerciale o profilazione (es. Meta Pixel, Google Analytics cross-site o cookie pubblicitari).
          </p>
          <p>
            <strong>Archiviazione Tecnica Locale (Local Storage):</strong> L'applicazione memorizza unicamente sul dispositivo dell'utente i dati strettamente necessari all'erogazione del servizio (promemoria appuntamenti, prodotti inseriti nella Busta Salone, preferenze di salone). Tali dati rimangono esclusivamente all'interno della memoria del dispositivo dell'utente e non vengono trasmessi a server terzi non autorizzati.
          </p>
        </section>

        {/* 3. ORDINI WHATSAPP E PRENOTAZIONI */}
        <section className="space-y-2 p-4 rounded-2xl bg-black/30 border border-white/15">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <MessageCircle size={16} className="text-[#E8D3A2]" />
            <h3>3. Ordini su WhatsApp e Contatti Diretti</h3>
          </div>
          <p>
            Quando l'utente compone una richiesta di ordine o di appuntamento e tocca <em>"Invia Ordine su WhatsApp"</em> o <em>"Chiama"</em>, i dati inseriti (nome della cliente, prodotti richiesti, note facoltative) vengono trasferiti direttamente all'applicazione WhatsApp dell'utente e inviati al numero ufficiale del Salone.
          </p>
          <p>
            Il trattamento dei dati all'interno dell'applicazione WhatsApp è regolato dai termini e dalla privacy policy di Meta Platforms Ireland Limited. Il Salone utilizza tali dati esclusivamente per preparare la busta per il ritiro o confermare l'appuntamento richiesto.
          </p>
        </section>

        {/* 4. CALENDARIO E PROMEMORIA TELEFONO */}
        <section className="space-y-2 p-4 rounded-2xl bg-black/30 border border-white/15">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Smartphone size={16} className="text-[#E8D3A2]" />
            <h3>4. Integrazione Calendario del Dispositivo</h3>
          </div>
          <p>
            L'esportazione dell'appuntamento sul calendario (Apple Calendar / Google Calendar) genera un file evento locale (`.ics`). L'applicazione non accede, non legge e non modifica in alcun modo i calendari personali o i contatti presenti sullo smartphone dell'utente.
          </p>
        </section>

        {/* 5. DIRITTI DELL'INTERESSATO */}
        <section className="space-y-2 p-4 rounded-2xl bg-black/30 border border-white/15">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <ShieldCheck size={16} className="text-[#E8D3A2]" />
            <h3>5. Diritti dell'Interessato (Artt. 15-22 GDPR)</h3>
          </div>
          <p>
            Gli utenti hanno il diritto in qualunque momento di ottenere la conferma dell'esistenza o meno dei propri dati personali, di verificarne l'esattezza o chiederne l'integrazione, l'aggiornamento o la cancellazione.
          </p>
          <p>
            Poiché i dati dell'applicazione risiedono in locale sul dispositivo dell'utente, è possibile cancellarli istantaneamente svuotando la cache dell'app o disinstallandola dal dispositivo.
          </p>
        </section>

        {/* TASTO TORNA ALL'APP */}
        <div className="pt-2 pb-6">
          <Link
            href="/"
            className="w-full py-3.5 rounded-2xl bg-white hover:bg-[#E8D3A2] text-[#D11936] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all text-center"
          >
            <span>Torna all'App Cambia Look</span>
          </Link>
        </div>

      </main>
    </div>
  );
}
