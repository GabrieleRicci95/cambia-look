"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  Gift, 
  Image as ImageIcon, 
  User, 
  Home, 
  Scissors, 
  ChevronRight, 
  Star, 
  Bell, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  X, 
  Share2, 
  QrCode,
  Heart,
  CalendarCheck,
  Award
} from "lucide-react";

// Mock Services
const SERVICES = [
  {
    id: "piega-glam",
    category: "piega",
    name: "Piega Luxury & Finish",
    price: 24,
    duration: "35 min",
    desc: "Shampoo specifico con massaggio cutaneo rigenerante e piega personalizzata a scelta (liscia, mossa, onde beach waves).",
    popular: true,
  },
  {
    id: "taglio-donna",
    category: "taglio",
    name: "Taglio Sartoriale & Piega",
    price: 45,
    duration: "55 min",
    desc: "Consulenza morfologica del viso, taglio personalizzato su misura e piega styling finale.",
    popular: true,
  },
  {
    id: "balayage-lumiere",
    category: "colore",
    name: "Balayage Lumière & Gloss",
    price: 85,
    duration: "120 min",
    desc: "Schiariture tridimensionali a mano libera senza effetto ricrescita, con tonalizzante illuminante.",
    popular: true,
  },
  {
    id: "colore-ritocco",
    category: "colore",
    name: "Colore Radici Vegan & No Ammoniaca",
    price: 38,
    duration: "60 min",
    desc: "Colorazione trattante con pigmenti botanici e oli essenziali per una brillantezza intensa e zero irritazioni.",
    popular: false,
  },
  {
    id: "trattamento-cheratina",
    category: "cura",
    name: "Trattamento Botox & Cheratina",
    price: 40,
    duration: "45 min",
    desc: "Ricostruzione profonda dello stelo per capelli rimpolpati, disciplinati ed elastici fin dalla prima seduta.",
    popular: false,
  },
  {
    id: "trattamento-cute",
    category: "cura",
    name: "Peeling Detox Cute & Idro-Mask",
    price: 30,
    duration: "30 min",
    desc: "Scrub purificante delicato per cute sensibile o con impurità, seguito da vapore e idratazione.",
    popular: false,
  },
];

const STYLISTS = [
  { id: "any", name: "Prima Stylist Disponibile", role: "Disponibilità più veloce", avatar: "✨" },
  { id: "valentina", name: "Valentina", role: "Master Stylist & Color Specialist", avatar: "👩🏼" },
  { id: "sara", name: "Sara", role: "Hair Designer & Balayage Artist", avatar: "👩🏻" },
  { id: "elena", name: "Elena", role: "Taglio Sartoriale & Trattamenti", avatar: "💇🏼‍♀️" },
];

const LOOKBOOK_PHOTOS = [
  {
    id: 1,
    title: "Balayage Biondo Vaniglia",
    author: "di Valentina",
    likes: 142,
    img: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=700&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Bob Cut Mosso Contemporaneo",
    author: "di Sara",
    likes: 98,
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=700&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Sfumatura Caramello Caldo",
    author: "di Valentina",
    likes: 215,
    img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=700&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Onde Morbide Red Carpet",
    author: "di Elena",
    likes: 180,
    img: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=700&auto=format&fit=crop"
  },
];

