"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  Gift, 
  ShoppingBag, 
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
  Award,
  Filter,
  Package,
  Plus,
  Minus,
  Check,
  Sparkle
} from "lucide-react";

// --- SERVIZI DONNA ---
const SERVICES = [
  {
    id: "piega-glamour",
    category: "piega",
    name: "Piega Glamour & Trattamento Lucidante",
    price: 25,
    duration: "40 min",
    desc: "Detersione con bagno capillare nutriente, massaggio cutaneo distensivo, maschera idratante e piega a scelta (onde morbide, beach waves o liscia specchio).",
    badge: "Più Amata",
  },
  {
    id: "taglio-donna-sartoriale",
    category: "taglio",
    name: "Taglio Sartoriale Donna & Piega",
    price: 48,
    duration: "55 min",
    desc: "Consulenza morfologica e visagismo personalizzato. Taglio calibrato sulle proporzioni del viso e styling finale a lunga tenuta.",
    badge: "Must Have",
  },
  {
    id: "balayage-sfumature",
    category: "colore",
    name: "Balayage Soleil & Gloss Tonificante",
    price: 95,
    duration: "130 min",
    desc: "Schiariture tridimensionali a mano libera senza barrature né effetto ricrescita, con bagno di luce Gloss tonalizzante sigillante.",
    badge: "Trend 2026",
  },
  {
    id: "colore-radice-organico",
    category: "colore",
    name: "Colore Radici Botanico No Ammoniaca",
    price: 42,
    duration: "60 min",
    desc: "Colorazione ad alta tollerabilità cutanea arricchita con oli vegetali. Copertura totale dei capelli bianchi e brillantezza estrema.",
    badge: null,
  },
  {
    id: "trattamento-botox-cheratina",
    category: "cura",
    name: "Botox Capillare & Cheratina Rimpolpante",
    price: 45,
    duration: "45 min",
    desc: "Trattamento d'urto rigenerante per capelli sfibrati o decolorati. Rimpolpa lo stelo e dona setosità immediata con durata fino a 6 settimane.",
    badge: "Risultato Immediato",
  },
  {
    id: "peeling-detox-spa",
    category: "cura",
    name: "Rituale Cute Detox & Massaggio Olistico",
    price: 32,
    duration: "35 min",
    desc: "Scrub purificante delicato per cute secca o asfittica con oli essenziali lenitivi, vapore aromatico e idratazione profonda.",
    badge: null,
  },
  {
    id: "schiariture-babylights",
    category: "colore",
    name: "Babylights Multitono & Ricostruzione",
    price: 85,
    duration: "110 min",
    desc: "Micro-micce finissime distribuite su tutta la chioma per un effetto baciata dal sole naturale e luminoso.",
    badge: null,
  },
  {
    id: "taglio-cambio-look",
    category: "taglio",
    name: "Consulenza Completa 'Cambia Look' & Taglio",
    price: 58,
    duration: "70 min",
    desc: "Studio completo di cromocromia e forma del viso per una trasformazione radicale del tuo stile in totale sicurezza.",
    badge: "Esclusiva",
  }
];

