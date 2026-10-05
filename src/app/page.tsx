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
  ChevronLeft,
  Star, 
  Bell, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  X, 
  QrCode,
  Heart,
  CalendarCheck,
  Award,
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
  MessageCircle,
  Play
} from "lucide-react";

// --- LOOKBOOK SLIDES PER LO SFONDO FULLSCREEN IMMERSIVO ---
const HERO_STORIES = [
  {
    id: "balayage",
    title: "Balayage Soleil & Luce d'Autunno",
    subtitle: "Sfumature a mano libera che illuminano i tratti del viso senza stacchi",
    tag: "Trend Esclusivo",
    serviceId: "balayage-sfumature",
    bg: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1200&auto=format&fit=crop",
    price: "da 95€",
    duration: "130 min"
  },
  {
    id: "taglio",
    title: "Taglio Sartoriale & Piega Luxury",
    subtitle: "Geometrie morbide studiate per valorizzare la tua naturale bellezza",
    tag: "Consulenza Morfologica",
    serviceId: "taglio-donna-sartoriale",
    bg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop",
    price: "48€",
    duration: "55 min"
  },
  {
    id: "botox",
    title: "Rituale Botox & Rigenerazione Seta",
    subtitle: "Ristrutturazione profonda allo stelo: elimina il crespo e dona morbidezza",
    tag: "Spa Benessere",
    serviceId: "trattamento-botox-cheratina",
    bg: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1200&auto=format&fit=crop",
    price: "45€",
    duration: "45 min"
  },
  {
    id: "cambio-look",
    title: "Trasformazione Completa Cambia Look",
    subtitle: "Analisi visagista, armocromia e il nuovo stile che parla davvero di te",
    tag: "Firma Salone",
    serviceId: "taglio-cambio-look",
    bg: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=1200&auto=format&fit=crop",
    price: "58€",
    duration: "70 min"
  }
];

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
    bg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "taglio-donna-sartoriale",
    category: "taglio",
    name: "Taglio Sartoriale Donna & Piega",
    price: 48,
    duration: "55 min",
    desc: "Consulenza morfologica e visagismo personalizzato. Taglio calibrato sulle proporzioni del viso e styling finale a lunga tenuta.",
    badge: "Must Have",
    bg: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "balayage-sfumature",
    category: "colore",
    name: "Balayage Soleil & Gloss Tonificante",
    price: 95,
    duration: "130 min",
    desc: "Schiariture tridimensionali a mano libera senza barrature né effetto ricrescita, con bagno di luce Gloss tonalizzante sigillante.",
    badge: "Trend 2026",
    bg: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "colore-radice-organico",
    category: "colore",
    name: "Colore Radici Botanico No Ammoniaca",
    price: 42,
    duration: "60 min",
    desc: "Colorazione ad alta tollerabilità cutanea arricchita con oli vegetali. Copertura totale dei capelli bianchi e brillantezza estrema.",
    badge: null,
    bg: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "trattamento-botox-cheratina",
    category: "cura",
    name: "Botox Capillare & Cheratina Rimpolpante",
    price: 45,
    duration: "45 min",
    desc: "Trattamento d'urto rigenerante per capelli sfibrati o decolorati. Rimpolpa lo stelo e dona setosità immediata con durata fino a 6 settimane.",
    badge: "Risultato Immediato",
    bg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "taglio-cambio-look",
    category: "taglio",
    name: "Consulenza Completa 'Cambia Look' & Taglio",
    price: 58,
    duration: "70 min",
    desc: "Studio completo di cromocromia e forma del viso per una trasformazione radicale del tuo stile in totale sicurezza.",
    badge: "Esclusiva",
    bg: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1000&auto=format&fit=crop"
  }
];

