"use client";

import React, { useState, useEffect } from "react";
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
  Sparkle,
  Upload,
  Camera,
  Trash2,
  Lock,
  Unlock,
  ShieldCheck,
  Eye,
  Sliders,
  Crown,
  Flame,
  Gem,
  Tag
} from "lucide-react";

// --- SERVIZI DONNA ---
const INITIAL_SERVICES = [
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
const INITIAL_PRODUCTS = [
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
  
  // Products Dynamic State (with localStorage persistence)
  const [productsList, setProductsList] = useState<any[]>(INITIAL_PRODUCTS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cambia_look_products");
      if (saved) {
        setProductsList(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveProducts = (newList: any[]) => {
    setProductsList(newList);
    try {
      localStorage.setItem("cambia_look_products", JSON.stringify(newList));
    } catch (e) {
      console.error(e);
    }
  };

  // Staff / Salon Mode State (The killer feature for demonstration!)
  const [isStaffMode, setIsStaffMode] = useState<boolean>(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // New Product Modal Form State
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("shampoo");
  const [newProdBrand, setNewProdBrand] = useState("Cambia Look Care");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdSize, setNewProdSize] = useState("250 ml");
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdBenefits, setNewProdBenefits] = useState("");
  const [newProdImage, setNewProdImage] = useState<string>("");

  // Booking Modal State
  const [bookingService, setBookingService] = useState<any | null>(null);
  const [bookingStylist, setBookingStylist] = useState<string>("any");
  const [bookingDate, setBookingDate] = useState<string>("Oggi, 16:00");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Product Reserve Modal State (Customer View)
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

  const handleToggleStaffMode = () => {
    if (isStaffMode) {
      setIsStaffMode(false);
      triggerPushDemo("👤 Modalità Cliente Attiva (I clienti vedono solo i prodotti e i servizi)");
    } else {
      setIsPinModalOpen(true);
      setPinInput("");
      setPinError(false);
    }
  };

  const handleVerifyPin = () => {
    // Demo PIN: 1234 or empty
    if (pinInput === "1234" || pinInput === "") {
      setIsStaffMode(true);
      setIsPinModalOpen(false);
      triggerPushDemo("👑 Accesso Titolare Salone Attivato! Ora puoi inserire e gestire i prodotti.");
    } else {
      setPinError(true);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProdImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    const parsedPrice = parseFloat(newProdPrice.replace(",", ".")) || 0;
    const benefitsList = newProdBenefits
      ? newProdBenefits.split(",").map(b => b.trim()).filter(Boolean)
      : ["Idratazione professionale", "Formula salone esclusiva"];

    const fallbackImg = newProdCategory === "shampoo" 
      ? "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=700&auto=format&fit=crop"
      : newProdCategory === "maschere"
      ? "https://images.unsplash.com/photo-1608248597359-0a64980654bc?q=80&w=700&auto=format&fit=crop"
      : "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=700&auto=format&fit=crop";

    const newProduct = {
      id: `prod-${Date.now()}`,
      category: newProdCategory,
      name: newProdName,
      brand: newProdBrand || "Cambia Look Care",
      price: parsedPrice,
      size: newProdSize || "Formato Salone",
      desc: newProdDesc || "Prodotto professionale testato e consigliato dalle stylist del salone Cambia Look.",
      benefits: benefitsList,
      img: newProdImage || fallbackImg,
      inStock: true,
      bestseller: false
    };

    saveProducts([newProduct, ...productsList]);
    setIsNewProductModalOpen(false);

    // Reset Form
    setNewProdName("");
    setNewProdPrice("");
    setNewProdDesc("");
    setNewProdBenefits("");
    setNewProdImage("");

    triggerPushDemo(`🎉 Prodotto "${newProduct.name}" aggiunto con successo al catalogo! Ora è visibile a tutte le clienti.`);
  };

  const handleDeleteProduct = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Vuoi davvero rimuovere questo prodotto dal catalogo dell'app?")) {
      const filtered = productsList.filter(p => p.id !== productId);
      saveProducts(filtered);
      triggerPushDemo("🗑️ Prodotto rimosso dal catalogo");
    }
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
    <div className="max-w-md mx-auto min-h-screen bg-[#0A0407] text-[#FFF5F7] flex flex-col relative pb-24 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden selection:bg-[#E11D48] selection:text-white font-sans">
      
      {/* Background Ambient Glow Elements */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-80 bg-[#E11D48]/15 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-20 right-0 w-80 h-80 bg-[#9F1239]/12 rounded-full blur-[110px] pointer-events-none z-0" />

      {/* SIMULATED PUSH NOTIFICATION (iOS Style Red-Tinted Glass Banner) */}
      {showNotification && (
        <div className="fixed top-4 left-4 right-4 z-50 animate-in slide-in-from-top duration-300">
          <div className="max-w-sm mx-auto glass-panel-elevated rounded-2xl p-3.5 shadow-2xl flex items-start gap-3 border border-[#FB7185]/40">
            <div className="w-10 h-10 rounded-xl bg-[#14060C] flex items-center justify-center shrink-0 border border-[#E11D48]/40 shadow-inner">
              <Image src="/app_icon_192.png" alt="Icon" width={28} height={28} className="rounded-lg" />
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black tracking-wider uppercase text-[#FB7185]">Cambia Look</span>
                <span className="text-[10px] text-white/50">Adesso</span>
              </div>
              <p className="text-xs text-white/95 font-medium mt-0.5 leading-snug">{notificationText}</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-white/40 hover:text-white p-1">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STAFF MODE BANNER (When Active) */}
      {isStaffMode && (
        <div className="bg-gradient-to-r from-[#9F1239] via-[#E11D48] to-[#FB7185] text-white px-4 py-2 text-xs font-bold flex items-center justify-between shadow-xl sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} />
            <span className="tracking-wide">Modalità Gestione Titolare (Salone)</span>
          </div>
          <button 
            onClick={handleToggleStaffMode}
            className="px-2.5 py-1 bg-black/40 hover:bg-black/60 text-[10px] uppercase font-black rounded-lg transition-colors border border-white/20"
          >
            Vista Cliente
          </button>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="px-5 pt-10 pb-4 bg-[#0A0407]/80 sticky top-0 z-30 backdrop-blur-xl flex items-center justify-between border-b border-[#FB7185]/15 transition-all">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#9F1239] via-[#E11D48] to-[#FDA4AF] p-0.5 shadow-lg shadow-[#E11D48]/30 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-[#12050B] rounded-[14px] flex items-center justify-center p-1">
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
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FB7185]">Salone Donna</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-bold tracking-wider">Aperto</span>
            </div>
            <h1 className="text-xl font-black tracking-tight font-serif bg-gradient-to-r from-white via-[#FFF0F2] to-[#FDA4AF] bg-clip-text text-transparent">
              Cambia Look
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Staff Switch Demo Button */}
          <button 
            onClick={handleToggleStaffMode}
            className={`px-3 py-1.5 rounded-full border text-[10px] font-black uppercase flex items-center gap-1.5 transition-all ${
              isStaffMode 
                ? "bg-[#E11D48] text-white border-[#FB7185] shadow-md shadow-[#E11D48]/40" 
                : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-[#FB7185]/40"
            }`}
            title={isStaffMode ? "Torna a vista cliente" : "Accedi come Titolare Salone"}
          >
            {isStaffMode ? <Unlock size={12} /> : <Lock size={12} />}
            <span>{isStaffMode ? "Staff" : "Titolare"}</span>
          </button>

          <button 
            onClick={() => triggerPushDemo("🔔 Promemoria: Ciao Giulia! Ti ricordiamo il tuo appuntamento domani alle 15:30 da Cambia Look.")}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-[#FB7185] hover:border-[#FB7185]/40 transition-colors relative"
            title="Simula Notifica Push"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E11D48] shadow-sm shadow-[#E11D48]" />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 px-5 pt-3 space-y-6 relative z-10">

        {/* TAB 1: HOME */}
        {activeTab === "home" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* HERO RUBY GLAMOUR CARD */}
            <div className="relative rounded-[28px] overflow-hidden p-6 bg-gradient-to-br from-[#9F1239] via-[#4C0617] to-[#120409] border border-[#FB7185]/30 shadow-2xl animate-shimmer">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#E11D48]/35 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-[#BE123C]/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 space-y-3.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-badge text-[#FFF5F7] text-[10px] font-black uppercase tracking-wider shadow-sm">
                  <Sparkles size={12} className="text-[#FDA4AF]" />
                  <span>Atelier Donna • Alta Moda Capelli</span>
                </div>

                <h2 className="text-2xl font-black font-serif leading-tight text-white drop-shadow-md">
                  Riscopri la bellezza <br/>
                  <span className="italic font-normal bg-gradient-to-r from-[#FFF5F7] via-[#FDA4AF] to-[#F5D061] bg-clip-text text-transparent">
                    e la luce dei tuoi capelli.
                  </span>
                </h2>

                <p className="text-xs text-white/80 font-normal leading-relaxed">
                  Percorsi sartoriali dedicati ad ogni donna: balayage tridimensionale, tagli di precisione e rituali benessere professionali da proseguire a casa.
                </p>

                {/* 2 Main Action Buttons: Servizi e Prodotti */}
                <div className="pt-2 grid grid-cols-2 gap-2.5">
                  <button 
                    onClick={() => setActiveTab("servizi")}
                    className="py-3 px-3 rounded-2xl bg-white text-[#880B2B] font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 hover:bg-white/95 active:scale-95 transition-all"
                  >
                    <Scissors size={15} />
                    <span>Tutti i Servizi</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab("prodotti")}
                    className="py-3 px-3 rounded-2xl glass-panel text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 hover:bg-white/10 active:scale-95 transition-all border border-white/25"
                  >
                    <ShoppingBag size={15} className="text-[#FDA4AF]" />
                    <span>Linee Prodotti</span>
                  </button>
                </div>
              </div>
            </div>

            {/* QUICK HIGHLIGHT CARDS (2 PILASTRI: SERVIZI & SHOP) */}
            <div className="grid grid-cols-2 gap-3">
              {/* Box 1: Servizi */}
              <div 
                onClick={() => setActiveTab("servizi")}
                className="p-4 rounded-2xl glass-panel hover:border-[#FB7185]/40 transition-all cursor-pointer group space-y-2.5 active:scale-98 relative overflow-hidden"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E11D48]/15 text-[#FB7185] flex items-center justify-center border border-[#E11D48]/30 group-hover:scale-110 transition-transform">
                  <Scissors size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white group-hover:text-[#FDA4AF] transition-colors flex items-center gap-1">
                    Trattamenti Salone
                    <ChevronRight size={13} className="text-white/40 group-hover:translate-x-0.5 transition-transform" />
                  </h3>
                  <p className="text-[10px] text-white/50">{INITIAL_SERVICES.length} servizi esclusivi donna</p>
                </div>
              </div>

              {/* Box 2: Prodotti */}
              <div 
                onClick={() => setActiveTab("prodotti")}
                className="p-4 rounded-2xl glass-panel hover:border-[#FB7185]/40 transition-all cursor-pointer group space-y-2.5 active:scale-98 relative overflow-hidden"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FB7185]/15 text-[#FDA4AF] flex items-center justify-center border border-[#FB7185]/30 group-hover:scale-110 transition-transform">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white group-hover:text-[#FDA4AF] transition-colors flex items-center gap-1">
                    Linee Salone
                    <ChevronRight size={13} className="text-white/40 group-hover:translate-x-0.5 transition-transform" />
                  </h3>
                  <p className="text-[10px] text-white/50">{productsList.length} prodotti professionali</p>
                </div>
              </div>
            </div>

            {/* SEZIONE: PRODOTTI DEL SALONE IN PRIMO PIANO */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black font-serif tracking-tight text-white flex items-center gap-2">
                  <Flame size={16} className="text-[#E11D48]" />
                  <span>I Bestseller del Salone</span>
                </h3>
                <button 
                  onClick={() => setActiveTab("prodotti")}
                  className="text-[11px] font-bold text-[#FDA4AF] hover:text-white flex items-center gap-0.5 transition-colors"
                >
                  <span>Shop ({productsList.length})</span>
                  <ChevronRight size={13} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {productsList.slice(0, 2).map((prod) => (
                  <div 
                    key={prod.id}
                    onClick={() => { setSelectedProduct(prod); setReservedCount(1); }}
                    className="p-3.5 rounded-[22px] glass-panel hover:border-[#FB7185]/50 transition-all flex flex-col justify-between cursor-pointer group relative shadow-md"
                  >
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/50 mb-2.5 border border-white/5">
                      <Image 
                        src={prod.img} 
                        alt={prod.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <span className="absolute top-2 left-2 text-[8px] font-black uppercase tracking-wider bg-[#E11D48] text-white px-2 py-0.5 rounded-full shadow-md">
                        Salone
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-[#FDA4AF]/80 uppercase tracking-wider block">{prod.brand}</span>
                      <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#FDA4AF] transition-colors">{prod.name}</h4>
                      <p className="text-[10px] text-white/45">{prod.size}</p>
                      <div className="flex items-center justify-between pt-1.5 border-t border-white/5">
                        <span className="text-xs font-black text-[#FB7185]">€ {Number(prod.price).toFixed(2)}</span>
                        <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">Disponibile</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEZIONE: SERVIZI IN PRIMO PIANO */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black font-serif tracking-tight text-white flex items-center gap-2">
                  <Crown size={16} className="text-[#F5D061]" />
                  <span>Trattamenti Signature</span>
                </h3>
                <button 
                  onClick={() => setActiveTab("servizi")}
                  className="text-[11px] font-bold text-[#FDA4AF] hover:text-white flex items-center gap-0.5 transition-colors"
                >
                  <span>Listino ({INITIAL_SERVICES.length})</span>
                  <ChevronRight size={13} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {INITIAL_SERVICES.slice(0, 3).map((serv) => (
                  <div 
                    key={serv.id}
                    onClick={() => handleStartBooking(serv)}
                    className="p-3.5 rounded-2xl glass-panel hover:border-[#FB7185]/40 transition-all flex items-center justify-between cursor-pointer group active:scale-[0.99]"
                  >
                    <div className="space-y-1 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-[#FDA4AF] transition-colors">{serv.name}</span>
                        {serv.badge && (
                          <span className="text-[9px] px-1.5 py-0.2 bg-[#E11D48]/20 border border-[#FB7185]/30 text-[#FDA4AF] font-bold rounded-md">
                            {serv.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-white/55 line-clamp-1">{serv.desc}</p>
                      <div className="flex items-center gap-3 text-[10px] text-white/40">
                        <span className="flex items-center gap-1"><Clock size={11} className="text-[#FDA4AF]" /> {serv.duration}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-black text-[#FB7185]">€ {serv.price}</div>
                      <button className="mt-1 px-3 py-1 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#9F1239] text-white text-[10px] font-black uppercase shadow-sm group-hover:brightness-110 transition-all">
                        Prenota
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FIDELITY BANNER */}
            <div 
              onClick={() => setActiveTab("fidelity")}
              className="p-4 rounded-2xl glass-panel-elevated flex items-center justify-between cursor-pointer hover:border-[#FB7185]/60 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#9F1239] to-[#E11D48] text-white flex items-center justify-center shrink-0 border border-[#FDA4AF]/40 shadow-md">
                  <Award size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FDA4AF]">Tessera Fedeltà VIP</span>
                    <span className="text-[10px] text-white/50">• 7/10 Timbri</span>
                  </div>
                  <p className="text-xs font-bold text-white group-hover:text-[#FDA4AF] transition-colors">
                    Guadagna punti su ogni servizio e acquisto prodotti!
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="text-white/40 group-hover:text-[#FDA4AF] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            {/* SALON CONTACT & HOURS QUICK CARD */}
            <div className="p-4 rounded-2xl glass-panel space-y-2.5 text-xs text-white/70">
              <div className="flex items-center justify-between text-white font-bold">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#FB7185]" />
                  <span>Salone Cambia Look • Solo Donna</span>
                </div>
                <span className="text-[10px] text-white/40">Parcheggio riservato</span>
              </div>
              <p className="text-[11px] text-white/55 pl-6">
                Via Roma, 142 • Da Martedì a Sabato: 09:00 - 19:00
              </p>
              <div className="pt-1 flex gap-2 pl-6">
                <button 
                  onClick={() => triggerPushDemo("📞 Chiamata telefonica al salone Cambia Look")}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold flex items-center gap-1.5 hover:bg-white/10 hover:border-[#FB7185]/30 text-white transition-all"
                >
                  <Phone size={12} className="text-[#FB7185]" />
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-badge text-[#FDA4AF] text-[9px] font-black uppercase tracking-wider mb-2">
                <Scissors size={11} className="text-[#FB7185]" />
                <span>Menu Trattamenti Salone</span>
              </div>
              <h2 className="text-2xl font-black font-serif text-white tracking-tight">Trattamenti Donna</h2>
              <p className="text-xs text-white/50">Personalizzati sulla morfologia del tuo viso e sul benessere della chioma.</p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: "tutti", label: "Tutti i Trattamenti" },
                { id: "piega", label: "Piega & Finish" },
                { id: "taglio", label: "Taglio Sartoriale" },
                { id: "colore", label: "Colore & Balayage" },
                { id: "cura", label: "Rituali Spa & Cura" },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setServiceCategory(cat.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                    serviceCategory === cat.id 
                      ? "btn-glamour text-white shadow-lg shadow-[#E11D48]/30 font-black scale-105" 
                      : "glass-panel text-white/60 hover:text-white hover:border-[#FB7185]/40"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Services List */}
            <div className="space-y-3.5">
              {INITIAL_SERVICES
                .filter(s => serviceCategory === "tutti" || s.category === serviceCategory)
                .map(serv => (
                  <div 
                    key={serv.id}
                    className="p-4 rounded-[22px] glass-panel hover:border-[#FB7185]/50 transition-all space-y-3 relative overflow-hidden group shadow-md"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-white group-hover:text-[#FDA4AF] transition-colors">{serv.name}</h4>
                          {serv.badge && (
                            <span className="text-[9px] px-2 py-0.5 bg-[#E11D48]/20 border border-[#FB7185]/30 text-[#FDA4AF] font-bold rounded-full">
                              {serv.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-white/45 mt-1">
                          <span className="flex items-center gap-1"><Clock size={11} className="text-[#FDA4AF]" /> {serv.duration}</span>
                          <span>•</span>
                          <span className="text-[#FDA4AF]/80">Consulenza inclusa</span>
                        </div>
                      </div>
                      <span className="text-base font-black text-[#FB7185] shrink-0">€ {serv.price}</span>
                    </div>

                    <p className="text-xs text-white/65 leading-relaxed">{serv.desc}</p>

                    <div className="pt-1 flex items-center justify-between border-t border-white/5">
                      <span className="text-[10px] text-white/40">Pagamento in salone</span>
                      <button 
                        onClick={() => handleStartBooking(serv)}
                        className="py-2 px-4 rounded-xl btn-glamour text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 active:scale-95 transition-all"
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
            <div className="flex justify-between items-start gap-2">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-badge text-[#FDA4AF] text-[9px] font-black uppercase tracking-wider mb-2">
                  <ShoppingBag size={11} className="text-[#FB7185]" />
                  <span>Boutique Salone</span>
                </div>
                <h2 className="text-2xl font-black font-serif text-white tracking-tight">Linee Professionali</h2>
                <p className="text-xs text-white/50">
                  {isStaffMode ? "Pannello Titolare: aggiungi e modifica i prodotti del salone" : "Trattamenti esclusivi consigliati per la cura a casa."}
                </p>
              </div>

              {/* STAFF BUTTON: "+ AGGIUNGI PRODOTTO" */}
              {isStaffMode && (
                <button
                  onClick={() => setIsNewProductModalOpen(true)}
                  className="py-2.5 px-3.5 rounded-2xl btn-glamour text-white text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#E11D48]/30 active:scale-95 transition-all shrink-0"
                >
                  <Plus size={15} />
                  <span>Nuovo Prodotto</span>
                </button>
              )}
            </div>

            {/* Product Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: "tutti", label: "Tutti" },
                { id: "shampoo", label: "Shampoo" },
                { id: "maschere", label: "Maschere & Balsami" },
                { id: "oli", label: "Oli Preziosi" },
                { id: "styling", label: "Styling & Finish" },
                { id: "kit", label: "Kit Completi" },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setProductCategory(cat.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                    productCategory === cat.id 
                      ? "btn-glamour text-white shadow-lg shadow-[#E11D48]/30 font-black scale-105" 
                      : "glass-panel text-white/60 hover:text-white hover:border-[#FB7185]/40"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              {productsList
                .filter(p => productCategory === "tutti" || p.category === productCategory)
                .map(prod => (
                  <div 
                    key={prod.id}
                    onClick={() => { setSelectedProduct(prod); setReservedCount(1); }}
                    className="p-3.5 rounded-[22px] glass-panel hover:border-[#FB7185]/50 transition-all flex flex-col justify-between cursor-pointer group relative shadow-md"
                  >
                    {/* Delete button if in Staff Mode */}
                    {isStaffMode && (
                      <button
                        onClick={(e) => handleDeleteProduct(prod.id, e)}
                        className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-black/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shadow-lg border border-white/10"
                        title="Elimina prodotto"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}

                    <div>
                      <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/50 mb-2.5 border border-white/5">
                        <Image 
                          src={prod.img} 
                          alt={prod.name} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        {prod.bestseller && (
                          <span className="absolute top-2 left-2 text-[8px] font-black uppercase tracking-wider bg-gradient-to-r from-[#E11D48] to-[#9F1239] text-white px-2 py-0.5 rounded-full shadow-md">
                            Bestseller
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-[#FDA4AF]/80 uppercase tracking-wider block">{prod.brand}</span>
                        <h4 className="text-xs font-bold text-white line-clamp-2 group-hover:text-[#FDA4AF] transition-colors leading-snug">{prod.name}</h4>
                        <p className="text-[10px] text-white/45">{prod.size}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 mt-2.5 flex items-center justify-between">
                      <span className="text-xs font-black text-[#FB7185]">€ {Number(prod.price).toFixed(2)}</span>
                      <button className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-[#E11D48] border border-white/10 hover:border-[#FB7185] text-[#FDA4AF] hover:text-white text-[10px] font-bold uppercase transition-all">
                        {isStaffMode ? "Gestisci" : "Dettagli"}
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* INFO SHOP BANNER */}
            <div className="p-4 rounded-2xl glass-panel text-center space-y-1.5 border border-[#FB7185]/20">
              <Package size={20} className="mx-auto text-[#FB7185]" />
              <h4 className="text-xs font-bold text-white">Ritiro Comodo & Gratuito in Salone</h4>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Le clienti possono visionare e riservare i prodotti con un tocco, per trovarli pronti al salone al momento del loro appuntamento.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: FIDELITY CLUB DONNA */}
        {activeTab === "fidelity" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-badge text-[#FDA4AF] text-[9px] font-black uppercase tracking-wider mb-2">
                <Crown size={11} className="text-[#F5D061]" />
                <span>Privilege Club</span>
              </div>
              <h2 className="text-2xl font-black font-serif text-white tracking-tight">Tessera VIP Cambia Look</h2>
              <p className="text-xs text-white/50">Accumula timbri e sblocca rituali luxury gratuiti.</p>
            </div>

            {/* VIRTUAL RUBY LUXURY CARD */}
            <div className="rounded-[28px] p-6 bg-gradient-to-br from-[#9F1239] via-[#4A0617] to-[#120409] border border-[#FB7185]/40 shadow-2xl relative overflow-hidden space-y-6 animate-shimmer">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#E11D48]/30 rounded-full blur-3xl pointer-events-none" />

              <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-black/40 border border-white/20 flex items-center justify-center p-1.5 shadow-md">
                    <Image src="/logo_transparent.png" alt="Logo" width={26} height={26} className="object-contain filter invert" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#FDA4AF] flex items-center gap-1">
                      <Gem size={10} className="text-[#F5D061]" />
                      VIP Diamond Member
                    </span>
                    <h3 className="text-base font-bold text-white tracking-wide">Giulia Bianchi</h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-white/50 uppercase tracking-wider block">Codice Tessera</span>
                  <span className="text-xs font-mono font-bold text-[#F5D061]">#CL-88421</span>
                </div>
              </div>

              {/* STAMP GRID (10 TIMBRI) */}
              <div className="space-y-2.5 relative z-10">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white/90">Progresso Trattamenti</span>
                  <span className="text-[#FDA4AF]">7 di 10 timbri completati</span>
                </div>

                <div className="grid grid-cols-5 gap-2.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(step => {
                    const isDone = step <= 7;
                    const isReward = step === 10;
                    return (
                      <div 
                        key={step} 
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-center p-1 border transition-all ${
                          isDone 
                            ? "bg-gradient-to-tr from-[#9F1239] to-[#E11D48] text-white border-[#FB7185] shadow-lg shadow-[#E11D48]/40 font-black scale-100" 
                            : isReward
                              ? "bg-gradient-to-tr from-[#F5D061]/20 to-[#E11D48]/20 border-[#F5D061]/60 text-[#F5D061] animate-pulse"
                              : "bg-black/40 border-white/10 text-white/25"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 size={18} strokeWidth={2.5} />
                        ) : isReward ? (
                          <Gift size={18} className="text-[#F5D061]" />
                        ) : (
                          <span className="text-xs font-bold">{step}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BARCODE / QR SIMULATION */}
              <div className="pt-3 border-t border-white/15 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="p-1 rounded-xl bg-white/10 backdrop-blur-sm">
                    <QrCode size={26} className="text-[#FDA4AF]" />
                  </div>
                  <div className="text-[10px] text-white/70 leading-tight">
                    Mostra il QR in cassa al salone<br />per accreditare i tuoi punti
                  </div>
                </div>
                <button 
                  onClick={() => triggerPushDemo("🎁 Timbro aggiunto! Hai ora 8 timbri sulla tua tessera.")}
                  className="px-3.5 py-1.5 rounded-xl bg-black/40 hover:bg-[#E11D48] text-white border border-white/20 text-[10px] font-bold uppercase transition-all shadow"
                >
                  Simula Timbro
                </button>
              </div>
            </div>

            {/* REWARDS AVAILABLE */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Gift size={16} className="text-[#FB7185]" />
                <span>I Tuoi Vantaggi Esclusivi</span>
              </h3>

              <div className="space-y-2.5">
                <div className="p-4 rounded-2xl glass-panel flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#FDA4AF] font-bold uppercase tracking-wider">Premio Traguardo 10° Timbro</span>
                    <h4 className="text-xs font-bold text-white">Piega Glamour o Maschera Sublime Omaggio</h4>
                    <p className="text-[10px] text-white/40">Valore € 25,00 in regalo</p>
                  </div>
                  <span className="text-xs font-black text-white/50 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10">Mancano 3</span>
                </div>

                <div className="p-4 rounded-2xl glass-panel border-emerald-500/25 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Regalo Compleanno 🎂</span>
                    <h4 className="text-xs font-bold text-white">-20% su qualsiasi Servizio o Prodotto</h4>
                    <p className="text-[10px] text-white/40">Valido per tutto il mese</p>
                  </div>
                  <span className="text-xs font-black text-emerald-400 px-3 py-1.5 bg-emerald-500/10 rounded-xl border border-emerald-500/30">Attivo</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PROFILO & AREA SALONE */}
        {activeTab === "profilo" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-badge text-[#FDA4AF] text-[9px] font-black uppercase tracking-wider mb-2">
                <User size={11} className="text-[#FB7185]" />
                <span>Account & Atelier</span>
              </div>
              <h2 className="text-2xl font-black font-serif text-white tracking-tight">Profilo & Salone</h2>
              <p className="text-xs text-white/50">Appuntamenti, preferenze e gestione atelier.</p>
            </div>

            {/* USER CARD */}
            <div className="p-4 rounded-[22px] glass-panel flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#9F1239] via-[#E11D48] to-[#FDA4AF] text-white font-black text-lg flex items-center justify-center shadow-lg shadow-[#E11D48]/30">
                GB
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white">Giulia Bianchi</h3>
                <p className="text-xs text-white/50 truncate">giulia.bianchi@example.com</p>
                <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-[#FDA4AF] bg-[#E11D48]/15 border border-[#FB7185]/30 px-2 py-0.5 rounded-full">
                  <Crown size={10} className="text-[#F5D061]" />
                  Cliente VIP Salone
                </span>
              </div>
            </div>

            {/* SEZIONE SPECIALE: ACCESSO TITOLARE SALONE (Per far capire la differenza clienti/parrucchiere) */}
            <div className="p-5 rounded-[22px] glass-panel-elevated space-y-3.5 border border-[#FB7185]/40">
              <div className="flex items-center gap-2 text-white font-bold text-xs">
                <ShieldCheck size={18} className="text-[#FB7185]" />
                <span className="text-sm">Area Riservata Staff & Titolare</span>
              </div>
              <p className="text-xs text-white/65 leading-relaxed">
                Le clienti hanno un catalogo in sola consultazione. I parrucchieri possono sbloccare l'area titolare per aggiungere nuovi prodotti con foto da smartphone, prezzi e descrizioni.
              </p>
              <button
                onClick={handleToggleStaffMode}
                className="w-full py-3 px-4 rounded-xl btn-glamour text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                {isStaffMode ? <Eye size={15} /> : <Sliders size={15} />}
                <span>{isStaffMode ? "Torna a Vista Cliente" : "Sblocca Modalità Gestione Salone (PIN)"}</span>
              </button>
            </div>

            {/* PROSSIMO APPUNTAMENTO */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CalendarCheck size={16} className="text-[#FB7185]" />
                <span>Il Tuo Prossimo Appuntamento</span>
              </h3>

              <div className="p-4 rounded-[22px] glass-panel space-y-3 border border-[#FB7185]/20">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-[#FDA4AF] uppercase tracking-wider bg-[#E11D48]/20 px-2 py-0.5 rounded-md">Confermato</span>
                    <h4 className="text-sm font-bold text-white mt-1">Taglio Sartoriale & Piega Glamour</h4>
                    <p className="text-xs text-white/60">Stylist di fiducia: Valentina</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-white">Domani</span>
                    <span className="text-sm font-black text-[#FB7185] block">16:00</span>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-white/5 flex justify-between gap-2.5">
                  <button 
                    onClick={() => triggerPushDemo("📅 Appuntamento salvato sul calendario del tuo telefono!")}
                    className="flex-1 py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-[11px] font-bold hover:bg-white/10 transition-colors"
                  >
                    Aggiungi al Calendario
                  </button>
                  <button 
                    onClick={() => triggerPushDemo("💬 Messaggio WhatsApp inviato al salone")}
                    className="py-2 px-4 rounded-xl bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px] font-bold hover:bg-rose-500/20 transition-colors"
                  >
                    Modifica
                  </button>
                </div>
              </div>
            </div>

            {/* SALON SETTINGS TOGGLES */}
            <div className="p-4 rounded-2xl glass-panel space-y-3 text-xs">
              <div className="flex justify-between items-center py-1">
                <div>
                  <span className="font-bold text-white block">Promemoria Appuntamenti</span>
                  <span className="text-[11px] text-white/50">Notifica push 24h e 2h prima</span>
                </div>
                <div className="w-10 h-6 bg-[#E11D48] rounded-full p-1 flex justify-end items-center cursor-pointer shadow-sm">
                  <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                </div>
              </div>

              <div className="border-t border-white/5 pt-3 flex justify-between items-center py-1">
                <div>
                  <span className="font-bold text-white block">Offerte Speciali & Nuovi Prodotti</span>
                  <span className="text-[11px] text-white/50">Avviso quando arrivano nuovi kit in atelier</span>
                </div>
                <div className="w-10 h-6 bg-[#E11D48] rounded-full p-1 flex justify-end items-center cursor-pointer shadow-sm">
                  <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: PRENOTAZIONE SERVIZIO */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#13070C] border-t border-[#FB7185]/40 rounded-t-[32px] p-6 space-y-5 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto no-scrollbar shadow-[0_-15px_40px_rgba(0,0,0,0.8)]">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-3.5">
              <div>
                <span className="text-[10px] font-black text-[#FDA4AF] uppercase tracking-wider">Prenota Trattamento</span>
                <h3 className="text-lg font-black text-white font-serif tracking-tight">{bookingService?.name}</h3>
              </div>
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Step 1: Stylist */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/80 block">1. Scegli la tua Stylist</label>
              <div className="grid grid-cols-2 gap-2.5">
                {STYLISTS.map(stylist => (
                  <button
                    key={stylist.id}
                    onClick={() => setBookingStylist(stylist.id)}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                      bookingStylist === stylist.id 
                        ? "bg-[#E11D48]/20 border-[#FB7185] text-white shadow-md shadow-[#E11D48]/30" 
                        : "glass-panel text-white/60 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span className="text-xl">{stylist.avatar}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold truncate">{stylist.name}</div>
                      <div className="text-[9px] text-white/45 truncate">{stylist.role}</div>
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
                    className={`py-2.5 px-1.5 text-center rounded-2xl text-xs font-bold border transition-all ${
                      bookingDate === slot 
                        ? "btn-glamour text-white border-[#FB7185] shadow-md shadow-[#E11D48]/30 font-black" 
                        : "glass-panel text-white/70 hover:border-white/25 hover:text-white"
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
                <span className="text-xl font-black text-[#FB7185]">€ {bookingService?.price}</span>
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={bookingConfirmed}
                className="w-full py-4 rounded-2xl btn-glamour text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl"
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

      {/* MODAL 2: DETTAGLIO & RISERVA PRODOTTO (VISTA CLIENTE) */}
      {selectedProduct && !isStaffMode && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#13070C] border-t border-[#FB7185]/40 rounded-t-[32px] p-6 space-y-5 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto no-scrollbar shadow-[0_-15px_40px_rgba(0,0,0,0.8)]">
            
            <div className="flex justify-between items-start border-b border-white/10 pb-3.5">
              <div>
                <span className="text-[10px] font-bold text-[#FDA4AF] uppercase tracking-wider">{selectedProduct.brand}</span>
                <h3 className="text-lg font-black text-white font-serif">{selectedProduct.name}</h3>
                <span className="text-xs text-white/50">{selectedProduct.size}</span>
              </div>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Product Image Large */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/50 border border-white/10">
              <Image 
                src={selectedProduct.img} 
                alt={selectedProduct.name} 
                fill 
                className="object-cover" 
              />
            </div>

            {/* Description */}
            <div className="space-y-2.5">
              <p className="text-xs text-white/75 leading-relaxed">{selectedProduct.desc}</p>
              
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">Benefici per i tuoi capelli:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedProduct.benefits || []).map((b: string, i: number) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[10px] glass-badge text-white/90 px-3 py-1 rounded-xl">
                      <Sparkle size={10} className="text-[#FDA4AF]" />
                      <span>{b}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity Selector & Price */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3 glass-panel p-1 rounded-2xl border border-white/15">
                <button 
                  onClick={() => setReservedCount(Math.max(1, reservedCount - 1))}
                  className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95 transition-all"
                >
                  <Minus size={14} />
                </button>
                <span className="text-xs font-bold px-2">{reservedCount}</span>
                <button 
                  onClick={() => setReservedCount(reservedCount + 1)}
                  className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95 transition-all"
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-white/50 block">Totale da pagare in salone:</span>
                <span className="text-xl font-black text-[#FB7185]">€ {(selectedProduct.price * reservedCount).toFixed(2)}</span>
              </div>
            </div>

            {/* Reserve Button */}
            <button
              onClick={handleReserveProduct}
              disabled={productReserved}
              className="w-full py-4 rounded-2xl btn-glamour text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl"
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

      {/* MODAL 3: INSERIMENTO NUOVO PRODOTTO (VISTA TITOLARE / PARRUCCHIERE) */}
      {isNewProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#13070C] border-t-2 border-[#E11D48] rounded-t-[32px] p-6 space-y-4 animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto no-scrollbar shadow-[0_-15px_40px_rgba(0,0,0,0.8)]">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E11D48]/20 text-[#FB7185] flex items-center justify-center border border-[#FB7185]/30">
                  <Plus size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-serif">Aggiungi Prodotto al Salone</h3>
                  <span className="text-[10px] text-white/50">Carica foto, descrizione e prezzo per le clienti</span>
                </div>
              </div>
              <button 
                onClick={() => setIsNewProductModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3.5 text-xs">
              
              {/* Photo Upload with live preview */}
              <div>
                <label className="font-bold text-white/80 block mb-1.5">1. Foto del Prodotto</label>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-[#FB7185]/40 bg-black/50 overflow-hidden relative flex items-center justify-center shrink-0">
                    {newProdImage ? (
                      <Image src={newProdImage} alt="Preview" fill className="object-cover" />
                    ) : (
                      <Camera size={24} className="text-[#FDA4AF]/60" />
                    )}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#E11D48] text-white font-bold text-[11px] transition-colors border border-white/15">
                      <Upload size={13} />
                      <span>{newProdImage ? "Cambia Foto" : "Carica o Scatta Foto"}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload} 
                      />
                    </label>
                    <p className="text-[10px] text-white/40">Scatta con la fotocamera o scegli dalla galleria</p>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="font-bold text-white/80 block mb-1">Nome del Prodotto *</label>
                <input
                  type="text"
                  required
                  placeholder="Es. Shampoo Riparatore Nutritivo"
                  value={newProdName}
                  onChange={e => setNewProdName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white placeholder-white/30 focus:border-[#FB7185] outline-none font-medium"
                />
              </div>

              {/* Category & Format */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-white/80 block mb-1">Categoria</label>
                  <select
                    value={newProdCategory}
                    onChange={e => setNewProdCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C0A13] border border-[#FB7185]/30 text-white focus:border-[#FB7185] outline-none font-medium"
                  >
                    <option value="shampoo">Shampoo</option>
                    <option value="maschere">Maschera / Balsamo</option>
                    <option value="oli">Olio / Siero</option>
                    <option value="styling">Styling & Finish</option>
                    <option value="kit">Kit Trattamento</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-white/80 block mb-1">Formato</label>
                  <input
                    type="text"
                    placeholder="Es. 250 ml / 100 ml"
                    value={newProdSize}
                    onChange={e => setNewProdSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white placeholder-white/30 focus:border-[#FB7185] outline-none font-medium"
                  />
                </div>
              </div>

              {/* Price & Brand */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-white/80 block mb-1">Prezzo (€) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Es. 24.50"
                    value={newProdPrice}
                    onChange={e => setNewProdPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white placeholder-white/30 focus:border-[#FB7185] outline-none font-bold text-[#FB7185]"
                  />
                </div>

                <div>
                  <label className="font-bold text-white/80 block mb-1">Marchio / Linea</label>
                  <input
                    type="text"
                    placeholder="Es. Cambia Look Care"
                    value={newProdBrand}
                    onChange={e => setNewProdBrand(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white placeholder-white/30 focus:border-[#FB7185] outline-none font-medium"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="font-bold text-white/80 block mb-1">Descrizione & Consigli d'Uso</label>
                <textarea
                  rows={2}
                  placeholder="Spiega alle clienti a cosa serve e come applicarlo..."
                  value={newProdDesc}
                  onChange={e => setNewProdDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl glass-panel text-white placeholder-white/30 focus:border-[#FB7185] outline-none font-medium resize-none"
                />
              </div>

              {/* Benefits tag */}
              <div>
                <label className="font-bold text-white/80 block mb-1">Benefici Principali (separati da virgola)</label>
                <input
                  type="text"
                  placeholder="Es. Anticrespo, Lucidante, Termoprotettore"
                  value={newProdBenefits}
                  onChange={e => setNewProdBenefits(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl glass-panel text-white placeholder-white/30 focus:border-[#FB7185] outline-none font-medium"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl btn-glamour text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl"
                >
                  <Check size={16} />
                  <span>Pubblica Prodotto nell'App</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: PIN ACCESS (PER PROTEGGERE L'AREA TITOLARE) */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xs glass-panel-elevated rounded-[30px] p-6 space-y-4 shadow-2xl text-center border border-[#FB7185]/40">
            <div className="w-12 h-12 rounded-2xl bg-[#E11D48]/20 text-[#FB7185] mx-auto flex items-center justify-center border border-[#FB7185]/30">
              <Lock size={22} />
            </div>

            <div>
              <h3 className="text-base font-bold text-white font-serif">Accesso Titolare Salone</h3>
              <p className="text-[11px] text-white/50 mt-1">
                Inserisci il PIN per gestire foto, prodotti e prezzi (PIN demo: <strong className="text-white">1234</strong> o premi Sblocca)
              </p>
            </div>

            <input
              type="password"
              maxLength={4}
              placeholder="••••"
              value={pinInput}
              onChange={e => setPinInput(e.target.value)}
              className="w-32 mx-auto text-center text-xl tracking-widest px-3 py-2 rounded-xl bg-black/50 border border-[#FB7185]/40 text-white outline-none focus:border-[#FB7185]"
            />

            {pinError && (
              <p className="text-[10px] text-rose-400 font-bold">PIN non valido. Usa 1234</p>
            )}

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsPinModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors"
              >
                Annulla
              </button>
              <button
                type="button"
                onClick={handleVerifyPin}
                className="flex-1 py-2.5 rounded-xl btn-glamour text-white text-xs font-black shadow-lg shadow-[#E11D48]/30"
              >
                Sblocca
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM NAVIGATION BAR (Luxury Red Glamour Theme) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0407]/85 backdrop-blur-2xl border-t border-[#FB7185]/20 max-w-md mx-auto safe-pb shadow-[0_-10px_30px_rgba(0,0,0,0.7)]">
        <div className="grid grid-cols-5 h-16 items-center px-2">
          {[
            { id: "home", label: "Home", icon: Home },
            { id: "servizi", label: "Servizi", icon: Scissors },
            { id: "prodotti", label: "Prodotti", icon: ShoppingBag },
            { id: "fidelity", label: "Fidelity", icon: Award },
            { id: "profilo", label: "Salone", icon: User },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center justify-center gap-1 transition-all py-1 relative ${
                  isActive ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                {isActive && (
                  <span className="absolute -top-1 w-6 h-1 rounded-full bg-gradient-to-r from-[#FB7185] to-[#E11D48] shadow-[0_0_10px_#E11D48]" />
                )}
                <div className={`p-1.5 rounded-2xl transition-all ${isActive ? "bg-gradient-to-tr from-[#9F1239] to-[#E11D48] text-white shadow-lg shadow-[#E11D48]/35 scale-110" : ""}`}>
                  <Icon size={19} strokeWidth={isActive ? 2.5 : 2} />
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