// --- PRODOTTI VENDUTI IN SALONE ---
const PRODUCTS = [
  {
    id: "shampoo-cheratina",
    category: "shampoo",
    name: "Shampoo Riparatore Sublime Cheratina",
    brand: "Cambia Look Care",
    price: 22.00,
    size: "250 ml",
    desc: "Bagno rigenerante formulato con cheratina idrolizzata e olio di argan. Deterge delicatamente rinforzando le fibre danneggiate.",
    benefits: ["Rinforza le fibre", "Zero solfati aggressivi", "Luminosità intensa"],
    img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=700&auto=format&fit=crop",
    inStock: true,
    bestseller: true,
  },
  {
    id: "maschera-botox",
    category: "maschere",
    name: "Maschera Nutriente Effetto Seta Botox",
    brand: "Cambia Look Care",
    price: 28.00,
    size: "200 ml",
    desc: "Impacco intensivo a penetrazione profonda. Elimina il crespo, districa all'istante e conferisce una morbidezza vellutata e corposa.",
    benefits: ["Addio crespo", "Nutrimento profondo", "Profumazione avvolgente"],
    img: "https://images.unsplash.com/photo-1608248597359-0a64980654bc?q=80&w=700&auto=format&fit=crop",
    inStock: true,
    bestseller: true,
  },
  {
    id: "elisir-olio-argan",
    category: "oli",
    name: "Elisir d'Oro Olio Secco di Argan & Camelia",
    brand: "Cambia Look Luxury",
    price: 26.00,
    size: "100 ml",
    desc: "Gocce preziose lucidanti da applicare su capelli umidi o asciutti. Sigilla le doppie punte e protegge da piastra e phon senza appesantire.",
    benefits: ["Termoprotettore 230°C", "Anti-doppie punte", "Lucentezza specchio"],
    img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=700&auto=format&fit=crop",
    inStock: true,
    bestseller: false,
  },
  {
    id: "spray-volumizzante",
    category: "styling",
    name: "Spray Radici Push-Up & Densificante",
    brand: "Cambia Look Pro",
    price: 21.00,
    size: "150 ml",
    desc: "Lozione texturizzante ultra-leggera che solleva le radici donando volume naturale a lunga tenuta per capelli fini.",
    benefits: ["Volume immediato", "Tenuta morbida", "Effetto anticaduta"],
    img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=700&auto=format&fit=crop",
    inStock: true,
    bestseller: false,
  },
  {
    id: "kit-mantenimento-biondo",
    category: "kit",
    name: "Kit Salva-Biondo Antigiallo & Gloss Home",
    brand: "Cambia Look Colors",
    price: 45.00,
    size: "Shampoo 250ml + Mask 200ml",
    desc: "Il rituale completo a casa per mantenere il tuo biondo o balayage fresco, privo di riflessi arancio/gialli e ultra-brillante come appena uscita dal salone.",
    benefits: ["Neutralizza il giallo", "Prolunga il balayage", "Massima idratazione"],
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=700&auto=format&fit=crop",
    inStock: true,
    bestseller: true,
  },
  {
    id: "crema-definizione-ricci",
    category: "styling",
    name: "Balsamo Modellante Onde & Ricci Elastici",
    brand: "Cambia Look Care",
    price: 23.00,
    size: "150 ml",
    desc: "Attiva-ricci nutriente all'estratto di semi di lino per ricci elastici, lucenti, ultra-definiti e protetti dall'umidità.",
    benefits: ["Ricci elastici", "Zero effetto cartone", "Antiumidità 24h"],
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=700&auto=format&fit=crop",
    inStock: true,
    bestseller: false,
  }
];

const STYLISTS = [
  { id: "any", name: "Prima Stylist Disponibile", role: "Disponibilità più veloce", avatar: "✨" },
  { id: "valentina", name: "Valentina", role: "Master Colorist & Balayage", avatar: "👩🏼" },
  { id: "sara", name: "Sara", role: "Specialista Taglio & Visagismo", avatar: "👩🏻" },
  { id: "elena", name: "Elena", role: "Rituali Spa & Styling", avatar: "💇🏼‍♀️" },
];