// --- PRODOTTI VENDUTI IN SALONE CON FOTO IMMERSIVE ---
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
    img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=900&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1608248597359-0a64980654bc?q=80&w=900&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=900&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=900&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=900&auto=format&fit=crop",
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
  
  // Hero Story Slider Index
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [serviceCategory, setServiceCategory] = useState<string>("tutti");
  const [productCategory, setProductCategory] = useState<string>("tutti");
  
  // Products Dynamic State (with localStorage persistence)
  const [productsList, setProductsList] = useState<any[]>(INITIAL_PRODUCTS);

  // Selected Service for Quick Preview Sheet
  const [activeServiceSheet, setActiveServiceSheet] = useState<any | null>(null);

  // Selected Product for Fullscreen/Sheet view
  const [activeProductSheet, setActiveProductSheet] = useState<any | null>(null);
  const [reservedCount, setReservedCount] = useState<number>(1);
  const [productReserved, setProductReserved] = useState(false);

  // Staff / Salon Mode State
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

  // Push Notification Simulation
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

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

  // Auto-play lookbook stories if on Home
  useEffect(() => {
    if (activeTab !== "home") return;
    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % HERO_STORIES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [activeTab]);

  const saveProducts = (newList: any[]) => {
    setProductsList(newList);
    try {
      localStorage.setItem("cambia_look_products", JSON.stringify(newList));
    } catch (e) {
      console.error(e);
    }
  };

  const triggerPushDemo = (text: string) => {
    setNotificationText(text);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4500);
  };

  const handleToggleStaffMode = () => {
    if (isStaffMode) {
      setIsStaffMode(false);
      triggerPushDemo("👤 Modalità Cliente Attiva (Catalogo in sola consultazione)");
    } else {
      setIsPinModalOpen(true);
      setPinInput("");
      setPinError(false);
    }
  };

  const handleVerifyPin = () => {
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
      ? "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=900&auto=format&fit=crop"
      : newProdCategory === "maschere"
      ? "https://images.unsplash.com/photo-1608248597359-0a64980654bc?q=80&w=900&auto=format&fit=crop"
      : "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=900&auto=format&fit=crop";

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

    setNewProdName("");
    setNewProdPrice("");
    setNewProdDesc("");
    setNewProdBenefits("");
    setNewProdImage("");

    triggerPushDemo(`🎉 Prodotto "${newProduct.name}" aggiunto al salone!`);
  };

  const handleDeleteProduct = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Vuoi rimuovere questo prodotto dal catalogo?")) {
      const filtered = productsList.filter(p => p.id !== productId);
      saveProducts(filtered);
      triggerPushDemo("🗑️ Prodotto rimosso dal catalogo");
    }
  };

  const handleStartBooking = (service: any) => {
    setBookingService(service);
    setIsBookingOpen(true);
    setActiveServiceSheet(null);
  };

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setIsBookingOpen(false);
      setBookingConfirmed(false);
      triggerPushDemo(`✨ Appuntamento fissato per ${bookingService?.name} (${bookingDate})!`);
    }, 1200);
  };

  const handleReserveProduct = () => {
    setProductReserved(true);
    setTimeout(() => {
      setActiveProductSheet(null);
      setProductReserved(false);
      triggerPushDemo(`🛍️ Il tuo prodotto "${activeProductSheet?.name}" è riservato in salone!`);
    }, 1200);
  };

  const currentHero = HERO_STORIES[currentStoryIndex];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#070305] text-[#FFF5F7] flex flex-col relative select-none font-sans overflow-hidden">
      
      {/* SIMULATED PUSH NOTIFICATION (iOS Modern Style) */}
      {showNotification && (
        <div className="fixed top-4 left-4 right-4 z-50 animate-in slide-in-from-top duration-300">
          <div className="max-w-sm mx-auto glass-pill rounded-2xl p-3 shadow-2xl flex items-center gap-3 border border-[#FB7185]/40">
            <div className="w-9 h-9 rounded-xl bg-[#18050E] flex items-center justify-center shrink-0 border border-[#E11D48]/40">
              <Image src="/app_icon_192.png" alt="Icon" width={24} height={24} className="rounded-lg" />
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black tracking-wider uppercase text-[#FB7185]">Cambia Look</span>
                <span className="text-[9px] text-white/40">Adesso</span>
              </div>
              <p className="text-xs text-white/95 font-medium leading-tight truncate">{notificationText}</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-white/40 hover:text-white p-1">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STAFF MODE BANNER */}
      {isStaffMode && (
        <div className="bg-gradient-to-r from-[#9F1239] via-[#E11D48] to-[#FB7185] text-white px-4 py-2 text-xs font-bold flex items-center justify-between shadow-xl fixed top-0 left-0 right-0 z-50 max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} />
            <span className="text-[11px] font-black uppercase tracking-wider">Modalità Titolare (Salone)</span>
          </div>
          <button 
            onClick={handleToggleStaffMode}
            className="px-2.5 py-1 bg-black/40 hover:bg-black/60 text-[10px] uppercase font-black rounded-lg transition-colors border border-white/20"
          >
            Esci a Cliente
          </button>
        </div>
      )}

      {/* TOP FLOATING MINIMAL HEADER (Non copre le foto!) */}
      <header className={`px-5 ${isStaffMode ? "pt-12" : "pt-8"} pb-2 fixed top-0 left-0 right-0 z-30 max-w-md mx-auto flex items-center justify-between pointer-events-none`}>
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <div className="w-10 h-10 rounded-2xl glass-pill p-1.5 flex items-center justify-center border border-white/20 shadow-lg">
            <Image 
              src="/logo_transparent.png" 
              alt="Logo Cambia Look" 
              width={28} 
              height={28} 
              className="object-contain filter invert contrast-150"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#FB7185] drop-shadow">Salone Donna</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
            </div>
            <h1 className="text-lg font-black tracking-tight font-serif drop-shadow-md text-white">
              Cambia Look
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Staff Switch Lock Button */}
          <button 
            onClick={handleToggleStaffMode}
            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 transition-all shadow-lg ${
              isStaffMode 
                ? "bg-[#E11D48] text-white border border-[#FB7185]" 
                : "glass-pill text-white/80 hover:text-white"
            }`}
          >
            {isStaffMode ? <Unlock size={12} /> : <Lock size={12} />}
            <span>{isStaffMode ? "Staff" : "Titolare"}</span>
          </button>

          <button 
            onClick={() => triggerPushDemo("🔔 Giulia, ricordati il tuo trattamento domani alle 15:30!")}
            className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-white/80 hover:text-white shadow-lg relative"
          >
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E11D48] shadow-sm" />
          </button>
        </div>
      </header>

      {/* ========================================================================================= */}
      {/* TAB 1: HOME (LOOKBOOK CINEMATOGRAFICO FULLSCREEN CON FOTO VERE E INTERAZIONI A SCHERMO) */}
      {/* ========================================================================================= */}
      {activeTab === "home" && (
        <div className="relative w-full h-screen overflow-hidden flex flex-col justify-between">
          
          {/* BACKGROUND FULLSCREEN PHOTO WITH SMOOTH TRANSITION */}
          <div className="absolute inset-0 z-0">
            <Image 
              key={currentHero.id}
              src={currentHero.bg} 
              alt={currentHero.title} 
              fill 
              priority
              className="object-cover object-center transform scale-105 transition-all duration-1000 ease-out"
            />
            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 cinematic-vignette" />
          </div>

          {/* TOP STORIES PROGRESS BARS (Like Instagram / TikTok) */}
          <div className={`px-5 ${isStaffMode ? "pt-24" : "pt-20"} relative z-20 space-y-3`}>
            <div className="grid grid-cols-4 gap-1.5">
              {HERO_STORIES.map((story, idx) => (
                <div 
                  key={story.id} 
                  onClick={() => setCurrentStoryIndex(idx)}
                  className="h-1 rounded-full bg-white/20 cursor-pointer overflow-hidden backdrop-blur-sm"
                >
                  <div 
                    className={`h-full bg-gradient-to-r from-[#FB7185] to-[#E11D48] transition-all duration-300 ${
                      idx === currentStoryIndex ? "w-full shadow-[0_0_8px_#E11D48]" : idx < currentStoryIndex ? "w-full opacity-60" : "w-0"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* QUICK STORY CIRCLE AVATARS (Interattivi con tocco) */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pt-1">
              {HERO_STORIES.map((story, idx) => {
                const isSelected = idx === currentStoryIndex;
                return (
                  <button
                    key={story.id}
                    onClick={() => setCurrentStoryIndex(idx)}
                    className="flex flex-col items-center gap-1 shrink-0 group focus:outline-none"
                  >
                    <div className={`w-14 h-14 rounded-full transition-all p-0.5 ${
                      isSelected ? "story-ring-active scale-105" : "story-ring-viewed opacity-70 group-hover:opacity-100"
                    }`}>
                      <div className="relative w-full h-full rounded-full overflow-hidden border border-black/40">
                        <Image src={story.bg} alt={story.title} fill className="object-cover" />
                      </div>
                    </div>
                    <span className={`text-[10px] whitespace-nowrap ${isSelected ? "font-black text-[#FB7185]" : "font-medium text-white/70"}`}>
                      {story.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PREV / NEXT TAP ZONES (Per cambiare foto cliccando a destra o sinistra) */}
          <div className="absolute inset-y-32 inset-x-0 z-10 flex">
            <div 
              onClick={() => setCurrentStoryIndex((prev) => (prev - 1 + HERO_STORIES.length) % HERO_STORIES.length)} 
              className="w-1/3 h-full cursor-pointer" 
            />
            <div 
              onClick={() => setCurrentStoryIndex((prev) => (prev + 1) % HERO_STORIES.length)} 
              className="w-2/3 h-full cursor-pointer" 
            />
          </div>

          {/* BOTTOM FLOATING STORY INFO OVERLAY (Senza card rigide, testo elegante sulla foto) */}
          <div className="relative z-20 px-6 pb-28 space-y-4">
            
            <div className="space-y-1.5 drop-shadow-lg animate-in fade-in slide-in-from-bottom-3 duration-500 key={currentHero.id}">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-white text-[10px] font-black uppercase tracking-wider">
                <Sparkles size={12} className="text-[#F5D061]" />
                <span>{currentHero.tag}</span>
                <span className="text-white/40">•</span>
                <span className="text-[#FDA4AF]">{currentHero.price}</span>
              </div>

              <h2 className="text-3xl font-black font-serif text-white tracking-tight leading-none drop-shadow-md">
                {currentHero.title}
              </h2>

              <p className="text-xs text-white/85 leading-relaxed font-medium drop-shadow">
                {currentHero.subtitle}
              </p>
            </div>

            {/* ACTION PILLS SULLA FOTO */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button 
                onClick={() => {
                  const s = INITIAL_SERVICES.find(serv => serv.id === currentHero.serviceId) || INITIAL_SERVICES[0];
                  handleStartBooking(s);
                }}
                className="py-3.5 px-4 rounded-2xl btn-glamour text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl active:scale-95"
              >
                <Calendar size={15} />
                <span>Prenota Questo Look</span>
              </button>

              <button 
                onClick={() => setActiveTab("servizi")}
                className="py-3.5 px-4 rounded-2xl glass-pill text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/10 active:scale-95 border border-white/25 shadow-lg"
              >
                <Scissors size={15} className="text-[#FDA4AF]" />
                <span>Tutti i Servizi</span>
              </button>
            </div>

            {/* MINI FLOATING QUICK BAR (Vetrina Prodotti & Salone Info) */}
            <div className="flex items-center justify-between pt-1">
              <button 
                onClick={() => setActiveTab("prodotti")}
                className="flex items-center gap-2 glass-pill px-3 py-1.5 rounded-full text-[11px] font-bold text-white hover:text-[#FDA4AF]"
              >
                <ShoppingBag size={14} className="text-[#FB7185]" />
                <span>Shop Salone ({productsList.length} prodotti)</span>
                <ChevronRight size={12} />
              </button>

              <button 
                onClick={() => setActiveTab("fidelity")}
                className="flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-full text-[11px] font-bold text-[#F5D061]"
              >
                <Crown size={13} />
                <span>VIP Card 7/10</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================================= */}
      {/* TAB 2: SERVIZI DONNA (VISUAL IMMERSIVO CON FOTO REALI PER OGNI STILE) */}
      {/* ========================================================================================= */}
      {activeTab === "servizi" && (
        <div className="flex-1 px-5 pt-24 pb-28 space-y-5 animate-in fade-in duration-300">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[#FDA4AF] text-[9px] font-black uppercase tracking-wider mb-2">
              <Scissors size={11} className="text-[#FB7185]" />
              <span>Alta Moda Capelli • Menu Salone</span>
            </div>
            <h2 className="text-2xl font-black font-serif text-white tracking-tight">I Nostri Trattamenti</h2>
            <p className="text-xs text-white/50">Tocca un servizio per vedere la scheda completa e prenotare.</p>
          </div>

          {/* Category Filter Horizontal Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              { id: "tutti", label: "Tutti i Servizi" },
              { id: "piega", label: "Piega & Finish" },
              { id: "taglio", label: "Taglio Sartoriale" },
              { id: "colore", label: "Colore & Balayage" },
              { id: "cura", label: "Rituali Spa" },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setServiceCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  serviceCategory === cat.id 
                    ? "btn-glamour text-white shadow-lg shadow-[#E11D48]/30 font-black scale-105" 
                    : "glass-pill text-white/60 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* IMMERSIVE PHOTO LIST (Foto grandi di sfondo con testo in sovraimpressione) */}
          <div className="space-y-4">
            {INITIAL_SERVICES
              .filter(s => serviceCategory === "tutti" || s.category === serviceCategory)
              .map(serv => (
                <div 
                  key={serv.id}
                  onClick={() => setActiveServiceSheet(serv)}
                  className="relative rounded-3xl overflow-hidden cursor-pointer group active:scale-[0.98] transition-all h-44 shadow-xl border border-white/10"
                >
                  {/* Photo Background */}
                  <Image 
                    src={serv.bg} 
                    alt={serv.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Content on Image */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      {serv.badge ? (
                        <span className="text-[9px] px-2.5 py-1 bg-[#E11D48] text-white font-black uppercase tracking-wider rounded-full shadow-md">
                          {serv.badge}
                        </span>
                      ) : <span />}
                      <span className="text-lg font-black text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-2xl border border-white/20">
                        € {serv.price}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-black font-serif text-white tracking-tight leading-snug drop-shadow-md">
                        {serv.name}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-white/70">
                        <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#FB7185]" /> {serv.duration}</span>
                        <span className="text-[#FDA4AF] font-bold text-[11px] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                          Prenota ora <ChevronRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* TAB 3: PRODOTTI DEL SALONE (EDITORIAL SHOP CON FOTO GRANDI E GESTIONE STAFF) */}
      {/* ========================================================================================= */}
      {activeTab === "prodotti" && (
        <div className="flex-1 px-5 pt-24 pb-28 space-y-5 animate-in fade-in duration-300">
          <div className="flex justify-between items-start gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[#FDA4AF] text-[9px] font-black uppercase tracking-wider mb-2">
                <ShoppingBag size={11} className="text-[#FB7185]" />
                <span>Boutique Cura Capelli</span>
              </div>
              <h2 className="text-2xl font-black font-serif text-white tracking-tight">I Prodotti del Salone</h2>
              <p className="text-xs text-white/50">
                {isStaffMode ? "Modalità Staff: scatta foto col telefono e aggiungi prodotti" : "Trattamenti professionali da portare a casa."}
              </p>
            </div>

            {/* Tasto Staff "+ Nuovo Prodotto" */}
            {isStaffMode && (
              <button
                onClick={() => setIsNewProductModalOpen(true)}
                className="py-2.5 px-3.5 rounded-2xl btn-glamour text-white text-xs font-black flex items-center gap-1.5 shadow-xl active:scale-95 transition-all shrink-0"
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
              { id: "maschere", label: "Maschere" },
              { id: "oli", label: "Oli Preziosi" },
              { id: "styling", label: "Styling" },
              { id: "kit", label: "Kit Completi" },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setProductCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  productCategory === cat.id 
                    ? "btn-glamour text-white shadow-lg shadow-[#E11D48]/30 font-black scale-105" 
                    : "glass-pill text-white/60 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* EDITORIAL PRODUCTS GRID */}
          <div className="grid grid-cols-2 gap-3.5">
            {productsList
              .filter(p => productCategory === "tutti" || p.category === productCategory)
              .map(prod => (
                <div 
                  key={prod.id}
                  onClick={() => { setActiveProductSheet(prod); setReservedCount(1); }}
                  className="rounded-3xl overflow-hidden glass-pill flex flex-col justify-between cursor-pointer group relative shadow-xl border border-white/10"
                >
                  {/* Delete button if in Staff Mode */}
                  {isStaffMode && (
                    <button
                      onClick={(e) => handleDeleteProduct(prod.id, e)}
                      className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-black/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shadow-lg border border-white/20"
                      title="Elimina prodotto"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}

                  {/* Image Aspect 4:5 Immersive */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-black/60">
                    <Image 
                      src={prod.img} 
                      alt={prod.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070305] via-transparent to-transparent opacity-80" />
                    
                    {prod.bestseller && (
                      <span className="absolute top-2.5 left-2.5 text-[8px] font-black uppercase tracking-wider bg-[#E11D48] text-white px-2 py-0.5 rounded-full shadow-md">
                        Bestseller
                      </span>
                    )}

                    <div className="absolute bottom-2 left-2.5 right-2.5">
                      <span className="text-[9px] font-black text-[#FB7185] uppercase tracking-wider block">{prod.brand}</span>
                      <h4 className="text-xs font-bold text-white line-clamp-1 leading-tight">{prod.name}</h4>
                    </div>
                  </div>

                  <div className="p-3 pt-1 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-black text-white">€ {Number(prod.price).toFixed(2)}</span>
                      <span className="text-[9px] text-white/40 block">{prod.size}</span>
                    </div>
                    <button className="px-3 py-1.5 rounded-xl btn-glamour text-white text-[10px] font-bold uppercase transition-all shadow">
                      {isStaffMode ? "Modifica" : "Scopri"}
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Ritiro in salone pill */}
          <div className="p-4 rounded-3xl glass-pill text-center space-y-1">
            <Package size={20} className="mx-auto text-[#FB7185]" />
            <h4 className="text-xs font-bold text-white">Riserva online, ritira in salone</h4>
            <p className="text-[11px] text-white/50">
              Le clienti possono bloccare il prodotto preferito e trovarlo pronto alla cassa dell'atelier.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* TAB 4: FIDELITY CLUB DONNA (METALLIC VIP CARD WITH STAMPS) */}
      {/* ========================================================================================= */}
      {activeTab === "fidelity" && (
        <div className="flex-1 px-5 pt-24 pb-28 space-y-6 animate-in fade-in duration-300">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[#FDA4AF] text-[9px] font-black uppercase tracking-wider mb-2">
              <Crown size={11} className="text-[#F5D061]" />
              <span>Privilege Club</span>
            </div>
            <h2 className="text-2xl font-black font-serif text-white tracking-tight">Tessera VIP Cambia Look</h2>
            <p className="text-xs text-white/50">Accumula timbri e sblocca rituali luxury gratuiti.</p>
          </div>

          {/* LUXURY METALLIC RUBY CARD */}
          <div className="rounded-[32px] p-6 bg-gradient-to-br from-[#9F1239] via-[#4A0617] to-[#120409] border border-[#FB7185]/40 shadow-2xl relative overflow-hidden space-y-6">
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
                  Mostra in cassa al salone<br />per accreditare il timbro
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

          {/* PREMI DISPONIBILI */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Gift size={16} className="text-[#FB7185]" />
              <span>I Tuoi Vantaggi Esclusivi</span>
            </h3>

            <div className="space-y-2.5">
              <div className="p-4 rounded-3xl glass-pill flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[#FDA4AF] font-bold uppercase tracking-wider">Premio Traguardo 10° Timbro</span>
                  <h4 className="text-xs font-bold text-white">Piega Glamour o Maschera Sublime Omaggio</h4>
                  <p className="text-[10px] text-white/40">Valore € 25,00 in regalo</p>
                </div>
                <span className="text-xs font-black text-white/50 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10">Mancano 3</span>
              </div>

              <div className="p-4 rounded-3xl glass-pill border-emerald-500/25 flex items-center justify-between">
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

      {/* ========================================================================================= */}
      {/* TAB 5: PROFILO & SALONE */}
      {/* ========================================================================================= */}
      {activeTab === "profilo" && (
        <div className="flex-1 px-5 pt-24 pb-28 space-y-6 animate-in fade-in duration-300">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[#FDA4AF] text-[9px] font-black uppercase tracking-wider mb-2">
              <User size={11} className="text-[#FB7185]" />
              <span>Account & Salone</span>
            </div>
            <h2 className="text-2xl font-black font-serif text-white tracking-tight">Profilo & Salone</h2>
            <p className="text-xs text-white/50">Appuntamenti, contatti e modalità parrucchieri.</p>
          </div>

          {/* USER PROFILE */}
          <div className="p-4 rounded-3xl glass-pill flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#9F1239] via-[#E11D48] to-[#FDA4AF] text-white font-black text-lg flex items-center justify-center shadow-lg shadow-[#E11D48]/30">
              GB
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-white">Giulia Bianchi</h3>
              <p className="text-xs text-white/50 truncate">giulia.bianchi@example.com</p>
              <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-[#FDA4AF] bg-[#E11D48]/15 border border-[#FB7185]/30 px-2.5 py-0.5 rounded-full">
                <Crown size={10} className="text-[#F5D061]" />
                Cliente VIP Salone
              </span>
            </div>
          </div>

          {/* BOX TITOLARE PARRUCCHIERI */}
          <div className="p-5 rounded-3xl glass-pill space-y-3.5 border border-[#FB7185]/40">
            <div className="flex items-center gap-2 text-white font-bold text-xs">
              <ShieldCheck size={18} className="text-[#FB7185]" />
              <span className="text-sm">Area Riservata Parrucchieri (Titolare)</span>
            </div>
            <p className="text-xs text-white/65 leading-relaxed">
              Le clienti possono solo consultare i prodotti. I parrucchieri possono sbloccare l'area titolare con il PIN demo <strong>1234</strong> per scattare foto e aggiungere prodotti in tempo reale.
            </p>
            <button
              onClick={handleToggleStaffMode}
              className="w-full py-3 px-4 rounded-2xl btn-glamour text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
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

            <div className="p-4 rounded-3xl glass-pill space-y-3 border border-[#FB7185]/20">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-[#FDA4AF] uppercase tracking-wider bg-[#E11D48]/20 px-2 py-0.5 rounded-md">Confermato</span>
                  <h4 className="text-sm font-bold text-white mt-1">Taglio Sartoriale & Piega Glamour</h4>
                  <p className="text-xs text-white/60">Stylist: Valentina</p>
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
                  onClick={() => triggerPushDemo("💬 Messaggio inviato al salone")}
                  className="py-2 px-4 rounded-xl bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px] font-bold hover:bg-rose-500/20 transition-colors"
                >
                  Modifica
                </button>
              </div>
            </div>
          </div>

          {/* CONTATTO SALONE DIRETTO */}
          <div className="p-4 rounded-3xl glass-pill space-y-2 text-xs text-white/70">
            <div className="flex items-center gap-2 text-white font-bold">
              <MapPin size={15} className="text-[#FB7185]" />
              <span>Salone Cambia Look • Solo Donna</span>
            </div>
            <p className="text-[11px] text-white/50 pl-6">
              Via Roma, 142 • Da Martedì a Sabato: 09:00 - 19:00
            </p>
            <div className="pt-2 flex gap-2 pl-6">
              <button 
                onClick={() => triggerPushDemo("📞 Chiamata diretta al salone...")}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-[#E11D48] text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors"
              >
                <Phone size={12} className="text-[#FB7185]" />
                <span>Chiama Salone</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* BOTTOM SHEET INTERATTIVO: DETTAGLIO SERVIZIO */}
      {/* ========================================================================================= */}
      {activeServiceSheet && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#13070C] border-t border-[#FB7185]/40 rounded-t-[36px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[88vh] flex flex-col">
            
            <div className="relative h-56 w-full">
              <Image src={activeServiceSheet.bg} alt={activeServiceSheet.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13070C] via-black/20 to-transparent" />
              <button 
                onClick={() => setActiveServiceSheet(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 -mt-6 relative z-10 bg-[#13070C] rounded-t-[32px] flex-1 overflow-y-auto no-scrollbar">
              <div className="flex justify-between items-start">
                <div>
                  {activeServiceSheet.badge && (
                    <span className="text-[9px] px-2.5 py-0.5 bg-[#E11D48]/20 border border-[#FB7185]/30 text-[#FDA4AF] font-bold rounded-full mb-1 inline-block">
                      {activeServiceSheet.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-black font-serif text-white">{activeServiceSheet.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-white/50 mt-1">
                    <span className="flex items-center gap-1"><Clock size={12} className="text-[#FB7185]" /> {activeServiceSheet.duration}</span>
                    <span>•</span>
                    <span className="text-[#FDA4AF]">Consulenza personalizzata inclusa</span>
                  </div>
                </div>
                <span className="text-2xl font-black text-[#FB7185]">€ {activeServiceSheet.price}</span>
              </div>

              <p className="text-xs text-white/70 leading-relaxed">
                {activeServiceSheet.desc}
              </p>

              <button 
                onClick={() => handleStartBooking(activeServiceSheet)}
                className="w-full py-4 rounded-2xl btn-glamour text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl active:scale-95"
              >
                <Calendar size={16} />
                <span>Prenota Trattamento</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* BOTTOM SHEET INTERATTIVO: DETTAGLIO & RISERVA PRODOTTO */}
      {/* ========================================================================================= */}
      {activeProductSheet && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#13070C] border-t border-[#FB7185]/40 rounded-t-[36px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[88vh] flex flex-col">
            
            <div className="relative h-60 w-full">
              <Image src={activeProductSheet.img} alt={activeProductSheet.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13070C] via-black/30 to-transparent" />
              <button 
                onClick={() => setActiveProductSheet(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 -mt-6 relative z-10 bg-[#13070C] rounded-t-[32px] flex-1 overflow-y-auto no-scrollbar">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-[#FDA4AF] uppercase tracking-wider">{activeProductSheet.brand}</span>
                  <h3 className="text-xl font-black font-serif text-white">{activeProductSheet.name}</h3>
                  <span className="text-xs text-white/50">{activeProductSheet.size}</span>
                </div>
                <span className="text-2xl font-black text-[#FB7185]">€ {Number(activeProductSheet.price).toFixed(2)}</span>
              </div>

              <p className="text-xs text-white/70 leading-relaxed">
                {activeProductSheet.desc}
              </p>

              {/* Benefits */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">Benefici Principali:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(activeProductSheet.benefits || []).map((b: string, i: number) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[10px] glass-pill text-white/90 px-3 py-1 rounded-xl">
                      <Sparkle size={10} className="text-[#FDA4AF]" />
                      <span>{b}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & Reserve */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3 glass-pill p-1 rounded-2xl border border-white/15">
                  <button 
                    onClick={() => setReservedCount(Math.max(1, reservedCount - 1))}
                    className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-xs font-bold px-2">{reservedCount}</span>
                  <button 
                    onClick={() => setReservedCount(reservedCount + 1)}
                    className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-white/50 block">Totale al ritiro:</span>
                  <span className="text-xl font-black text-[#FB7185]">€ {(activeProductSheet.price * reservedCount).toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleReserveProduct}
                disabled={productReserved}
                className="w-full py-4 rounded-2xl btn-glamour text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl active:scale-95"
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
        </div>
      )}

      {/* ========================================================================================= */}
      {/* MODAL PRENOTAZIONE SERVIZIO */}
      {/* ========================================================================================= */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#13070C] border-t border-[#FB7185]/40 rounded-t-[36px] p-6 space-y-5 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-3.5">
              <div>
                <span className="text-[10px] font-black text-[#FDA4AF] uppercase tracking-wider">Prenota Trattamento</span>
                <h3 className="text-lg font-black text-white font-serif">{bookingService?.name}</h3>
              </div>
              <button onClick={() => setIsBookingOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70">
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
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                      bookingStylist === stylist.id 
                        ? "bg-[#E11D48]/25 border-[#FB7185] text-white shadow-md shadow-[#E11D48]/30" 
                        : "glass-pill text-white/60 hover:text-white"
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

            {/* Step 2: Date */}
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
                    className={`py-2.5 px-1 text-center rounded-2xl text-xs font-bold border transition-all ${
                      bookingDate === slot 
                        ? "btn-glamour text-white border-[#FB7185] font-black" 
                        : "glass-pill text-white/70 hover:text-white"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Conferma */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60 font-medium">Prezzo in salone:</span>
                <span className="text-xl font-black text-[#FB7185]">€ {bookingService?.price}</span>
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={bookingConfirmed}
                className="w-full py-4 rounded-2xl btn-glamour text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl active:scale-95"
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

      {/* ========================================================================================= */}
      {/* MODAL STAFF: AGGIUNGI NUOVO PRODOTTO DA SMARTPHONE CON FOTO */}
      {/* ========================================================================================= */}
      {isNewProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#13070C] border-t-2 border-[#E11D48] rounded-t-[36px] p-6 space-y-4 animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#E11D48]/20 text-[#FB7185] flex items-center justify-center border border-[#FB7185]/30">
                  <Plus size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-serif">Nuovo Prodotto Salone</h3>
                  <span className="text-[10px] text-white/50">Carica foto dal telefono, prezzo e descrizione</span>
                </div>
              </div>
              <button onClick={() => setIsNewProductModalOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70">
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
                      <span>{newProdImage ? "Cambia Foto" : "Scatta o Carica Foto"}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                    <p className="text-[10px] text-white/40">Usa la fotocamera del tuo telefono o la galleria</p>
                  </div>
                </div>
              </div>

              {/* Nome */}
              <div>
                <label className="font-bold text-white/80 block mb-1">Nome del Prodotto *</label>
                <input
                  type="text"
                  required
                  placeholder="Es. Shampoo Idratante Seta"
                  value={newProdName}
                  onChange={e => setNewProdName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl glass-pill text-white placeholder-white/30 outline-none font-medium"
                />
              </div>

              {/* Categoria & Formato */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-white/80 block mb-1">Categoria</label>
                  <select
                    value={newProdCategory}
                    onChange={e => setNewProdCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#1C0A13] border border-[#FB7185]/30 text-white outline-none font-medium"
                  >
                    <option value="shampoo">Shampoo</option>
                    <option value="maschere">Maschera</option>
                    <option value="oli">Olio / Siero</option>
                    <option value="styling">Styling</option>
                    <option value="kit">Kit Completo</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-white/80 block mb-1">Formato</label>
                  <input
                    type="text"
                    placeholder="Es. 250 ml"
                    value={newProdSize}
                    onChange={e => setNewProdSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl glass-pill text-white placeholder-white/30 outline-none font-medium"
                  />
                </div>
              </div>

              {/* Prezzo & Linea */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-white/80 block mb-1">Prezzo (€) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Es. 22.00"
                    value={newProdPrice}
                    onChange={e => setNewProdPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl glass-pill text-white placeholder-white/30 outline-none font-bold text-[#FB7185]"
                  />
                </div>

                <div>
                  <label className="font-bold text-white/80 block mb-1">Linea / Brand</label>
                  <input
                    type="text"
                    placeholder="Es. Cambia Look Care"
                    value={newProdBrand}
                    onChange={e => setNewProdBrand(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl glass-pill text-white placeholder-white/30 outline-none font-medium"
                  />
                </div>
              </div>

              {/* Descrizione */}
              <div>
                <label className="font-bold text-white/80 block mb-1">Descrizione & Consigli d'Uso</label>
                <textarea
                  rows={2}
                  placeholder="Spiega alle clienti a cosa serve e come si usa..."
                  value={newProdDesc}
                  onChange={e => setNewProdDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl glass-pill text-white placeholder-white/30 outline-none font-medium resize-none"
                />
              </div>

              {/* Benefici */}
              <div>
                <label className="font-bold text-white/80 block mb-1">Benefici (separati da virgola)</label>
                <input
                  type="text"
                  placeholder="Es. Anticrespo, Lucidante, Nutriente"
                  value={newProdBenefits}
                  onChange={e => setNewProdBenefits(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl glass-pill text-white placeholder-white/30 outline-none font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl btn-glamour text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl active:scale-95"
              >
                <Check size={16} />
                <span>Pubblica Subito nel Catalogo</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* MODAL PIN TITOLARE */}
      {/* ========================================================================================= */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xs glass-pill rounded-[32px] p-6 space-y-4 shadow-2xl text-center border border-[#FB7185]/40">
            <div className="w-12 h-12 rounded-2xl bg-[#E11D48]/20 text-[#FB7185] mx-auto flex items-center justify-center border border-[#FB7185]/30">
              <Lock size={22} />
            </div>

            <div>
              <h3 className="text-base font-bold text-white font-serif">Area Riservata Salone</h3>
              <p className="text-[11px] text-white/50 mt-1">
                Inserisci il PIN per scattare foto e aggiungere prodotti (PIN demo: <strong className="text-white">1234</strong> o premi Sblocca)
              </p>
            </div>

            <input
              type="password"
              maxLength={4}
              placeholder="••••"
              value={pinInput}
              onChange={e => setPinInput(e.target.value)}
              className="w-32 mx-auto text-center text-xl tracking-widest px-3 py-2 rounded-2xl bg-black/50 border border-[#FB7185]/40 text-white outline-none focus:border-[#FB7185]"
            />

            {pinError && (
              <p className="text-[10px] text-rose-400 font-bold">PIN errato. Prova 1234</p>
            )}

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsPinModalOpen(false)}
                className="flex-1 py-2.5 rounded-2xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors"
              >
                Annulla
              </button>
              <button
                type="button"
                onClick={handleVerifyPin}
                className="flex-1 py-2.5 rounded-2xl btn-glamour text-white text-xs font-black shadow-lg"
              >
                Sblocca
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* FLOATING GLASS BOTTOM NAVIGATION BAR (Non toglie spazio visivo) */}
      {/* ========================================================================================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#070305]/75 backdrop-blur-2xl border-t border-white/10 max-w-md mx-auto safe-pb shadow-[0_-10px_35px_rgba(0,0,0,0.8)]">
        <div className="grid grid-cols-5 h-16 items-center px-2">
          {[
            { id: "home", label: "Lookbook", icon: Home },
            { id: "servizi", label: "Servizi", icon: Scissors },
            { id: "prodotti", label: "Prodotti", icon: ShoppingBag },
            { id: "fidelity", label: "VIP Club", icon: Award },
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
                  <span className="absolute -top-1 w-6 h-1 rounded-full bg-gradient-to-r from-[#FB7185] to-[#E11D48] shadow-[0_0_12px_#E11D48]" />
                )}
                <div className={`p-1.5 rounded-2xl transition-all ${isActive ? "bg-gradient-to-tr from-[#9F1239] to-[#E11D48] text-white shadow-lg shadow-[#E11D48]/40 scale-110" : ""}`}>
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