export default function CambiaLookApp() {
  const [activeTab, setActiveTab] = useState<"home" | "prenota" | "fidelity" | "lookbook" | "profilo">("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("tutti");
  
  // Booking State
  const [bookingService, setBookingService] = useState<any | null>(null);
  const [bookingStylist, setBookingStylist] = useState<string>("any");
  const [bookingDate, setBookingDate] = useState<string>("Oggi, 16:30");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Push Notification Simulation State
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const triggerPushDemo = (text: string) => {
    setNotificationText(text);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const handleStartBooking = (service: any) => {
    setBookingService(service);
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setIsBookingOpen(false);
      setBookingConfirmed(false);
      triggerPushDemo(`✨ Appuntamento confermato! Ti aspettiamo per ${bookingService?.name} (${bookingDate}).`);
    }, 1400);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#141218] text-[#FBF9F5] flex flex-col relative pb-24 shadow-2xl overflow-hidden selection:bg-[#E0B768] selection:text-black">
      
      {/* SIMULATED PUSH NOTIFICATION (iOS Style Banner) */}
      {showNotification && (
        <div className="fixed top-4 left-4 right-4 z-50 animate-in slide-in-from-top duration-300">
          <div className="max-w-sm mx-auto bg-[#231E2A]/95 backdrop-blur-xl border border-[#E0B768]/40 rounded-2xl p-3.5 shadow-2xl flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#141218] flex items-center justify-center shrink-0 border border-[#E0B768]/30">
              <Image src="/app_icon_192.png" alt="Icon" width={26} height={26} className="rounded-lg" />
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#E0B768]">Cambia Look</span>
                <span className="text-[10px] text-white/40">Adesso</span>
              </div>
              <p className="text-xs text-white/90 font-medium mt-0.5 leading-snug">{notificationText}</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-white/40 hover:text-white p-1">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="px-5 pt-12 pb-4 bg-gradient-to-b from-[#1E1A24] via-[#1E1A24]/90 to-transparent sticky top-0 z-30 backdrop-blur-md flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#2A2333] to-[#3B2F49] p-0.5 border border-[#E0B768]/30 shadow-lg flex items-center justify-center overflow-hidden">
            <Image 
              src="/logo_transparent.png" 
              alt="Logo Cambia Look" 
              width={42} 
              height={42} 
              className="object-contain filter drop-shadow-[0_2px_4px_rgba(224,183,104,0.3)]"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#E0B768]">Hair Salon</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-medium">Aperto</span>
            </div>
            <h1 className="text-lg font-black tracking-tight font-serif bg-gradient-to-r from-white via-[#F5E6CC] to-[#E0B768] bg-clip-text text-transparent">
              Cambia Look
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => triggerPushDemo("🔔 Promemoria Cambia Look: Ti aspettiamo domani per il tuo appuntamento alle 16:00!")}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-[#E0B768] hover:border-[#E0B768]/40 transition-colors relative"
            title="Simula Notifica Push"
          >
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E0B768]" />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 px-5 pt-3 space-y-6">

        {/* TAB 1: HOME */}
        {activeTab === "home" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* HERO HEROINE CARD */}
            <div className="relative rounded-3xl overflow-hidden p-6 bg-gradient-to-br from-[#2D2438] via-[#231B2D] to-[#17121E] border border-[#E0B768]/30 shadow-2xl">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#E0B768]/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0B768]/15 border border-[#E0B768]/30 text-[#E0B768] text-[10px] font-black uppercase tracking-wider">
                  <Sparkles size={12} />
                  <span>Nuovi Trend 2026</span>
                </div>
                <h2 className="text-2xl font-black font-serif leading-tight">
                  Esprimi la tua vera bellezza con stile.
                </h2>
                <p className="text-xs text-white/70 font-normal leading-relaxed">
                  Trattamenti esclusivi, taglio sartoriale e balayage illuminante pensati per valorizzare la tua unicità.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => setActiveTab("prenota")}
                    className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#E0B768] to-[#C99846] text-[#141218] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#E0B768]/20 flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all"
                  >
                    <Calendar size={16} />
                    <span>Prenota il tuo appuntamento</span>
                  </button>
                </div>
              </div>
            </div>

            {/* FIDELITY PREVIEW BANNER */}
            <div 
              onClick={() => setActiveTab("fidelity")}
              className="p-4 rounded-2xl bg-gradient-to-r from-[#2A1F36] to-[#1E1727] border border-[#E5B8A8]/30 flex items-center justify-between cursor-pointer hover:border-[#E5B8A8]/60 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#E5B8A8]/20 text-[#E5B8A8] flex items-center justify-center shrink-0 border border-[#E5B8A8]/30">
                  <Award size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#E5B8A8]">Club Fedeltà</span>
                    <span className="text-[10px] text-white/40">• 7/10 Punti</span>
                  </div>
                  <p className="text-xs font-bold text-white group-hover:text-[#E5B8A8] transition-colors">
                    Ti mancano solo 3 timbri al Trattamento Gloss Omaggio!
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="text-white/40 group-hover:text-[#E5B8A8] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            {/* POPULAR SERVICES */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black font-serif tracking-tight text-white flex items-center gap-2">
                  <Scissors size={15} className="text-[#E0B768]" />
                  <span>I Trattamenti Più Richiesti</span>
                </h3>
                <button 
                  onClick={() => setActiveTab("prenota")}
                  className="text-[11px] font-bold text-[#E0B768] hover:underline"
                >
                  Tutti ({SERVICES.length})
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {SERVICES.slice(0, 3).map((serv) => (
                  <div 
                    key={serv.id}
                    onClick={() => handleStartBooking(serv)}
                    className="p-3.5 rounded-2xl bg-[#1E1A24] border border-white/5 hover:border-[#E0B768]/40 transition-all flex items-center justify-between cursor-pointer group active:scale-[0.99]"
                  >
                    <div className="space-y-1 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-[#E0B768] transition-colors">{serv.name}</span>
                        {serv.popular && (
                          <span className="text-[9px] px-1.5 py-0.2 bg-[#E0B768]/20 text-[#E0B768] font-bold rounded">TOP</span>
                        )}
                      </div>
                      <p className="text-[11px] text-white/50 line-clamp-1">{serv.desc}</p>
                      <div className="flex items-center gap-3 text-[10px] text-white/40">
                        <span className="flex items-center gap-1"><Clock size={11} /> {serv.duration}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-black text-[#E0B768]">€ {serv.price}</div>
                      <button className="mt-1 px-2.5 py-1 rounded-lg bg-white/10 group-hover:bg-[#E0B768] group-hover:text-black text-[10px] font-black uppercase transition-all">
                        Prenota
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LOOKBOOK TEASER */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black font-serif tracking-tight text-white flex items-center gap-2">
                  <Sparkles size={15} className="text-[#E5B8A8]" />
                  <span>Look del Momento</span>
                </h3>
                <button 
                  onClick={() => setActiveTab("lookbook")}
                  className="text-[11px] font-bold text-[#E5B8A8] hover:underline"
                >
                  Vedi Gallery
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {LOOKBOOK_PHOTOS.slice(0, 2).map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setActiveTab("lookbook")}
                    className="group rounded-2xl overflow-hidden relative aspect-[4/5] bg-black/40 border border-white/5 cursor-pointer"
                  >
                    <Image 
                      src={item.img} 
                      alt={item.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
                      <p className="text-xs font-bold text-white line-clamp-1">{item.title}</p>
                      <span className="text-[10px] text-white/60">{item.author}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SALON CONTACT & HOURS QUICK CARD */}
            <div className="p-4 rounded-2xl bg-[#1A1620] border border-white/5 space-y-2.5 text-xs text-white/70">
              <div className="flex items-center gap-2 text-white font-bold">
                <MapPin size={15} className="text-[#E0B768]" />
                <span>Salone Cambia Look</span>
              </div>
              <p className="text-[11px] text-white/50 pl-6">
                Via Roma, 142 • Da Martedì a Sabato: 09:00 - 19:00 (Orario continuato)
              </p>
              <div className="pt-1 flex gap-2 pl-6">
                <a 
                  href="tel:+39000000000" 
                  onClick={(e) => { e.preventDefault(); triggerPushDemo("📞 Chiamata diretta al salone"); }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold flex items-center gap-1.5 hover:bg-white/10"
                >
                  <Phone size={12} className="text-[#E0B768]" />
                  <span>Chiama Salone</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRENOTA (LISTINO COMPLETO) */}
        {activeTab === "prenota" && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-black font-serif">Menu Trattamenti</h2>
              <p className="text-xs text-white/50">Seleziona il servizio per scegliere orario e stylist.</p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: "tutti", label: "Tutti" },
                { id: "piega", label: "Piega & Styling" },
                { id: "taglio", label: "Taglio" },
                { id: "colore", label: "Colore & Balayage" },
                { id: "cura", label: "Cura & Benessere" },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id 
                      ? "bg-[#E0B768] text-[#141218] shadow-md shadow-[#E0B768]/20" 
                      : "bg-[#1E1A24] text-white/60 border border-white/5 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Services List */}
            <div className="space-y-3">
              {SERVICES
                .filter(s => selectedCategory === "tutti" || s.category === selectedCategory)
                .map(serv => (
                  <div 
                    key={serv.id}
                    className="p-4 rounded-2xl bg-[#1E1A24] border border-white/5 hover:border-[#E0B768]/40 transition-all space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold text-white">{serv.name}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-white/40 mt-0.5">
                          <span className="flex items-center gap-1"><Clock size={11} /> {serv.duration}</span>
                        </div>
                      </div>
                      <span className="text-base font-black text-[#E0B768]">€ {serv.price}</span>
                    </div>

                    <p className="text-xs text-white/60 leading-relaxed">{serv.desc}</p>

                    <div className="pt-1 flex justify-end">
                      <button 
                        onClick={() => handleStartBooking(serv)}
                        className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#E0B768] to-[#C99846] text-[#141218] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                      >
                        <Calendar size={13} />
                        <span>Scegli & Prenota</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 3: FIDELITY CARD */}
        {activeTab === "fidelity" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-black font-serif">Club Cambia Look</h2>
              <p className="text-xs text-white/50">La tua tessera fedeltà digitale sempre a portata di mano.</p>
            </div>

            {/* VIRTUAL LUXURY CARD */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-[#302142] via-[#221830] to-[#120E1A] border border-[#E0B768]/50 shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#E0B768]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-black/40 border border-[#E0B768]/30 flex items-center justify-center p-1">
                    <Image src="/logo_transparent.png" alt="Logo" width={24} height={24} className="object-contain" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#E0B768]">VIP Member</span>
                    <h3 className="text-sm font-bold text-white">Giulia Bianchi</h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-white/40 uppercase tracking-wider block">Codice Tessera</span>
                  <span className="text-xs font-mono font-bold text-[#E0B768]">#CL-88421</span>
                </div>
              </div>

              {/* STAMP GRID (10 TIMBRI) */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-white/80">Timbri Raccolti</span>
                  <span className="text-[#E0B768]">7 di 10 completati</span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(step => {
                    const isDone = step <= 7;
                    const isReward = step === 10;
                    return (
                      <div 
                        key={step} 
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center text-center p-1 border transition-all ${
                          isDone 
                            ? "bg-[#E0B768] text-[#141218] border-[#E0B768] shadow-md shadow-[#E0B768]/20 font-black" 
                            : isReward
                              ? "bg-[#E5B8A8]/20 border-[#E5B8A8] text-[#E5B8A8] animate-pulse"
                              : "bg-white/5 border-white/10 text-white/30"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 size={16} strokeWidth={3} />
                        ) : isReward ? (
                          <Gift size={16} />
                        ) : (
                          <span className="text-xs font-bold">{step}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BARCODE / QR SIMULATION */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <QrCode size={28} className="text-[#E0B768]" />
                  <div className="text-[10px] text-white/60">
                    Mostra in cassa per<br />ricevere il timbro
                  </div>
                </div>
                <button 
                  onClick={() => triggerPushDemo("🎁 Timbro aggiunto! Hai ora 8 timbri sul tuo profilo.")}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#E0B768] hover:text-black text-[10px] font-bold uppercase transition-all"
                >
                  Simula Timbro
                </button>
              </div>
            </div>

            {/* REWARDS AVAILABLE */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Gift size={15} className="text-[#E0B768]" />
                <span>Premi & Vantaggi Attivi</span>
              </h3>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-2xl bg-[#1E1A24] border border-white/5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#E0B768] font-bold uppercase">Prossimo Traguardo (10° timbro)</span>
                    <h4 className="text-xs font-bold text-white">Trattamento Gloss & Idro-Mask Omaggio</h4>
                    <p className="text-[10px] text-white/40">Valore € 28,00</p>
                  </div>
                  <span className="text-xs font-black text-white/30 px-3 py-1 bg-white/5 rounded-lg">Mancano 3</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#1E1A24] border border-emerald-500/20 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">Sconto Compleanno 🎂</span>
                    <h4 className="text-xs font-bold text-white">-20% su qualsiasi servizio</h4>
                    <p className="text-[10px] text-white/40">Valido nel mese del tuo compleanno</p>
                  </div>
                  <span className="text-xs font-black text-emerald-400 px-3 py-1 bg-emerald-500/10 rounded-lg">Attivo</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LOOKBOOK GALLERY */}
        {activeTab === "lookbook" && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-black font-serif">Lookbook & Ispirazioni</h2>
              <p className="text-xs text-white/50">Scopri le ultime creazioni realizzate nel nostro salone.</p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {LOOKBOOK_PHOTOS.map(photo => (
                <div key={photo.id} className="rounded-2xl overflow-hidden bg-[#1E1A24] border border-white/5 group space-y-2">
                  <div className="relative aspect-[4/5] overflow-hidden bg-black/40">
                    <Image 
                      src={photo.img} 
                      alt={photo.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-rose-400 transition-colors">
                      <Heart size={14} />
                    </button>
                  </div>
                  <div className="p-2.5 pt-0 space-y-1">
                    <h4 className="text-xs font-bold text-white line-clamp-1">{photo.title}</h4>
                    <div className="flex justify-between items-center text-[10px] text-white/40">
                      <span>{photo.author}</span>
                      <span className="flex items-center gap-1"><Heart size={10} className="text-rose-400" /> {photo.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#241A2D] to-[#1A1420] border border-[#E0B768]/20 text-center space-y-2">
              <Sparkles size={20} className="mx-auto text-[#E0B768]" />
              <h4 className="text-xs font-bold text-white">Vuoi un look come questo?</h4>
              <p className="text-[11px] text-white/50">Mostralo alla tua stylist durante l'appuntamento!</p>
              <button 
                onClick={() => setActiveTab("prenota")}
                className="mt-1 px-4 py-2 bg-[#E0B768] text-black font-bold text-xs rounded-xl"
              >
                Prenota Ora
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: PROFILO & IMPOSTAZIONI */}
        {activeTab === "profilo" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-black font-serif">Il Tuo Profilo</h2>
              <p className="text-xs text-white/50">Gestisci i tuoi appuntamenti e preferenze.</p>
            </div>

            {/* USER CARD */}
            <div className="p-4 rounded-2xl bg-[#1E1A24] border border-white/5 flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#E0B768] to-[#E5B8A8] text-black font-black text-lg flex items-center justify-center shadow-lg">
                GB
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white">Giulia Bianchi</h3>
                <p className="text-xs text-white/50">giulia.bianchi@example.com</p>
                <span className="inline-block mt-1 text-[10px] font-bold text-[#E0B768] bg-[#E0B768]/10 px-2 py-0.5 rounded">
                  Cliente dal 2024
                </span>
              </div>
            </div>

            {/* UPCOMING APPOINTMENTS */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CalendarCheck size={15} className="text-[#E0B768]" />
                <span>Prossimo Appuntamento</span>
              </h3>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#241E2D] to-[#1B1622] border border-[#E0B768]/30 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-[#E0B768] uppercase tracking-wider">Confermato</span>
                    <h4 className="text-sm font-bold text-white">Taglio Sartoriale & Piega Luxury</h4>
                    <p className="text-xs text-white/60">Stylist: Valentina</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-white">Domani</span>
                    <span className="text-xs font-bold text-[#E0B768] block">16:30</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-between gap-2">
                  <button 
                    onClick={() => triggerPushDemo("📅 Appuntamento salvato sul calendario del tuo smartphone!")}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold hover:bg-white/10 transition-colors"
                  >
                    Aggiungi a Calendario
                  </button>
                  <button 
                    onClick={() => triggerPushDemo("💬 Messaggio WhatsApp inviato al salone per disdetta/spostamento")}
                    className="py-1.5 px-3 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px] font-bold hover:bg-rose-500/20 transition-colors"
                  >
                    Modifica
                  </button>
                </div>
              </div>
            </div>

            {/* SALON SETTINGS & NOTIFICATIONS TOGGLE */}
            <div className="p-4 rounded-2xl bg-[#1E1A24] border border-white/5 space-y-3 text-xs">
              <div className="flex justify-between items-center py-1">
                <div>
                  <span className="font-bold text-white block">Promemoria Notifiche Push</span>
                  <span className="text-[11px] text-white/50">Ricevi promemoria 24h e 2h prima</span>
                </div>
                <div className="w-10 h-6 bg-[#E0B768] rounded-full p-1 flex justify-end items-center cursor-pointer">
                  <div className="w-4 h-4 bg-[#141218] rounded-full shadow-md" />
                </div>
              </div>

              <div className="border-t border-white/5 pt-3 flex justify-between items-center py-1">
                <div>
                  <span className="font-bold text-white block">Offerte e Regali di Compleanno</span>
                  <span className="text-[11px] text-white/50">Promozioni riservate ai soci del club</span>
                </div>
                <div className="w-10 h-6 bg-[#E0B768] rounded-full p-1 flex justify-end items-center cursor-pointer">
                  <div className="w-4 h-4 bg-[#141218] rounded-full shadow-md" />
                </div>
              </div>
            </div>

            {/* DEMO CONTROLS NOTE */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
              <p className="text-[11px] text-amber-200 font-medium">
                📱 <strong>Bozza Interattiva per Cambia Look</strong><br />
                Puoi aggiungere questa schermata alla Home del tuo telefono per aprirla a schermo intero come una vera app.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* BOOKING MODAL (BOTTOM SHEET INTERATTIVO) */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#1C1724] border-t border-[#E0B768]/40 rounded-t-3xl p-6 space-y-5 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#E0B768] uppercase tracking-wider">Prenota Trattamento</span>
                <h3 className="text-base font-bold text-white font-serif">{bookingService?.name}</h3>
              </div>
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Step 1: Stylist */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/80 block">1. Scegli Stylist</label>
              <div className="grid grid-cols-2 gap-2">
                {STYLISTS.map(stylist => (
                  <button
                    key={stylist.id}
                    onClick={() => setBookingStylist(stylist.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      bookingStylist === stylist.id 
                        ? "bg-[#E0B768]/15 border-[#E0B768] text-white" 
                        : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                    }`}
                  >
                    <span className="text-lg">{stylist.avatar}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold truncate">{stylist.name}</div>
                      <div className="text-[9px] text-white/40 truncate">{stylist.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Slot */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/80 block">2. Seleziona Data e Orario</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  "Oggi, 15:30",
                  "Oggi, 16:30",
                  "Domani, 10:00",
                  "Domani, 11:30",
                  "Domani, 15:00",
                  "Sabato, 09:30"
                ].map(slot => (
                  <button
                    key={slot}
                    onClick={() => setBookingDate(slot)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                      bookingDate === slot 
                        ? "bg-[#E0B768] text-black border-[#E0B768] shadow-md shadow-[#E0B768]/20" 
                        : "bg-white/5 border-white/10 text-white/70 hover:border-white/20"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Total & Confirm */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60 font-medium">Totale stimato:</span>
                <span className="text-lg font-black text-[#E0B768]">€ {bookingService?.price}</span>
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={bookingConfirmed}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#E0B768] to-[#C99846] text-[#141218] font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                {bookingConfirmed ? (
                  <>
                    <CheckCircle2 size={18} className="animate-spin" />
                    <span>Conferma in corso...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Conferma Prenotazione</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM NAVIGATION BAR (Native App Feel) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#16121C]/95 backdrop-blur-xl border-t border-white/10 max-w-md mx-auto safe-pb">
        <div className="grid grid-cols-5 h-16 items-center px-1">
          {[
            { id: "home", label: "Home", icon: Home },
            { id: "prenota", label: "Prenota", icon: Scissors },
            { id: "fidelity", label: "Fidelity", icon: Award },
            { id: "lookbook", label: "Lookbook", icon: ImageIcon },
            { id: "profilo", label: "Profilo", icon: User },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center justify-center gap-1 transition-all py-1 ${
                  isActive ? "text-[#E0B768]" : "text-white/40 hover:text-white/70"
                }`}
              >
                <div className={`p-1 rounded-xl transition-all ${isActive ? "bg-[#E0B768]/15 scale-110" : ""}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] ${isActive ? "font-black tracking-tight" : "font-medium"}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

    </div>
  );
}