export default function CambiaLookApp() {
  const [activeTab, setActiveTab] = useState<"home" | "servizi" | "prodotti" | "fidelity" | "profilo">("home");
  const [serviceCategory, setServiceCategory] = useState<string>("tutti");
  const [productCategory, setProductCategory] = useState<string>("tutti");
  
  // Booking Modal State
  const [bookingService, setBookingService] = useState<any | null>(null);
  const [bookingStylist, setBookingStylist] = useState<string>("any");
  const [bookingDate, setBookingDate] = useState<string>("Oggi, 16:00");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Product Reserve Modal State
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [reservedCount, setReservedCount] = useState<number>(1);
  const [productReserved, setProductReserved] = useState(false);

  // Push Notification State
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
    }, 1200);
  };

  const handleReserveProduct = () => {
    setProductReserved(true);
    setTimeout(() => {
      setSelectedProduct(null);
      setProductReserved(false);
      triggerPushDemo(`🛍️ Prodotto riservato! Il tuo "${selectedProduct?.name}" è pronto per il ritiro in salone.`);
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#11090C] text-[#FFF5F6] flex flex-col relative pb-24 shadow-2xl overflow-hidden selection:bg-[#D91B42] selection:text-white font-sans">
      
      {/* SIMULATED PUSH NOTIFICATION (iOS Style Red-Tinted Glass Banner) */}
      {showNotification && (
        <div className="fixed top-4 left-4 right-4 z-50 animate-in slide-in-from-top duration-300">
          <div className="max-w-sm mx-auto bg-[#241017]/95 backdrop-blur-xl border border-[#D91B42]/50 rounded-2xl p-3.5 shadow-2xl flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#12090C] flex items-center justify-center shrink-0 border border-[#D91B42]/40 shadow-inner">
              <Image src="/app_icon_192.png" alt="Icon" width={28} height={28} className="rounded-lg" />
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black tracking-wider uppercase text-[#E63956]">Cambia Look</span>
                <span className="text-[10px] text-white/40">Adesso</span>
              </div>
              <p className="text-xs text-white/95 font-medium mt-0.5 leading-snug">{notificationText}</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-white/40 hover:text-white p-1">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="px-5 pt-12 pb-4 bg-gradient-to-b from-[#1C0E13] via-[#1C0E13]/95 to-transparent sticky top-0 z-30 backdrop-blur-md flex items-center justify-between border-b border-[#421C28]/60">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#9F1239] to-[#E11D48] p-0.5 shadow-lg shadow-[#D91B42]/20 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-[#180C10] rounded-[14px] flex items-center justify-center p-1">
              <Image 
                src="/logo_transparent.png" 
                alt="Logo Cambia Look" 
                width={36} 
                height={36} 
                className="object-contain filter invert contrast-125"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#E63956]">Salone Donna</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-bold">Aperto</span>
            </div>
            <h1 className="text-lg font-black tracking-tight font-serif bg-gradient-to-r from-white via-[#FFF0F2] to-[#FDA4AF] bg-clip-text text-transparent">
              Cambia Look
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => triggerPushDemo("🔔 Promemoria: Ciao Giulia! Ti ricordiamo il tuo appuntamento domani alle 15:30 da Cambia Look.")}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-[#E63956] hover:border-[#D91B42]/40 transition-colors relative"
            title="Simula Notifica Push"
          >
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D91B42] animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D91B42]" />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 px-5 pt-3 space-y-6">

        {/* TAB 1: HOME */}
        {activeTab === "home" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* HERO RUBY GLAMOUR CARD */}
            <div className="relative rounded-3xl overflow-hidden p-6 bg-gradient-to-br from-[#9F1239] via-[#6B0D24] to-[#1C0E13] border border-[#D91B42]/40 shadow-2xl">
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#E11D48]/30 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-[#FFF5F6] text-[10px] font-black uppercase tracking-wider">
                  <Sparkles size={12} className="text-[#FDA4AF]" />
                  <span>Dedicato Esclusivamente a Te</span>
                </div>
                <h2 className="text-2xl font-black font-serif leading-tight text-white drop-shadow-sm">
                  Riscopri la bellezza dei tuoi capelli.
                </h2>
                <p className="text-xs text-white/85 font-normal leading-relaxed">
                  Trattamenti su misura per sole donne: taglio sartoriale, schiariture luminose e i migliori prodotti professionali per la cura a casa.
                </p>

                {/* 2 Main Action Buttons: Servizi e Prodotti */}
                <div className="pt-2 grid grid-cols-2 gap-2.5">
                  <button 
                    onClick={() => setActiveTab("servizi")}
                    className="py-3 px-3 rounded-2xl bg-white text-[#9F1239] font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 hover:bg-white/90 active:scale-95 transition-all"
                  >
                    <Scissors size={15} />
                    <span>Tutti i Servizi</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab("prodotti")}
                    className="py-3 px-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/30 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 hover:bg-black/60 active:scale-95 transition-all"
                  >
                    <ShoppingBag size={15} className="text-[#FDA4AF]" />
                    <span>I Nostri Prodotti</span>
                  </button>
                </div>
              </div>
            </div>

            {/* QUICK HIGHLIGHT CARDS (2 PILASTRI: SERVIZI & SHOP) */}
            <div className="grid grid-cols-2 gap-3">
              {/* Box 1: Servizi */}
              <div 
                onClick={() => setActiveTab("servizi")}
                className="p-4 rounded-2xl bg-gradient-to-br from-[#28141C] to-[#1C0E13] border border-[#421C28] hover:border-[#D91B42]/50 transition-all cursor-pointer group space-y-2 active:scale-98"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D91B42]/15 text-[#E63956] flex items-center justify-center border border-[#D91B42]/30">
                  <Scissors size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white group-hover:text-[#FDA4AF] transition-colors">Trattamenti Salone</h3>
                  <p className="text-[10px] text-white/50">{SERVICES.length} servizi esclusivi</p>
                </div>
              </div>

              {/* Box 2: Prodotti */}
              <div 
                onClick={() => setActiveTab("prodotti")}
                className="p-4 rounded-2xl bg-gradient-to-br from-[#28141C] to-[#1C0E13] border border-[#421C28] hover:border-[#D91B42]/50 transition-all cursor-pointer group space-y-2 active:scale-98"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E63956]/15 text-[#FDA4AF] flex items-center justify-center border border-[#E63956]/30">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white group-hover:text-[#FDA4AF] transition-colors">Linee Prodotti</h3>
                  <p className="text-[10px] text-white/50">{PRODUCTS.length} prodotti disponibili</p>
                </div>
              </div>
            </div>

            {/* SEZIONE: SERVIZI IN PRIMO PIANO */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black font-serif tracking-tight text-white flex items-center gap-2">
                  <Scissors size={15} className="text-[#E63956]" />
                  <span>Servizi Più Richiesti</span>
                </h3>
                <button 
                  onClick={() => setActiveTab("servizi")}
                  className="text-[11px] font-bold text-[#FDA4AF] hover:underline"
                >
                  Vedi Tutti ({SERVICES.length})
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {SERVICES.slice(0, 3).map((serv) => (
                  <div 
                    key={serv.id}
                    onClick={() => handleStartBooking(serv)}
                    className="p-3.5 rounded-2xl bg-[#1C0E13] border border-[#421C28]/60 hover:border-[#D91B42]/60 transition-all flex items-center justify-between cursor-pointer group active:scale-[0.99]"
                  >
                    <div className="space-y-1 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-[#FDA4AF] transition-colors">{serv.name}</span>
                        {serv.badge && (
                          <span className="text-[9px] px-1.5 py-0.2 bg-[#D91B42]/20 text-[#FDA4AF] font-bold rounded">
                            {serv.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-white/50 line-clamp-1">{serv.desc}</p>
                      <div className="flex items-center gap-3 text-[10px] text-white/40">
                        <span className="flex items-center gap-1"><Clock size={11} /> {serv.duration}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-black text-[#E63956]">€ {serv.price}</div>
                      <button className="mt-1 px-2.5 py-1 rounded-lg bg-[#D91B42]/20 text-[#FDA4AF] group-hover:bg-[#D91B42] group-hover:text-white text-[10px] font-black uppercase transition-all">
                        Prenota
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEZIONE: PRODOTTI DEL SALONE IN PRIMO PIANO */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black font-serif tracking-tight text-white flex items-center gap-2">
                  <ShoppingBag size={15} className="text-[#E63956]" />
                  <span>I Prodotti Consigliati per Te</span>
                </h3>
                <button 
                  onClick={() => setActiveTab("prodotti")}
                  className="text-[11px] font-bold text-[#FDA4AF] hover:underline"
                >
                  Shop Completo ({PRODUCTS.length})
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {PRODUCTS.slice(0, 2).map((prod) => (
                  <div 
                    key={prod.id}
                    onClick={() => { setSelectedProduct(prod); setReservedCount(1); }}
                    className="p-3 rounded-2xl bg-[#1C0E13] border border-[#421C28]/60 hover:border-[#D91B42]/60 transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-black/40 mb-2.5">
                      <Image 
                        src={prod.img} 
                        alt={prod.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <span className="absolute top-2 left-2 text-[8px] font-black uppercase tracking-wider bg-[#D91B42] text-white px-2 py-0.5 rounded-full shadow">
                        Salone
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#FDA4AF] transition-colors">{prod.name}</h4>
                      <p className="text-[10px] text-white/50">{prod.size}</p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-black text-[#E63956]">€ {prod.price.toFixed(2)}</span>
                        <span className="text-[10px] text-emerald-400 font-bold">Disponibile</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FIDELITY BANNER */}
            <div 
              onClick={() => setActiveTab("fidelity")}
              className="p-4 rounded-2xl bg-gradient-to-r from-[#2B1019] via-[#200D14] to-[#17090E] border border-[#D91B42]/40 flex items-center justify-between cursor-pointer hover:border-[#D91B42]/70 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#D91B42]/20 text-[#FDA4AF] flex items-center justify-center shrink-0 border border-[#D91B42]/40">
                  <Award size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FDA4AF]">Tessera Fedeltà VIP</span>
                    <span className="text-[10px] text-white/40">• 7/10 Timbri</span>
                  </div>
                  <p className="text-xs font-bold text-white group-hover:text-[#FDA4AF] transition-colors">
                    Guadagna punti su ogni servizio e acquisto prodotti!
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="text-white/40 group-hover:text-[#FDA4AF] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            {/* SALON CONTACT & HOURS QUICK CARD */}
            <div className="p-4 rounded-2xl bg-[#1A0E13] border border-[#421C28]/60 space-y-2.5 text-xs text-white/70">
              <div className="flex items-center gap-2 text-white font-bold">
                <MapPin size={15} className="text-[#E63956]" />
                <span>Salone Cambia Look • Solo Donna</span>
              </div>
              <p className="text-[11px] text-white/50 pl-6">
                Via Roma, 142 • Da Martedì a Sabato: 09:00 - 19:00
              </p>
              <div className="pt-1 flex gap-2 pl-6">
                <button 
                  onClick={() => triggerPushDemo("📞 Chiamata telefonica al salone Cambia Look")}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold flex items-center gap-1.5 hover:bg-white/10"
                >
                  <Phone size={12} className="text-[#E63956]" />
                  <span>Chiama Salone</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TUTTI I SERVIZI DONNA */}
        {activeTab === "servizi" && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D91B42]/20 border border-[#D91B42]/30 text-[#FDA4AF] text-[9px] font-black uppercase tracking-wider mb-1">
                Listino Completo
              </div>
              <h2 className="text-xl font-black font-serif text-white">Trattamenti Salone Donna</h2>
              <p className="text-xs text-white/50">Scegli il trattamento desiderato per prenotare il tuo orario.</p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: "tutti", label: "Tutti" },
                { id: "piega", label: "Piega & Finish" },
                { id: "taglio", label: "Taglio Sartoriale" },
                { id: "colore", label: "Colore & Balayage" },
                { id: "cura", label: "Cura & Benessere" },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setServiceCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    serviceCategory === cat.id 
                      ? "bg-[#D91B42] text-white shadow-md shadow-[#D91B42]/30" 
                      : "bg-[#1C0E13] text-white/60 border border-[#421C28]/60 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Services List */}
            <div className="space-y-3">
              {SERVICES
                .filter(s => serviceCategory === "tutti" || s.category === serviceCategory)
                .map(serv => (
                  <div 
                    key={serv.id}
                    className="p-4 rounded-2xl bg-[#1C0E13] border border-[#421C28]/60 hover:border-[#D91B42]/50 transition-all space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{serv.name}</h4>
                          {serv.badge && (
                            <span className="text-[9px] px-1.5 py-0.2 bg-[#D91B42]/20 text-[#FDA4AF] font-bold rounded">
                              {serv.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-white/40 mt-0.5">
                          <span className="flex items-center gap-1"><Clock size={11} /> {serv.duration}</span>
                        </div>
                      </div>
                      <span className="text-base font-black text-[#E63956]">€ {serv.price}</span>
                    </div>

                    <p className="text-xs text-white/60 leading-relaxed">{serv.desc}</p>

                    <div className="pt-1 flex justify-end">
                      <button 
                        onClick={() => handleStartBooking(serv)}
                        className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#D91B42] to-[#B91034] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-[#D91B42]/20 active:scale-95 transition-all"
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

        {/* TAB 3: PRODOTTI DEL SALONE (VETRINA & SHOP) */}
        {activeTab === "prodotti" && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D91B42]/20 border border-[#D91B42]/30 text-[#FDA4AF] text-[9px] font-black uppercase tracking-wider mb-1">
                Shop Salone
              </div>
              <h2 className="text-xl font-black font-serif text-white">Linee Prodotti Professionali</h2>
              <p className="text-xs text-white/50">I trattamenti di bellezza per continuare la cura dei tuoi capelli a casa.</p>
            </div>

            {/* Product Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: "tutti", label: "Tutti" },
                { id: "shampoo", label: "Shampoo" },
                { id: "maschere", label: "Maschere & Balsami" },
                { id: "oli", label: "Oli & Sieri" },
                { id: "styling", label: "Styling & Finish" },
                { id: "kit", label: "Kit Completi" },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setProductCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    productCategory === cat.id 
                      ? "bg-[#D91B42] text-white shadow-md shadow-[#D91B42]/30" 
                      : "bg-[#1C0E13] text-white/60 border border-[#421C28]/60 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              {PRODUCTS
                .filter(p => productCategory === "tutti" || p.category === productCategory)
                .map(prod => (
                  <div 
                    key={prod.id}
                    onClick={() => { setSelectedProduct(prod); setReservedCount(1); }}
                    className="p-3 rounded-2xl bg-[#1C0E13] border border-[#421C28]/60 hover:border-[#D91B42]/60 transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-black/40 mb-2.5">
                        <Image 
                          src={prod.img} 
                          alt={prod.name} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        {prod.bestseller && (
                          <span className="absolute top-2 left-2 text-[8px] font-black uppercase tracking-wider bg-[#D91B42] text-white px-2 py-0.5 rounded-full shadow">
                            Top Seller
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-[#FDA4AF] uppercase tracking-wider block">{prod.brand}</span>
                        <h4 className="text-xs font-bold text-white line-clamp-2 group-hover:text-[#FDA4AF] transition-colors leading-snug">{prod.name}</h4>
                        <p className="text-[10px] text-white/50">{prod.size}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 mt-2 flex items-center justify-between">
                      <span className="text-xs font-black text-[#E63956]">€ {prod.price.toFixed(2)}</span>
                      <button className="px-2 py-1 rounded-lg bg-[#D91B42]/20 text-[#FDA4AF] group-hover:bg-[#D91B42] group-hover:text-white text-[10px] font-bold uppercase transition-all">
                        Dettagli
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* INFO SHOP BANNER */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#29141C] to-[#1C0E13] border border-[#D91B42]/30 text-center space-y-1.5">
              <Package size={20} className="mx-auto text-[#E63956]" />
              <h4 className="text-xs font-bold text-white">Ritiro Comodo in Salone</h4>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Riserva i tuoi prodotti preferiti dall'app: li prepariamo e li trovi pronti al tuo prossimo appuntamento o quando passi a trovarci!
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: FIDELITY CLUB DONNA */}
        {activeTab === "fidelity" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D91B42]/20 border border-[#D91B42]/30 text-[#FDA4AF] text-[9px] font-black uppercase tracking-wider mb-1">
                Club Esclusivo
              </div>
              <h2 className="text-xl font-black font-serif text-white">Club Cambia Look Donna</h2>
              <p className="text-xs text-white/50">Accumula punti ad ogni trattamento e acquisto prodotti.</p>
            </div>

            {/* VIRTUAL RUBY LUXURY CARD */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-[#9F1239] via-[#5C0A1E] to-[#1E090F] border border-[#D91B42]/60 shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#E11D48]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/20 flex items-center justify-center p-1">
                    <Image src="/logo_transparent.png" alt="Logo" width={24} height={24} className="object-contain filter invert" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#FDA4AF]">VIP Donna Member</span>
                    <h3 className="text-sm font-bold text-white">Giulia Bianchi</h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-white/50 uppercase tracking-wider block">Codice Tessera</span>
                  <span className="text-xs font-mono font-bold text-white">#CL-88421</span>
                </div>
              </div>

              {/* STAMP GRID (10 TIMBRI) */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-white/90">Punti Raccolti</span>
                  <span className="text-[#FDA4AF]">7 di 10 completati</span>
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
                            ? "bg-[#D91B42] text-white border-[#D91B42] shadow-md shadow-[#D91B42]/30 font-black" 
                            : isReward
                              ? "bg-white/10 border-white/40 text-[#FDA4AF] animate-pulse"
                              : "bg-black/30 border-white/10 text-white/30"
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
              <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <QrCode size={28} className="text-[#FDA4AF]" />
                  <div className="text-[10px] text-white/70">
                    Mostra in cassa al salone<br />per ricevere i punti
                  </div>
                </div>
                <button 
                  onClick={() => triggerPushDemo("🎁 Timbro aggiunto! Hai ora 8 timbri sulla tua tessera.")}
                  className="px-3 py-1.5 rounded-lg bg-black/40 hover:bg-[#D91B42] text-white border border-white/20 text-[10px] font-bold uppercase transition-all"
                >
                  Simula Timbro
                </button>
              </div>
            </div>

            {/* REWARDS AVAILABLE */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Gift size={15} className="text-[#E63956]" />
                <span>Premi & Sconti Attivi</span>
              </h3>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-2xl bg-[#1C0E13] border border-[#421C28]/60 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#FDA4AF] font-bold uppercase">Premio 10° Timbro</span>
                    <h4 className="text-xs font-bold text-white">Piega Glamour o Maschera Sublime Omaggio</h4>
                    <p className="text-[10px] text-white/40">Valore € 25,00</p>
                  </div>
                  <span className="text-xs font-black text-white/40 px-3 py-1 bg-white/5 rounded-lg">Mancano 3</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#1C0E13] border border-emerald-500/20 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">Sconto Compleanno 🎂</span>
                    <h4 className="text-xs font-bold text-white">-20% su tutti i Prodotti & Servizi</h4>
                    <p className="text-[10px] text-white/40">Valido per tutto il mese</p>
                  </div>
                  <span className="text-xs font-black text-emerald-400 px-3 py-1 bg-emerald-500/10 rounded-lg">Attivo</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PROFILO & SALONE */}
        {activeTab === "profilo" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-black font-serif text-white">Il Tuo Profilo</h2>
              <p className="text-xs text-white/50">Appuntamenti, prodotti riservati e contatti salone.</p>
            </div>

            {/* USER CARD */}
            <div className="p-4 rounded-2xl bg-[#1C0E13] border border-[#421C28]/60 flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#9F1239] to-[#E11D48] text-white font-black text-lg flex items-center justify-center shadow-lg">
                GB
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white">Giulia Bianchi</h3>
                <p className="text-xs text-white/50">giulia.bianchi@example.com</p>
                <span className="inline-block mt-1 text-[10px] font-bold text-[#FDA4AF] bg-[#D91B42]/15 px-2 py-0.5 rounded">
                  Cliente VIP Salone
                </span>
              </div>
            </div>

            {/* PROSSIMO APPUNTAMENTO */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CalendarCheck size={15} className="text-[#E63956]" />
                <span>Il Tuo Prossimo Appuntamento</span>
              </h3>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#241018] to-[#180C11] border border-[#D91B42]/40 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-[#FDA4AF] uppercase tracking-wider">Confermato</span>
                    <h4 className="text-sm font-bold text-white">Taglio Sartoriale & Piega Glamour</h4>
                    <p className="text-xs text-white/60">Stylist: Valentina</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-white">Domani</span>
                    <span className="text-xs font-bold text-[#E63956] block">16:00</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-between gap-2">
                  <button 
                    onClick={() => triggerPushDemo("📅 Appuntamento salvato sul calendario del tuo telefono!")}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold hover:bg-white/10 transition-colors"
                  >
                    Aggiungi a Calendario
                  </button>
                  <button 
                    onClick={() => triggerPushDemo("💬 Messaggio WhatsApp inviato al salone")}
                    className="py-1.5 px-3 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px] font-bold hover:bg-rose-500/20 transition-colors"
                  >
                    Modifica
                  </button>
                </div>
              </div>
            </div>

            {/* SALON SETTINGS TOGGLES */}
            <div className="p-4 rounded-2xl bg-[#1C0E13] border border-[#421C28]/60 space-y-3 text-xs">
              <div className="flex justify-between items-center py-1">
                <div>
                  <span className="font-bold text-white block">Promemoria Appuntamenti</span>
                  <span className="text-[11px] text-white/50">Notifica push 24h e 2h prima</span>
                </div>
                <div className="w-10 h-6 bg-[#D91B42] rounded-full p-1 flex justify-end items-center cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                </div>
              </div>

              <div className="border-t border-white/5 pt-3 flex justify-between items-center py-1">
                <div>
                  <span className="font-bold text-white block">Offerte Speciali & Nuovi Prodotti</span>
                  <span className="text-[11px] text-white/50">Avviso quando arrivano nuovi kit in salone</span>
                </div>
                <div className="w-10 h-6 bg-[#D91B42] rounded-full p-1 flex justify-end items-center cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                </div>
              </div>
            </div>

            {/* DEMO NOTE */}
            <div className="p-3.5 rounded-2xl bg-[#D91B42]/10 border border-[#D91B42]/20 text-center">
              <p className="text-[11px] text-[#FDA4AF] font-medium">
                ❤️ <strong>Bozza Ufficiale Cambia Look • Salone Donna</strong><br />
                Aggiungila alla schermata Home del tuo smartphone per mostrarla a schermo intero alla cliente.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: PRENOTAZIONE SERVIZIO */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#1C0E13] border-t border-[#D91B42]/50 rounded-t-3xl p-6 space-y-5 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#FDA4AF] uppercase tracking-wider">Prenota Trattamento</span>
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
              <label className="text-xs font-bold text-white/80 block">1. Scegli la tua Stylist</label>
              <div className="grid grid-cols-2 gap-2">
                {STYLISTS.map(stylist => (
                  <button
                    key={stylist.id}
                    onClick={() => setBookingStylist(stylist.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      bookingStylist === stylist.id 
                        ? "bg-[#D91B42]/20 border-[#D91B42] text-white" 
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
                        ? "bg-[#D91B42] text-white border-[#D91B42] shadow-md shadow-[#D91B42]/30" 
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
                <span className="text-white/60 font-medium">Prezzo trattamento:</span>
                <span className="text-lg font-black text-[#E63956]">€ {bookingService?.price}</span>
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={bookingConfirmed}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D91B42] to-[#A80F30] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#D91B42]/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
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

      {/* MODAL 2: DETTAGLIO & RISERVA PRODOTTO */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#1C0E13] border-t border-[#D91B42]/50 rounded-t-3xl p-6 space-y-5 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl">
            
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#FDA4AF] uppercase tracking-wider">{selectedProduct.brand}</span>
                <h3 className="text-base font-bold text-white font-serif">{selectedProduct.name}</h3>
                <span className="text-xs text-white/50">{selectedProduct.size}</span>
              </div>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Product Image Large */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/40">
              <Image 
                src={selectedProduct.img} 
                alt={selectedProduct.name} 
                fill 
                className="object-cover" 
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <p className="text-xs text-white/70 leading-relaxed">{selectedProduct.desc}</p>
              
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">Benefici per i tuoi capelli:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.benefits.map((b: string, i: number) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[10px] bg-white/5 border border-white/10 text-white/80 px-2.5 py-1 rounded-lg">
                      <Sparkle size={10} className="text-[#FDA4AF]" />
                      <span>{b}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity Selector & Price */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3 bg-white/5 p-1 rounded-xl border border-white/10">
                <button 
                  onClick={() => setReservedCount(Math.max(1, reservedCount - 1))}
                  className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                >
                  <Minus size={14} />
                </button>
                <span className="text-xs font-bold px-1">{reservedCount}</span>
                <button 
                  onClick={() => setReservedCount(reservedCount + 1)}
                  className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-white/50 block">Totale:</span>
                <span className="text-lg font-black text-[#E63956]">€ {(selectedProduct.price * reservedCount).toFixed(2)}</span>
              </div>
            </div>

            {/* Reserve Button */}
            <button
              onClick={handleReserveProduct}
              disabled={productReserved}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D91B42] to-[#A80F30] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#D91B42]/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              {productReserved ? (
                <>
                  <CheckCircle2 size={18} className="animate-spin" />
                  <span>Conferma in corso...</span>
                </>
              ) : (
                <>
                  <Package size={16} />
                  <span>Riserva per il Ritiro in Salone</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM NAVIGATION BAR (Red Glamour Luxury Theme) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#160A0F]/95 backdrop-blur-xl border-t border-[#421C28]/80 max-w-md mx-auto safe-pb">
        <div className="grid grid-cols-5 h-16 items-center px-1">
          {[
            { id: "home", label: "Home", icon: Home },
            { id: "servizi", label: "Servizi", icon: Scissors },
            { id: "prodotti", label: "Prodotti", icon: ShoppingBag },
            { id: "fidelity", label: "Fidelity", icon: Award },
            { id: "profilo", label: "Profilo", icon: User },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center justify-center gap-1 transition-all py-1 ${
                  isActive ? "text-[#E63956]" : "text-white/40 hover:text-white/70"
                }`}
              >
                <div className={`p-1 rounded-xl transition-all ${isActive ? "bg-[#D91B42]/20 scale-110" : ""}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] ${isActive ? "font-black tracking-tight text-[#FDA4AF]" : "font-medium"}`}>
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
