"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Sparkles, 
  ShoppingBag, 
  ShoppingCart,
  User, 
  Home, 
  Scissors, 
  ChevronRight, 
  Bell, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  X, 
  Plus, 
  Check, 
  Upload, 
  Camera, 
  Trash2, 
  Lock, 
  Unlock, 
  ShieldCheck, 
  Eye, 
  Sliders, 
  Sparkle,
  Clock,
  Compass,
  Store,
  Calendar,
  Smartphone,
  AlertCircle,
  Edit3,
  Share2,
  ExternalLink,
  KeyRound,
  MessageCircle,
  Minus,
  RotateCw
} from "lucide-react";

// --- MASTER PIN DIRETTO SVILUPPATORE (Bypassa qualsiasi blocco e permette reset) ---
const DEVELOPER_MASTER_PIN = "2860";

// --- SALONI FISICI REALI CAMBIA LOOK (DALL'APP ORIGINALE) ---
const INITIAL_SALONS = [
  {
    id: "cisterna",
    name: "Cisterna di Latina",
    address: "Corso della Repubblica, 184 • Cisterna di Latina (LT)",
    phone: "06 969 9412",
    whatsapp: "3807544502",
    hours: "Mar - Sab: 08:30 - 19:30 • Lun e Dom Chiuso",
    image: "/salone_cisterna.jpg",
    description: "Atelier spazioso ed elegante con lampadario barocco fucsia, postazioni specchio luminose e consulenza personalizzata.",
  },
  {
    id: "roma",
    name: "Roma",
    address: "Via delle Cave, 72 • Roma (Zona Colli Albani / Appia)",
    phone: "06 780 4521",
    whatsapp: "3807544502",
    hours: "Mar - Sab: 09:00 - 19:30 • Lun e Dom Chiuso",
    image: "/salone_roma.jpg",
    description: "Salone moderno nel cuore di Roma con specchiere barocche nere, team specializzato in biondi, balayage e cambi look donna.",
  }
];

export interface CartItem {
  product: any;
  quantity: number;
}

// --- LISTINO SERVIZI VETRINA (CON FOTO DEDICATA PER OGNI SERVIZIO) ---
const INITIAL_SERVICES = [
  {
    id: "balayage-soleil",
    category: "Colore & Effetti Luce",
    name: "Balayage Soleil & Gloss Tonificante",
    price: "da € 95",
    desc: "Schiariture tridimensionali a mano libera senza barrature né effetto ricrescita, con bagno di luce Gloss tonalizzante.",
    duration: "120 min",
    tag: "Il Nostro Trend",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=900&auto=format&fit=crop"
  },
  {
    id: "taglio-sartoriale",
    category: "Taglio & Morphing",
    name: "Taglio Sartoriale Donna & Piega Glamour",
    price: "€ 48",
    desc: "Studio della forma del viso e visagismo personalizzato. Taglio di precisione e finish con onde o liscio specchio.",
    duration: "55 min",
    tag: "Signature",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop"
  },
  {
    id: "botox-seta",
    category: "Trattamenti Benessere",
    name: "Botox Capillare & Cheratina Rimpolpante",
    price: "€ 45",
    desc: "Trattamento d'urto rigenerante per capelli sfibrati o decolorati. Rimpolpa lo stelo e dona setosità immediata fino a 6 settimane.",
    duration: "45 min",
    tag: "Rigenerante",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=900&auto=format&fit=crop"
  },
  {
    id: "colore-botanico",
    category: "Colore & Effetti Luce",
    name: "Colore Radici Botanico No Ammoniaca",
    price: "€ 42",
    desc: "Colorazione delicata ad alta tollerabilità arricchita con oli vegetali. Copertura totale e riflessi naturali brillanti.",
    duration: "60 min",
    tag: "Organico",
    image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=900&auto=format&fit=crop"
  },
  {
    id: "cambia-look-total",
    category: "Taglio & Morphing",
    name: "Consulenza Completa 'Cambia Look'",
    price: "€ 58",
    desc: "Studio completo di armocromia, proporzioni del viso e texture per una trasformazione radicale del tuo stile in totale armonia.",
    duration: "75 min",
    tag: "Firma Salone",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=900&auto=format&fit=crop"
  },
  {
    id: "piega-finish",
    category: "Piega & Styling",
    name: "Piega Glamour & Finish Onde Morbide",
    price: "€ 25",
    desc: "Bagno capillare nutriente, massaggio cutaneo distensivo, maschera intensiva e styling finale a scelta.",
    duration: "40 min",
    tag: "Sempre Perfetta",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=900&auto=format&fit=crop"
  },
  {
    id: "gloss-specchio",
    category: "Colore & Effetti Luce",
    name: "Gloss Luce Specchio & Tonalizzante",
    price: "€ 35",
    desc: "Bagno di pura luce a pH acido che sigilla le cuticole ed esalta la brillantezza del colore o delle schiariture.",
    duration: "35 min",
    tag: "Lucentezza",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=900&auto=format&fit=crop"
  },
  {
    id: "trattamento-ricostruzione",
    category: "Trattamenti Benessere",
    name: "Ricostruzione Profonda Effetto Seta",
    price: "€ 40",
    desc: "Protocollo intensivo aminoacidico che ricostruisce i legami interni del capello danneggiato da calore e tinte.",
    duration: "50 min",
    tag: "Intensivo",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=900&auto=format&fit=crop"
  }
];

// --- PRODOTTI VENDUTI IN SALONE (VETRINA) ---
const INITIAL_PRODUCTS = [
  {
    id: "shampoo-cheratina",
    category: "shampoo",
    name: "Shampoo Riparatore Sublime Cheratina",
    brand: "Cambia Look Care",
    price: 22.00,
    size: "250 ml",
    desc: "Bagno rigenerante formulato con cheratina idrolizzata e olio di argan. Deterge delicatamente rinforzando le fibre danneggiate.",
    benefits: ["Rinforza le fibre capillari", "Senza solfati aggressivi", "Luminosità estrema"],
    img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=900&auto=format&fit=crop",
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
  },
  {
    id: "kit-mantenimento-biondo",
    category: "kit",
    name: "Kit Salva-Biondo Antigiallo & Gloss Home",
    brand: "Cambia Look Colors",
    price: 45.00,
    size: "Shampoo 250ml + Mask 200ml",
    desc: "Il rituale completo a casa per mantenere il tuo biondo o balayage privo di riflessi arancio/gialli e brillante come appena uscita dal salone.",
    benefits: ["Neutralizza il giallo", "Prolunga il balayage", "Massima idratazione"],
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop",
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
  }
];

// Hook riutilizzabile per lo swipe fluido verso il basso a 120fps su tutte le schede e popup
function useSwipeDown(onClose: () => void) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const currentTranslateY = useRef<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAtTopRef = useRef<boolean>(true);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    currentTranslateY.current = 0;
    if (sheetRef.current) {
      sheetRef.current.style.transition = "none";
      sheetRef.current.style.willChange = "transform";
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;
    if (diff > 0 && sheetRef.current) {
      currentTranslateY.current = diff;
      sheetRef.current.style.transform = `translate3d(0, ${diff}px, 0)`;
    }
  };

  const handleTouchEnd = () => {
    if (!sheetRef.current) return;
    sheetRef.current.style.willChange = "auto";
    const currentY = currentTranslateY.current;

    if (currentY > 80) {
      // Scorrimento verso il basso completato: animazione di uscita fluida
      sheetRef.current.style.transition = "transform 0.22s cubic-bezier(0.25, 1, 0.5, 1)";
      sheetRef.current.style.transform = "translate3d(0, 100%, 0)";
      setTimeout(() => {
        onClose();
        if (sheetRef.current) {
          sheetRef.current.style.transform = "";
          sheetRef.current.style.transition = "";
        }
      }, 200);
    } else if (currentY > 0) {
      // Rilascio parziale: rimbalzo elastico in posizione iniziale
      sheetRef.current.style.transition = "transform 0.22s cubic-bezier(0.25, 1, 0.5, 1)";
      sheetRef.current.style.transform = "translate3d(0, 0, 0)";
      setTimeout(() => {
        if (sheetRef.current && currentTranslateY.current === 0) {
          sheetRef.current.style.transition = "";
          sheetRef.current.style.transform = "";
        }
      }, 220);
    }
    currentTranslateY.current = 0;
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    isAtTopRef.current = e.currentTarget.scrollTop <= 5;
  };

  const handleContentTouchStart = (e: React.TouchEvent) => {
    if (scrollRef.current && scrollRef.current.scrollTop > 5) {
      isAtTopRef.current = false;
      return;
    }
    isAtTopRef.current = true;
    touchStartY.current = e.touches[0].clientY;
    currentTranslateY.current = 0;
    if (sheetRef.current) {
      sheetRef.current.style.transition = "none";
      sheetRef.current.style.willChange = "transform";
    }
  };

  const handleContentTouchMove = (e: React.TouchEvent) => {
    if (!isAtTopRef.current) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;
    if (diff > 12 && sheetRef.current) {
      const activeDiff = diff - 12;
      currentTranslateY.current = activeDiff;
      sheetRef.current.style.transform = `translate3d(0, ${activeDiff}px, 0)`;
    }
  };

  return {
    sheetRef,
    scrollRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleScroll,
    handleContentTouchStart,
    handleContentTouchMove,
  };
}

export default function CambiaLookApp() {
  const [activeTab, setActiveTab] = useState<"saloni" | "servizi" | "prodotti" | "info">("saloni");
  
  // Dynamic Salons and Services
  const [salonsList, setSalonsList] = useState<any[]>(INITIAL_SALONS);
  const [servicesList, setServicesList] = useState<any[]>(INITIAL_SERVICES);

  // Selected Salon for direct contacts
  const [selectedSalon, setSelectedSalon] = useState<any | null>(null);

  // Selected Service for showcase detail popup
  const [selectedService, setSelectedService] = useState<any | null>(null);

  // Selected Product for showcase detail popup (only viewing, no bookings)
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Products Dynamic State
  const [productsList, setProductsList] = useState<any[]>(INITIAL_PRODUCTS);
  const [productCategory, setProductCategory] = useState<string>("tutti");

  // Staff / Salon Security State
  const [isStaffMode, setIsStaffMode] = useState<boolean>(false);
  const [isDeveloperMode, setIsDeveloperMode] = useState<boolean>(false);
  const [salonPin, setSalonPin] = useState<string>("1234");
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [pinAttempts, setPinAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);

  // Change Salon PIN Modal State
  const [isChangePinModalOpen, setIsChangePinModalOpen] = useState(false);
  const [oldPinInput, setOldPinInput] = useState("");
  const [newPinInput, setNewPinInput] = useState("");
  const [confirmPinInput, setConfirmPinInput] = useState("");
  const [changePinError, setChangePinError] = useState("");

  // Edit Salon Modal State
  const [isEditSalonModalOpen, setIsEditSalonModalOpen] = useState(false);
  const [editingSalonId, setEditingSalonId] = useState<string | null>(null);
  const [salonFormName, setSalonFormName] = useState("");
  const [salonFormAddress, setSalonFormAddress] = useState("");
  const [salonFormPhone, setSalonFormPhone] = useState("");
  const [salonFormWhatsapp, setSalonFormWhatsapp] = useState("");
  const [salonFormHours, setSalonFormHours] = useState("");
  const [salonFormDescription, setSalonFormDescription] = useState("");
  const [salonFormImage, setSalonFormImage] = useState("");

  // Cart / Shopping Bag State (Ordina & Ritira in Salone via WhatsApp)
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartPickupSalon, setCartPickupSalon] = useState<"cisterna" | "roma">("cisterna");
  const [cartClientName, setCartClientName] = useState("");
  const [cartPickupTime, setCartPickupTime] = useState("Oggi / Domani");
  const [cartNotes, setCartNotes] = useState("");
  const [prodDetailQty, setProdDetailQty] = useState<number>(1);

  // Swipe-to-dismiss hooks per Carrello, Trattamenti, Prodotti e Saloni
  const cartSwipe = useSwipeDown(() => setIsCartOpen(false));
  const serviceSwipe = useSwipeDown(() => setSelectedService(null));
  const productSwipe = useSwipeDown(() => setSelectedProduct(null));
  const salonSwipe = useSwipeDown(() => setSelectedSalon(null));

  // New / Edit Service Modal State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceFormName, setServiceFormName] = useState("");
  const [serviceFormCategory, setServiceFormCategory] = useState("Colore & Effetti Luce");
  const [serviceFormPrice, setServiceFormPrice] = useState("");
  const [serviceFormDuration, setServiceFormDuration] = useState("");
  const [serviceFormTag, setServiceFormTag] = useState("");
  const [serviceFormDesc, setServiceFormDesc] = useState("");
  const [serviceFormImage, setServiceFormImage] = useState("");

  // New / Edit Product Modal Form State
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [newProdName, setNewProdName] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("shampoo");
  const [newProdBrand, setNewProdBrand] = useState("Cambia Look Care");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdSize, setNewProdSize] = useState("250 ml");
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdBenefits, setNewProdBenefits] = useState("");
  const [newProdImage, setNewProdImage] = useState<string>("");

  // Notification simulation
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  // Pull to refresh state & direct DOM refs (Zero-lag, zero-jitter 120fps)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let touchStartY = 0;
    let isPulling = false;
    let pullDistance = 0;

    const onTouchStart = (e: TouchEvent) => {
      // Don't pull if modal is open or already refreshing
      if (
        document.querySelector(".fixed.inset-0") || 
        isRefreshing
      ) {
        isPulling = false;
        return;
      }
      if (window.scrollY <= 0) {
        touchStartY = e.touches[0].clientY;
        pullDistance = 0;
        isPulling = true;
      } else {
        isPulling = false;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isPulling || isRefreshing) return;
      const currentY = e.touches[0].clientY;
      const diff = currentY - touchStartY;

      if (diff > 0 && window.scrollY <= 0) {
        // Prevent native iOS rubber-banding fight
        if (e.cancelable) {
          e.preventDefault();
        }
        pullDistance = Math.min(diff * 0.45, 80);

        if (indicatorRef.current && iconRef.current) {
          indicatorRef.current.style.transition = "none";
          indicatorRef.current.style.opacity = pullDistance > 10 ? "1" : "0";
          indicatorRef.current.style.transform = `translate3d(0, ${pullDistance}px, 0)`;
          iconRef.current.style.transform = `rotate(${pullDistance * 5}deg)`;
        }
      } else {
        pullDistance = 0;
        if (indicatorRef.current) {
          indicatorRef.current.style.opacity = "0";
          indicatorRef.current.style.transform = "translate3d(0, -60px, 0)";
        }
      }
    };

    const onTouchEnd = () => {
      if (!isPulling || isRefreshing) return;
      isPulling = false;

      if (pullDistance >= 48) {
        setIsRefreshing(true);
        if (indicatorRef.current) {
          indicatorRef.current.style.transition = "all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)";
          indicatorRef.current.style.transform = "translate3d(0, 48px, 0)";
          indicatorRef.current.style.opacity = "1";
        }
        try {
          if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(25);
          }
        } catch {}
        setTimeout(() => {
          window.location.reload();
        }, 400);
      } else {
        pullDistance = 0;
        if (indicatorRef.current) {
          indicatorRef.current.style.transition = "all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)";
          indicatorRef.current.style.transform = "translate3d(0, -60px, 0)";
          indicatorRef.current.style.opacity = "0";
        }
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isRefreshing]);

  useEffect(() => {
    try {
      const savedPin = localStorage.getItem("cambia_look_salon_pin");
      if (savedPin) setSalonPin(savedPin);

      const savedSalons = localStorage.getItem("cambia_look_salons");
      if (savedSalons) {
        const parsed = JSON.parse(savedSalons);
        const updated = parsed.map((s: any) => ({
          ...s,
          whatsapp: s.whatsapp === "069699412" || s.whatsapp === "067804521" || !s.whatsapp ? "3807544502" : s.whatsapp
        }));
        setSalonsList(updated);
      }

      const savedServices = localStorage.getItem("cambia_look_services");
      if (savedServices) setServicesList(JSON.parse(savedServices));

      const savedProducts = localStorage.getItem("cambia_look_products");
      if (savedProducts) {
        setProductsList(JSON.parse(savedProducts));
      }

      const savedCart = localStorage.getItem("cambia_look_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Blocco rigoroso dello scroll della pagina di sfondo quando un modal è aperto
  const isAnyModalOpen = Boolean(
    selectedSalon ||
    selectedService ||
    selectedProduct ||
    isCartOpen ||
    isChangePinModalOpen ||
    isPinModalOpen ||
    isEditSalonModalOpen ||
    isServiceModalOpen ||
    isNewProductModalOpen
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isAnyModalOpen) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    }
  }, [isAnyModalOpen]);

  const saveProducts = (newList: any[]) => {
    setProductsList(newList);
    try {
      localStorage.setItem("cambia_look_products", JSON.stringify(newList));
    } catch (e) {
      console.error(e);
    }
  };

  const saveSalons = (newSalons: any[]) => {
    setSalonsList(newSalons);
    try {
      localStorage.setItem("cambia_look_salons", JSON.stringify(newSalons));
    } catch (e) {
      console.error(e);
    }
  };

  const saveServices = (newServices: any[]) => {
    setServicesList(newServices);
    try {
      localStorage.setItem("cambia_look_services", JSON.stringify(newServices));
    } catch (e) {
      console.error(e);
    }
  };

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem("cambia_look_cart", JSON.stringify(newCart));
    } catch (e) {
      console.error(e);
    }
  };

  const addToCart = (product: any, qty: number = 1) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    let newCart: CartItem[];
    if (existingIndex >= 0) {
      newCart = cart.map((item, idx) => 
        idx === existingIndex ? { ...item, quantity: item.quantity + qty } : item
      );
    } else {
      newCart = [...cart, { product, quantity: qty }];
    }
    saveCart(newCart);
    triggerPushDemo(`🛒 Aggiunto al carrello: ${product.name} (x${qty})`);
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    const updated = cart.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    }).filter(item => item.quantity > 0);
    saveCart(updated);
  };

  const removeFromCart = (productId: string) => {
    const updated = cart.filter(item => item.product.id !== productId);
    saveCart(updated);
    triggerPushDemo("🗑️ Prodotto rimosso dal carrello");
  };

  const clearCart = () => {
    saveCart([]);
    triggerPushDemo("Carrello svuotato");
  };

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalPrice = cart.reduce((acc, item) => acc + (Number(item.product.price) || 0) * item.quantity, 0);

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!cartClientName.trim()) {
      alert("Inserisci il tuo nome e cognome per intestare l'ordine.");
      return;
    }

    const selectedSalonData = salonsList.find(s => s.id === cartPickupSalon) || salonsList[0];
    const rawWa = (selectedSalonData.whatsapp || selectedSalonData.phone || "").replace(/\D/g, "");
    const waPhone = rawWa.startsWith("39") ? rawWa : `39${rawWa}`;

    const itemsText = cart.map((item, i) => 
      `${i + 1}) *${item.product.name}* (${item.product.size || "Standard"})\n   Quantità: ${item.quantity} pz • Prezzo: € ${(Number(item.product.price) * item.quantity).toFixed(2)}`
    ).join("\n\n");

    const message = 
`👋 *CIAO CAMBIA LOOK!*
Vorrei ordinare i seguenti prodotti dal *Carrello* dell'app per il *Ritiro in Salone*:

🛒 *PRODOTTI NEL CARRELLO:*
${itemsText}

━━━━━━━━━━━━━━━━━━━━
💰 *TOTALE ORDINE:* € ${cartTotalPrice.toFixed(2)}
📍 *RITIRO IN SALONE:* ${selectedSalonData.name} (${selectedSalonData.address})
👤 *CLIENTE:* ${cartClientName.trim()}
🕒 *QUANDO PASSO:* ${cartPickupTime || "Da concordare"}
${cartNotes.trim() ? `📝 *NOTE CLIENTE:* ${cartNotes.trim()}\n` : ""}━━━━━━━━━━━━━━━━━━━━

Fatemi sapere quando i prodotti sono pronti per il ritiro! Pagamento direttamente in salone. Grazie mille ✨`;

    const waUrl = `https://api.whatsapp.com/send?phone=${waPhone}&text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");

    triggerPushDemo("💬 Apertura WhatsApp! Tocca invia per confermare l'ordine al salone.");
    setIsCartOpen(false);
  };

  const triggerPushDemo = (text: string) => {
    setNotificationText(text);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4500);
  };

  const handleToggleStaffMode = () => {
    if (isStaffMode) {
      setIsStaffMode(false);
      setIsDeveloperMode(false);
      triggerPushDemo("👤 Modalità Cliente Attiva (Vetrina in sola consultazione)");
    } else {
      setIsPinModalOpen(true);
      setPinInput("");
      setPinError(false);
    }
  };

  const handleVerifyPin = () => {
    // DEVELOPER MASTER PIN (2860) ALWAYS bypasses any lockout:
    if (pinInput === DEVELOPER_MASTER_PIN) {
      setIsStaffMode(true);
      setIsDeveloperMode(true);
      setIsPinModalOpen(false);
      setPinInput("");
      setPinError(false);
      setPinAttempts(0);
      setLockoutUntil(null);
      triggerPushDemo("💻 Accesso Sviluppatore / Master autorizzato (PIN 2860)");
      return;
    }

    // Check lockout for regular attempts:
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const waitSec = Math.ceil((lockoutUntil - Date.now()) / 1000);
      triggerPushDemo(`⏳ Accesso temporaneamente bloccato. Attendi ancora ${waitSec}s.`);
      return;
    }

    if (pinInput === salonPin) {
      setIsStaffMode(true);
      setIsDeveloperMode(false);
      setIsPinModalOpen(false);
      setPinInput("");
      setPinError(false);
      setPinAttempts(0);
      setLockoutUntil(null);
      triggerPushDemo("👑 Accesso Area Salone autorizzato!");
    } else {
      setPinError(true);
      const newAttempts = pinAttempts + 1;
      setPinAttempts(newAttempts);
      if (newAttempts >= 3) {
        setLockoutUntil(Date.now() + 30000);
        triggerPushDemo("⚠️ 3 tentativi errati. Accesso bloccato per 30 secondi.");
      }
    }
  };

  const handleChangeSalonPin = (e: React.FormEvent) => {
    e.preventDefault();
    setChangePinError("");

    if (!isDeveloperMode) {
      if (oldPinInput !== salonPin && oldPinInput !== DEVELOPER_MASTER_PIN) {
        setChangePinError("Il PIN attuale inserito non è corretto");
        return;
      }
    }

    if (!newPinInput || newPinInput.length < 4) {
      setChangePinError("Il nuovo PIN deve contenere almeno 4 cifre");
      return;
    }

    if (newPinInput !== confirmPinInput) {
      setChangePinError("I due nuovi PIN non coincidono");
      return;
    }

    setSalonPin(newPinInput);
    try {
      localStorage.setItem("cambia_look_salon_pin", newPinInput);
    } catch (err) {
      console.error(err);
    }

    setIsChangePinModalOpen(false);
    setOldPinInput("");
    setNewPinInput("");
    setConfirmPinInput("");
    triggerPushDemo(`🔐 Nuovo PIN Salone salvato con successo!`);
  };

  const handleResetSalonPin = () => {
    if (confirm("Vuoi reimpostare il PIN del salone al valore predefinito 1234?")) {
      setSalonPin("1234");
      try {
        localStorage.setItem("cambia_look_salon_pin", "1234");
      } catch (err) {
        console.error(err);
      }
      setIsChangePinModalOpen(false);
      triggerPushDemo("🔄 PIN Salone ripristinato a 1234");
    }
  };

  // --- GESTIONE SALONI ---
  const handleOpenEditSalon = (salon: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingSalonId(salon.id);
    setSalonFormName(salon.name || "");
    setSalonFormAddress(salon.address || "");
    setSalonFormPhone(salon.phone || "");
    setSalonFormWhatsapp(salon.whatsapp || salon.phone || "");
    setSalonFormHours(salon.hours || "");
    setSalonFormDescription(salon.description || "");
    setSalonFormImage(salon.image || "");
    setIsEditSalonModalOpen(true);
  };

  const handleSalonImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSalonFormImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSalon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSalonId) return;

    const updated = salonsList.map(s => {
      if (s.id === editingSalonId) {
        return {
          ...s,
          name: salonFormName,
          address: salonFormAddress,
          phone: salonFormPhone,
          whatsapp: salonFormWhatsapp,
          hours: salonFormHours,
          description: salonFormDescription,
          image: salonFormImage || s.image,
        };
      }
      return s;
    });

    saveSalons(updated);
    if (selectedSalon && selectedSalon.id === editingSalonId) {
      setSelectedSalon(updated.find(s => s.id === editingSalonId));
    }
    setIsEditSalonModalOpen(false);
    triggerPushDemo(`📍 Dati salone "${salonFormName}" salvati!`);
  };

  // --- GESTIONE SERVIZI TRATTAMENTI ---
  const handleOpenNewService = () => {
    setEditingServiceId(null);
    setServiceFormName("");
    setServiceFormCategory("Colore & Effetti Luce");
    setServiceFormPrice("da € 50");
    setServiceFormDuration("");
    setServiceFormTag("Novità");
    setServiceFormDesc("");
    setServiceFormImage("");
    setIsServiceModalOpen(true);
  };

  const handleOpenEditService = (serv: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingServiceId(serv.id);
    setServiceFormName(serv.name || "");
    setServiceFormCategory(serv.category || "Colore & Effetti Luce");
    setServiceFormPrice(serv.price || "");
    setServiceFormDuration(serv.duration || "");
    setServiceFormTag(serv.tag || "");
    setServiceFormDesc(serv.desc || "");
    setServiceFormImage(serv.image || "");
    setIsServiceModalOpen(true);
  };

  const handleServiceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setServiceFormImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceFormName || !serviceFormPrice) return;

    const fallbackImg = "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=900&auto=format&fit=crop";

    if (editingServiceId) {
      const updated = servicesList.map(s => {
        if (s.id === editingServiceId) {
          return {
            ...s,
            name: serviceFormName,
            category: serviceFormCategory,
            price: serviceFormPrice,
            duration: serviceFormDuration,
            tag: serviceFormTag,
            desc: serviceFormDesc,
            image: serviceFormImage || s.image || fallbackImg,
          };
        }
        return s;
      });

      saveServices(updated);
      if (selectedService && selectedService.id === editingServiceId) {
        setSelectedService(updated.find(s => s.id === editingServiceId));
      }
      triggerPushDemo(`✂️ Trattamento "${serviceFormName}" aggiornato!`);
    } else {
      const newService = {
        id: `serv-${Date.now()}`,
        name: serviceFormName,
        category: serviceFormCategory,
        price: serviceFormPrice,
        duration: serviceFormDuration,
        tag: serviceFormTag,
        desc: serviceFormDesc,
        image: serviceFormImage || fallbackImg,
      };

      saveServices([newService, ...servicesList]);
      triggerPushDemo(`🎉 Nuovo trattamento "${newService.name}" aggiunto al listino!`);
    }

    setIsServiceModalOpen(false);
    setEditingServiceId(null);
  };

  const handleDeleteService = (serviceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Vuoi eliminare questo servizio dal listino?")) {
      const filtered = servicesList.filter(s => s.id !== serviceId);
      saveServices(filtered);
      if (selectedService && selectedService.id === serviceId) {
        setSelectedService(null);
      }
      triggerPushDemo("🗑️ Trattamento rimosso dal listino");
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

  const handleOpenNewProduct = () => {
    setEditingProductId(null);
    setNewProdName("");
    setNewProdCategory("shampoo");
    setNewProdBrand("Cambia Look Care");
    setNewProdPrice("");
    setNewProdSize("250 ml");
    setNewProdDesc("");
    setNewProdBenefits("");
    setNewProdImage("");
    setIsNewProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: any) => {
    setEditingProductId(prod.id);
    setNewProdName(prod.name || "");
    setNewProdCategory(prod.category || "shampoo");
    setNewProdBrand(prod.brand || "Cambia Look Care");
    setNewProdPrice(prod.price !== undefined ? String(prod.price) : "");
    setNewProdSize(prod.size || "250 ml");
    setNewProdDesc(prod.desc || "");
    setNewProdBenefits(Array.isArray(prod.benefits) ? prod.benefits.join(", ") : (prod.benefits || ""));
    setNewProdImage(prod.img || "");
    setIsNewProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsNewProductModalOpen(false);
    setEditingProductId(null);
    setNewProdName("");
    setNewProdPrice("");
    setNewProdDesc("");
    setNewProdBenefits("");
    setNewProdImage("");
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    const parsedPrice = parseFloat(newProdPrice.replace(",", ".")) || 0;
    const benefitsList = newProdBenefits
      ? newProdBenefits.split(",").map(b => b.trim()).filter(Boolean)
      : ["Formula professionale salone", "Consigliato dalle nostre stylist"];

    const fallbackImg = newProdCategory === "shampoo" 
      ? "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=900&auto=format&fit=crop"
      : newProdCategory === "maschere"
      ? "https://images.unsplash.com/photo-1608248597359-0a64980654bc?q=80&w=900&auto=format&fit=crop"
      : "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=900&auto=format&fit=crop";

    if (editingProductId) {
      const updatedList = productsList.map(p => {
        if (p.id === editingProductId) {
          return {
            ...p,
            category: newProdCategory,
            name: newProdName,
            brand: newProdBrand || "Cambia Look Care",
            price: parsedPrice,
            size: newProdSize || "Formato Salone",
            desc: newProdDesc || "Prodotto esclusivo disponibile nei saloni Cambia Look di Roma e Cisterna di Latina.",
            benefits: benefitsList,
            img: newProdImage || p.img || fallbackImg,
          };
        }
        return p;
      });

      saveProducts(updatedList);
      if (selectedProduct && selectedProduct.id === editingProductId) {
        setSelectedProduct(updatedList.find(p => p.id === editingProductId));
      }
      triggerPushDemo(`✨ Prodotto "${newProdName}" aggiornato con successo!`);
    } else {
      const newProduct = {
        id: `prod-${Date.now()}`,
        category: newProdCategory,
        name: newProdName,
        brand: newProdBrand || "Cambia Look Care",
        price: parsedPrice,
        size: newProdSize || "Formato Salone",
        desc: newProdDesc || "Prodotto esclusivo disponibile nei saloni Cambia Look di Roma e Cisterna di Latina.",
        benefits: benefitsList,
        img: newProdImage || fallbackImg,
      };

      saveProducts([newProduct, ...productsList]);
      triggerPushDemo(`🎉 Prodotto "${newProduct.name}" pubblicato in vetrina!`);
    }

    handleCloseProductModal();
  };

  const handleDeleteProduct = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Vuoi rimuovere questo prodotto dalla vetrina?")) {
      const filtered = productsList.filter(p => p.id !== productId);
      saveProducts(filtered);
      triggerPushDemo("🗑️ Prodotto rimosso dalla vetrina");
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#D11936] text-white flex flex-col relative select-none font-sans overflow-x-hidden pb-36 shadow-2xl">
      
      {/* PULL TO REFRESH CIRCULAR ICON (DIRECT GPU TRANSFORM, ZERO JITTER) */}
      <div 
        ref={indicatorRef}
        className="fixed left-0 right-0 z-50 flex items-center justify-center pointer-events-none opacity-0"
        style={{ 
          top: "max(calc(env(safe-area-inset-top, 0px) + 12px), 1.25rem)",
          transform: "translate3d(0, -60px, 0)",
          willChange: "transform, opacity"
        }}
      >
        <div className="w-11 h-11 rounded-full bg-black/90 backdrop-blur-xl border border-[#E8D3A2]/60 shadow-[0_6px_20px_rgba(0,0,0,0.45)] flex items-center justify-center">
          <div ref={iconRef} className="flex items-center justify-center">
            <RotateCw 
              size={20} 
              className={`text-[#E8D3A2] ${isRefreshing ? "animate-spin" : ""}`}
            />
          </div>
        </div>
      </div>

      {/* SIMULATED PUSH NOTIFICATION */}
      {showNotification && (
        <div 
          style={{ top: "max(calc(env(safe-area-inset-top, 0px) + 12px), 1.25rem)" }}
          className="fixed left-4 right-4 z-50 animate-in slide-in-from-top duration-300"
        >
          <div className="max-w-sm mx-auto bg-black/85 backdrop-blur-xl rounded-2xl p-3.5 shadow-2xl flex items-center gap-3 border border-[#E8D3A2]/40">
            <div className="w-9 h-9 rounded-xl bg-[#9E0B22] flex items-center justify-center shrink-0 border border-white/20">
              <Image src="/app_icon_192.png" alt="Icon" width={24} height={24} className="rounded-lg" />
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black tracking-wider uppercase text-[#E8D3A2]">Cambia Look</span>
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
        <div 
          style={{ paddingTop: "max(calc(env(safe-area-inset-top, 0px) + 8px), 1rem)" }}
          className="bg-black/95 text-white px-4 pb-2.5 text-xs font-bold flex items-center justify-between sticky top-0 z-50 border-b border-[#E8D3A2]/60 shadow-xl"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className={isDeveloperMode ? "text-cyan-400" : "text-[#E8D3A2]"} />
            <div>
              <span className={`text-[10px] font-black uppercase tracking-wider block ${isDeveloperMode ? "text-cyan-400" : "text-[#E8D3A2]"}`}>
                {isDeveloperMode ? "💻 Master Programmatore (2860)" : "👑 Area Staff Salone Attiva"}
              </span>
              <span className="text-[9px] text-white/70">Accesso modifiche salone e listini</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setIsChangePinModalOpen(true)}
              className="px-2.5 py-1 bg-[#E8D3A2]/20 hover:bg-[#E8D3A2] text-[#E8D3A2] hover:text-[#80081B] text-[10px] uppercase font-black rounded-lg transition-all border border-[#E8D3A2]/40"
              title="Gestione Codice PIN"
            >
              PIN Salone
            </button>
            <button 
              onClick={handleToggleStaffMode}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-[10px] uppercase font-black rounded-lg transition-colors border border-white/20"
            >
              Esci
            </button>
          </div>
        </div>
      )}

      {/* HEADER ROSSO CON LOGO ORIGINALE & TASTO ACCESSO DISCRETO */}
      <header 
        style={{ 
          paddingTop: isStaffMode 
            ? "0.85rem" 
            : "max(calc(env(safe-area-inset-top, 0px) + 14px), 3.5rem)" 
        }}
        className="px-5 pb-3.5 bg-gradient-to-b from-[#B80F29] to-[#D11936] flex items-center justify-between sticky top-0 z-40 border-b border-black/10 transition-all shadow-md"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-lg border border-white/30">
            <Image 
              src="/logo_transparent.png" 
              alt="Logo Cambia Look" 
              width={38} 
              height={38} 
              className="object-contain"
            />
          </div>
          <div className="flex items-center">
            <h1 className="text-3xl font-normal font-script text-white drop-shadow-md tracking-wide leading-none">
              Cambia Look
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Tasto Carrello Acquisti come nei veri shop online */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/35 hover:bg-black/50 text-white border border-[#E8D3A2]/50 shadow transition-all active:scale-95"
            title="Carrello Acquisti"
          >
            <ShoppingCart size={16} className="text-[#E8D3A2]" />
            <span className="text-xs font-bold text-white">Carrello</span>
            {cartTotalCount > 0 && (
              <span className="w-5 h-5 bg-[#E8D3A2] text-[#D11936] text-[10px] font-black rounded-full flex items-center justify-center shadow animate-pulse">
                {cartTotalCount}
              </span>
            )}
          </button>

          {/* Tasto discreto per lo staff (anonimo e protetto per le clienti) */}
          <button 
            onClick={handleToggleStaffMode}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow ${
              isStaffMode 
                ? "bg-white text-[#D11936] font-bold" 
                : "bg-black/20 text-white/60 hover:text-white/90 border border-white/10"
            }`}
            title="Area Riservata"
          >
            {isStaffMode ? <Unlock size={14} /> : <Lock size={13} />}
          </button>

          <button 
            onClick={() => triggerPushDemo("🔔 Benvenuta nell'app ufficiale di Cambia Look!")}
            className="w-9 h-9 rounded-full bg-black/25 flex items-center justify-center text-white/90 hover:text-white border border-white/15 shadow"
          >
            <Bell size={16} />
          </button>
        </div>
      </header>

      {/* ========================================================================================= */}
      {/* TAB 1: I SALONI (IDENTICO ALLO STILE DELL'APP ORIGINALE: ROSSO + FOTO REALI + SCRIP FONT) */}
      {/* ========================================================================================= */}
      {activeTab === "saloni" && (
        <main className="flex-1 px-5 pt-4 space-y-6 animate-in fade-in duration-300">
          
          {/* INTRO TITLE WITH GOLD FLOURISH */}
          <div className="text-center space-y-1 py-1">
            <h2 className="text-3xl font-normal font-script text-white drop-shadow">
              I Nostri Saloni
            </h2>
            <div className="w-16 h-0.5 bg-[#E8D3A2] mx-auto rounded-full mt-1" />
          </div>

          {/* LISTA DEI 2 SALONI REALI CON LE FOTO VERE */}
          <div className="space-y-6">
            {salonsList.map((salon) => (
              <div 
                key={salon.id}
                onClick={() => setSelectedSalon(salon)}
                className="relative cursor-pointer group active:scale-[0.99] transition-all"
              >
                {/* Tasto Modifica Salone per lo Staff */}
                {isStaffMode && (
                  <button
                    onClick={(e) => handleOpenEditSalon(salon, e)}
                    className="absolute top-3 right-3 z-30 py-1.5 px-3 rounded-full bg-black/85 hover:bg-[#E8D3A2] hover:text-[#D11936] text-white text-xs font-bold flex items-center gap-1.5 shadow-xl border border-white/20 transition-all"
                  >
                    <Edit3 size={13} />
                    <span>Modifica Salone</span>
                  </button>
                )}

                {/* Cornicette dorate ornamentali negli angoli come nell'app precedente */}
                <div className="absolute -top-1.5 -left-1.5 w-6 h-6 gold-corner-tl z-10 pointer-events-none" />
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 gold-corner-br z-10 pointer-events-none" />
                <div className="absolute -top-1 right-2 text-[#E8D3A2] text-xs pointer-events-none">✦</div>
                <div className="absolute -bottom-1 left-2 text-[#E8D3A2] text-xs pointer-events-none">✦</div>

                {/* Card con foto reale del salone */}
                <div className="relative rounded-2xl overflow-hidden bg-black/20 border-2 border-white/90 shadow-2xl h-52">
                  <Image 
                    src={salon.image} 
                    alt={salon.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[1.12] contrast-[1.04] saturate-[1.06]" 
                  />

                  {/* Gradient leggero solo sul fondo per leggibilità scritte senza oscurare la foto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Scritta in corsivo elegante in sovraimpressione come nella foto originale */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] text-[#E8D3A2] uppercase tracking-wider font-bold block drop-shadow">Salone</span>
                      <h3 className="text-3xl font-normal font-script text-white drop-shadow-lg leading-tight">
                        {salon.name}
                      </h3>
                    </div>

                    <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/30 group-hover:bg-white group-hover:text-[#D11936] transition-colors">
                      Info & Orari →
                    </span>
                  </div>
                </div>

                {/* Indirizzo rapido sotto la foto */}
                <div className="pt-2 px-1 flex items-center justify-between text-[11px] text-white/90">
                  <span className="flex items-center gap-1.5 truncate">
                    <MapPin size={13} className="text-[#E8D3A2] shrink-0" />
                    <span className="truncate">{salon.address}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* BANNER INFORMATIVO DI BENVENUTO */}
          <div className="p-4 rounded-2xl cambia-glass text-center space-y-2 border border-white/20">
            <Sparkles size={20} className="mx-auto text-[#E8D3A2]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Saloni Esclusivi Per Sole Donne</h3>
            <p className="text-xs text-white/80 leading-relaxed font-normal">
              Scopri il nostro listino trattamenti e i prodotti professionali che usiamo e vendiamo in salone. Per informazioni o per prenotare una consulenza, contattaci direttamente!
            </p>
          </div>
        </main>
      )}

      {/* ========================================================================================= */}
      {/* TAB 2: VETRINA SERVIZI DONNA (SOLA CONSULTAZIONE / NO PRENOTAZIONI DIRETTE) */}
      {/* ========================================================================================= */}
      {activeTab === "servizi" && (
        <main className="flex-1 px-5 pt-4 space-y-5 animate-in fade-in duration-300">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-normal font-script text-white drop-shadow">
                I Nostri Trattamenti
              </h2>
            </div>

            {/* PULSANTE AGGIUNGI SERVIZIO (Visibile solo in modalità Staff) */}
            {isStaffMode && (
              <button
                onClick={handleOpenNewService}
                className="py-2.5 px-3.5 rounded-2xl bg-white text-[#D11936] text-xs font-black flex items-center gap-1.5 shadow-xl active:scale-95 transition-all shrink-0 hover:bg-[#E8D3A2]"
              >
                <Plus size={16} />
                <span>Nuovo Servizio</span>
              </button>
            )}
          </div>

          {/* Services Cards (Vetrina con Foto per ogni Servizio) */}
          <div className="space-y-4">
            {servicesList.map((serv) => (
              <div 
                key={serv.id}
                onClick={() => setSelectedService(serv)}
                className="rounded-3xl overflow-hidden bg-black/45 backdrop-blur-md border-2 border-white/90 hover:border-[#E8D3A2] transition-all cursor-pointer group active:scale-[0.99] shadow-xl relative"
              >
                {/* Tasti gestione servizio per lo Staff */}
                {isStaffMode && (
                  <div className="absolute top-3.5 right-3.5 z-30 flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleOpenEditService(serv, e)}
                      className="w-8 h-8 rounded-full bg-black/85 hover:bg-[#E8D3A2] hover:text-[#D11936] text-white flex items-center justify-center transition-colors shadow-lg border border-white/20"
                      title="Modifica servizio"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      onClick={(e) => handleDeleteService(serv.id, e)}
                      className="w-8 h-8 rounded-full bg-black/85 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shadow-lg border border-white/20"
                      title="Elimina servizio"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}

                {/* Cornicette dorate ornamentali */}
                <div className="absolute top-2 left-2 z-20 text-[#E8D3A2] text-xs pointer-events-none">✦</div>
                <div className="absolute top-2 right-2 z-20 text-[#E8D3A2] text-xs pointer-events-none">✦</div>

                {/* Foto del Servizio */}
                <div className="relative h-44 w-full overflow-hidden bg-black/60">
                  <Image 
                    src={serv.image} 
                    alt={serv.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Badge Categoria e Tag */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10">
                    <span className="text-[9px] font-black uppercase tracking-wider text-[#E8D3A2] bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow">
                      {serv.category}
                    </span>
                    {serv.tag && (
                      <span className="text-[9px] font-bold text-white bg-[#D11936]/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 shadow">
                        {serv.tag}
                      </span>
                    )}
                  </div>

                  {/* Prezzo in evidenza dorato sulla foto */}
                  <div className={`absolute ${isStaffMode ? "bottom-12 right-3.5" : "top-3.5 right-3.5"} bg-black/80 backdrop-blur-md px-3 py-1 rounded-xl border border-[#E8D3A2]/60 z-10 shadow transition-all`}>
                    <span className="text-sm font-black text-[#E8D3A2]">{serv.price}</span>
                  </div>

                  {/* Nome del Servizio sovrapposto sulla foto */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 z-10">
                    <h3 className="text-base font-bold text-white leading-tight drop-shadow group-hover:text-[#E8D3A2] transition-colors">
                      {serv.name}
                    </h3>
                  </div>
                </div>

                {/* Descrizione & Azioni */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-white/80 leading-relaxed font-normal">
                    {serv.desc}
                  </p>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70">
                    {serv.duration && serv.duration.trim() !== "" ? (
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} className="text-[#E8D3A2]" />
                        <span>Durata indicativa: <strong className="text-white">{serv.duration}</strong></span>
                      </span>
                    ) : <span />}

                    <div className="flex items-center gap-2">
                      <a
                        href="tel:069699412"
                        onClick={e => e.stopPropagation()}
                        className="py-1.5 px-2.5 rounded-xl bg-white hover:bg-[#E8D3A2] text-[#D11936] font-bold text-[10px] flex items-center gap-1 shadow transition-colors"
                        title="Telefona al salone"
                      >
                        <Phone size={11} />
                        <span>Telefona</span>
                      </a>

                      <span className="text-[#E8D3A2] font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        Info <ChevronRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ========================================================================================= */}
      {/* TAB 3: VETRINA PRODOTTI (IL PARRUCCHIERE PUÒ INSERIRLI CON FOTO, PREZZO E DESCRIZIONE) */}
      {/* ========================================================================================= */}
      {activeTab === "prodotti" && (
        <main className="flex-1 px-5 pt-4 space-y-5 animate-in fade-in duration-300">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-normal font-script text-white drop-shadow">
                I Nostri Prodotti
              </h2>
              {isStaffMode && (
                <p className="text-[10px] text-[#E8D3A2] font-semibold mt-0.5">Pannello Staff Salone</p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Tasto Carrello */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="py-2.5 px-3.5 rounded-2xl bg-white text-[#D11936] text-xs font-black flex items-center gap-1.5 shadow-xl active:scale-95 transition-all hover:bg-[#E8D3A2]"
              >
                <ShoppingCart size={15} />
                <span>Carrello {cartTotalCount > 0 ? `(${cartTotalCount})` : ""}</span>
              </button>

              {/* PULSANTE AGGIUNGI PRODOTTO (Visibile solo in modalità Titolare) */}
              {isStaffMode && (
                <button
                  onClick={handleOpenNewProduct}
                  className="py-2.5 px-3 rounded-2xl bg-black/40 text-[#E8D3A2] border border-[#E8D3A2]/40 text-xs font-bold flex items-center gap-1 shadow-xl active:scale-95 transition-all"
                >
                  <Plus size={15} />
                  <span>Nuovo</span>
                </button>
              )}
            </div>
          </div>

          {/* Filtri Categoria Rapidi */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              { id: "tutti", label: "Tutti i Prodotti" },
              { id: "shampoo", label: "Shampoo" },
              { id: "maschere", label: "Maschere" },
              { id: "oli", label: "Oli Preziosi" },
              { id: "styling", label: "Styling" },
              { id: "kit", label: "Kit Completi" },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setProductCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  productCategory === cat.id 
                    ? "bg-white text-[#D11936] font-black shadow-lg" 
                    : "bg-black/30 text-white/80 border border-white/15 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* GRIGLIA PRODOTTI IN VETRINA */}
          <div className="grid grid-cols-2 gap-3.5">
            {productsList
              .filter(p => productCategory === "tutti" || p.category === productCategory)
              .map(prod => (
                <div 
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className="rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/20 hover:border-[#E8D3A2]/60 transition-all flex flex-col justify-between cursor-pointer group relative shadow-lg"
                >
                  {/* Tasti gestione prodotto per lo Staff */}
                  {isStaffMode && (
                    <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditProduct(prod);
                        }}
                        className="w-8 h-8 rounded-full bg-black/85 hover:bg-[#E8D3A2] hover:text-[#D11936] text-white flex items-center justify-center transition-colors shadow-lg border border-white/20"
                        title="Modifica prodotto"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={(e) => handleDeleteProduct(prod.id, e)}
                        className="w-8 h-8 rounded-full bg-black/85 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shadow-lg border border-white/20"
                        title="Elimina prodotto"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )}

                  {/* Foto del Prodotto */}
                  <div className="relative aspect-square overflow-hidden bg-black/60">
                    <Image 
                      src={prod.img} 
                      alt={prod.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute bottom-2 left-2 text-[8px] font-black uppercase tracking-wider bg-black/70 text-[#E8D3A2] px-2 py-0.5 rounded-md border border-white/10">
                      Disponibile in Salone
                    </span>
                  </div>

                  {/* Info Prodotto */}
                  <div className="p-3 space-y-1">
                    <span className="text-[9px] font-bold text-[#E8D3A2] uppercase tracking-wider block">{prod.brand}</span>
                    <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight group-hover:text-[#E8D3A2] transition-colors">{prod.name}</h4>
                    <p className="text-[10px] text-white/50">{prod.size}</p>
                    
                    <div className="pt-2 flex items-center justify-between border-t border-white/10 mt-1">
                      <span className="text-sm font-black text-[#E8D3A2]">€ {Number(prod.price).toFixed(2)}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(prod, 1);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#E8D3A2] text-[#D11936] font-black text-[10px] flex items-center gap-1 shadow active:scale-95 transition-all"
                        title="Aggiungi al carrello"
                      >
                        <ShoppingCart size={11} strokeWidth={2.5} />
                        <span>Carrello</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div 
            onClick={() => setIsCartOpen(true)}
            className="p-5 rounded-3xl bg-black/45 border-2 border-[#E8D3A2]/50 text-center space-y-3 cursor-pointer hover:bg-black/55 transition-all shadow-2xl group mt-6 mb-10"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#E8D3A2] to-[#B38F46] text-[#D11936] mx-auto flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform shadow-lg">
              <ShoppingCart size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Carrello Acquisti Ritiro in Salone
              </h4>
              <p className="text-xs text-white/80 leading-relaxed max-w-xs mx-auto">
                Aggiungi i tuoi prodotti al carrello e ritirali nei nostri negozi
              </p>
            </div>
            <div className="pt-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCartOpen(true);
                }}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-white via-[#FFF8E7] to-[#E8D3A2] text-[#D11936] font-black text-xs uppercase tracking-wider shadow-xl hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 border border-[#E8D3A2]"
              >
                <ShoppingCart size={16} />
                <span>Apri Carrello {cartTotalCount > 0 ? `(${cartTotalCount})` : ""}</span>
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================================= */}
      {/* TAB 4: CONTATTI E INFO SALONE */}
      {/* ========================================================================================= */}
      {activeTab === "info" && (
        <main className="flex-1 px-5 pt-4 space-y-6 animate-in fade-in duration-300">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8D3A2]">Contatti Salone</span>
            <h2 className="text-3xl font-normal font-script text-white drop-shadow">
              Vieni a Trovarci
            </h2>
            <p className="text-xs text-white/80">I recapiti diretti dei due saloni Cambia Look</p>
          </div>

          <div className="space-y-4">
            {salonsList.map((salon) => (
              <div key={salon.id} className="p-5 rounded-2xl bg-black/40 border border-white/20 space-y-3 relative">
                {isStaffMode && (
                  <button
                    onClick={() => handleOpenEditSalon(salon)}
                    className="absolute top-4 right-4 py-1 px-2.5 rounded-full bg-black/80 hover:bg-[#E8D3A2] hover:text-[#D11936] text-white text-[10px] font-bold flex items-center gap-1 border border-white/20 transition-all"
                  >
                    <Edit3 size={11} />
                    <span>Modifica</span>
                  </button>
                )}

                <div className="pr-16">
                  <h3 className="text-xl font-script text-white">{salon.name}</h3>
                </div>

                <div className="space-y-1.5 text-xs text-white/80">
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-[#E8D3A2] shrink-0 mt-0.5" />
                    <span>{salon.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[#E8D3A2] shrink-0" />
                    <span>{salon.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-[#E8D3A2] shrink-0" />
                    <span>Tel: {salon.phone}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a 
                    href={`tel:${salon.phone.replace(/\s+/g, '')}`}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#E8D3A2] text-[#D11936] font-black text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                  >
                    <Phone size={15} />
                    <span>Telefona a {salon.name} ({salon.phone})</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* BOX ACCESSO RISERVATO SALONE (Protetto e discreto) */}
          {isStaffMode ? (
            <div className="p-5 rounded-2xl bg-black/50 border border-[#E8D3A2]/40 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#E8D3A2]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Area Staff Salone Attiva</h4>
              </div>
              <p className="text-xs text-white/70 leading-relaxed font-normal">
                Stai visualizzando l'applicazione in modalità gestione. Puoi inserire e modificare trattamenti, saloni, prezzi e prodotti.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsChangePinModalOpen(true)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#E8D3A2]/20 hover:bg-[#E8D3A2] text-[#E8D3A2] hover:text-[#80081B] text-xs font-bold transition-all border border-[#E8D3A2]/40"
                >
                  Cambia PIN Salone
                </button>
                <button
                  onClick={handleToggleStaffMode}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white text-white hover:text-[#D11936] text-xs font-bold transition-all border border-white/20"
                >
                  Torna a Vista Cliente
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center pt-2 pb-2">
              <button
                onClick={handleToggleStaffMode}
                className="text-[10px] text-white/35 hover:text-white/70 transition-colors"
              >
                Accesso Riservato Personale
              </button>
            </div>
          )}

          {/* FOOTER LEGALE E PRIVACY (RICHIESTO PER GLI STORE) */}
          <div className="pt-4 pb-8 text-center space-y-2 border-t border-white/10">
            <div className="flex items-center justify-center gap-3 text-xs text-white/75">
              <a href="/privacy" className="hover:text-white underline text-[11px]">
                Informativa sulla Privacy (GDPR)
              </a>
              <span>•</span>
              <span className="text-[11px]">© Cambia Look</span>
            </div>
            <p className="text-[10px] text-white/50">
              Salone Donna • Cisterna di Latina (LT) & Roma (RM)
            </p>
          </div>
        </main>
      )}

      {/* ========================================================================================= */}
      {/* POPUP: DETTAGLIO SALONE SELEZIONATO */}
      {/* ========================================================================================= */}
      {selectedSalon && (
        <div 
          onClick={() => setSelectedSalon(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-200"
        >
          <div 
            ref={salonSwipe.sheetRef}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#9E0B22] border-t-2 border-[#E8D3A2] rounded-t-[32px] overflow-hidden shadow-2xl h-[93vh] flex flex-col touch-pan-y"
          >
            <div 
              className="w-full flex justify-center pt-2.5 pb-2 bg-black/30 shrink-0 touch-none select-none cursor-grab active:cursor-grabbing"
              onTouchStart={salonSwipe.handleTouchStart}
              onTouchMove={salonSwipe.handleTouchMove}
              onTouchEnd={salonSwipe.handleTouchEnd}
            >
              <div className="w-12 h-1.5 rounded-full bg-white/40 shadow-sm" />
            </div>
            <div 
              className="relative h-60 w-full shrink-0 touch-none select-none"
              onTouchStart={salonSwipe.handleTouchStart}
              onTouchMove={salonSwipe.handleTouchMove}
              onTouchEnd={salonSwipe.handleTouchEnd}
            >
              <Image 
                src={selectedSalon.image} 
                alt={selectedSalon.name} 
                fill 
                className="object-cover brightness-[1.12] contrast-[1.04] saturate-[1.06]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#9E0B22]/70 via-transparent to-transparent" />
              <button 
                onClick={() => setSelectedSalon(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-3 left-5">
                <span className="text-[10px] text-[#E8D3A2] uppercase tracking-wider font-bold block">Salone Cambia Look</span>
                <h3 className="text-3xl font-script text-white drop-shadow-md">{selectedSalon.name}</h3>
              </div>
            </div>

            <div 
              ref={salonSwipe.scrollRef}
              onScroll={salonSwipe.handleScroll}
              onTouchStart={salonSwipe.handleContentTouchStart}
              onTouchMove={salonSwipe.handleContentTouchMove}
              onTouchEnd={salonSwipe.handleTouchEnd}
              className="p-6 space-y-4 overflow-y-auto no-scrollbar flex-1 overscroll-contain"
            >
              <p className="text-xs text-white/90 leading-relaxed font-normal">
                {selectedSalon.description}
              </p>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin size={15} className="text-[#E8D3A2] shrink-0 mt-0.5" />
                  <span>{selectedSalon.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-[#E8D3A2] shrink-0" />
                  <span>{selectedSalon.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={15} className="text-[#E8D3A2] shrink-0" />
                  <span>{selectedSalon.phone}</span>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href={`tel:${selectedSalon.phone.replace(/\s+/g, '')}`}
                  className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-[#E8D3A2] text-[#D11936] font-black text-xs flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
                >
                  <Phone size={16} />
                  <span>Telefona al Salone ({selectedSalon.phone})</span>
                </a>
              </div>

              {/* Azioni Staff Mode nel dettaglio salone */}
              {isStaffMode && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      handleOpenEditSalon(selectedSalon);
                      setSelectedSalon(null);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#E8D3A2] hover:bg-[#d8c392] text-[#D11936] font-black text-xs flex items-center justify-center gap-1.5 shadow active:scale-95 transition-all"
                  >
                    <Edit3 size={14} />
                    <span>Modifica Dati & Orari Salone</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* POPUP: DETTAGLIO SERVIZIO (SOLA CONSULTAZIONE CON FOTO DEL SERVIZIO) */}
      {/* ========================================================================================= */}
      {selectedService && (
        <div 
          onClick={() => setSelectedService(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-200"
        >
          <div 
            ref={serviceSwipe.sheetRef}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#9E0B22] border-t-2 border-[#E8D3A2] rounded-t-[32px] shadow-2xl h-[93vh] flex flex-col overflow-hidden touch-pan-y"
          >
            {/* Area drag maniglia iOS con swipe verso il basso */}
            <div 
              className="w-full flex flex-col items-center pt-3 pb-2 cursor-grab active:cursor-grabbing shrink-0 touch-none select-none"
              onTouchStart={serviceSwipe.handleTouchStart}
              onTouchMove={serviceSwipe.handleTouchMove}
              onTouchEnd={serviceSwipe.handleTouchEnd}
            >
              <div className="w-12 h-1.5 rounded-full bg-white/40 shadow-sm" />
            </div>
            
            {/* Header del trattamento (supporta swipe verso il basso) */}
            <div 
              className="px-6 pb-3 pt-1 flex justify-between items-start border-b border-white/10 shrink-0 select-none touch-none"
              onTouchStart={serviceSwipe.handleTouchStart}
              onTouchMove={serviceSwipe.handleTouchMove}
              onTouchEnd={serviceSwipe.handleTouchEnd}
            >
              <div>
                <span className="text-[10px] text-[#E8D3A2] font-bold uppercase tracking-wider">{selectedService.category}</span>
                <h3 className="text-lg font-bold text-white">{selectedService.name}</h3>
                {selectedService.duration && selectedService.duration.trim() !== "" && (
                  <span className="text-xs text-white/70 block">Durata indicativa: {selectedService.duration}</span>
                )}
              </div>
              <button 
                type="button"
                onClick={() => setSelectedService(null)} 
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Contenuto scorrevole con swipe support */}
            <div 
              ref={serviceSwipe.scrollRef}
              onScroll={serviceSwipe.handleScroll}
              onTouchStart={serviceSwipe.handleContentTouchStart}
              onTouchMove={serviceSwipe.handleContentTouchMove}
              onTouchEnd={serviceSwipe.handleTouchEnd}
              className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar overscroll-contain"
            >
              {/* Foto del Servizio nel Popup */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/50 border border-white/20 shadow-lg">
                <Image 
                  src={selectedService.image} 
                  alt={selectedService.name} 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#E8D3A2] bg-black/80 px-2.5 py-0.5 rounded-full border border-white/10">
                    Trattamento Salone
                  </span>
                </div>
              </div>

              <p className="text-xs text-white/90 leading-relaxed font-normal">
                {selectedService.desc}
              </p>

              <div className="p-3.5 rounded-2xl bg-black/35 border border-white/15 flex items-center justify-between">
                <span className="text-xs text-white/70">Prezzo di listino:</span>
                <span className="text-xl font-black text-[#E8D3A2]">{selectedService.price}</span>
              </div>

              {/* Azioni Staff Mode nel dettaglio servizio */}
              {isStaffMode && (
                <div className="pt-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleOpenEditService(selectedService);
                      setSelectedService(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#E8D3A2] hover:bg-[#d8c392] text-[#D11936] font-black text-xs flex items-center justify-center gap-1.5 shadow active:scale-95 transition-all"
                  >
                    <Edit3 size={14} />
                    <span>Modifica Questo Trattamento</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      handleDeleteService(selectedService.id, e);
                    }}
                    className="px-3.5 py-2.5 rounded-xl bg-black/50 text-rose-300 hover:text-white hover:bg-rose-600 font-bold text-xs flex items-center justify-center gap-1.5 border border-rose-500/30 transition-colors"
                  >
                    <Trash2 size={14} />
                    <span>Elimina</span>
                  </button>
                </div>
              )}

              {/* Chiamata telefonica diretta per info */}
              <div className="space-y-2 pt-1 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/70 block text-center">
                  Telefona per richiedere informazioni o concordare la data:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:069699412"
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#E8D3A2] text-[#D11936] font-bold text-xs flex items-center justify-center gap-1.5 shadow active:scale-95 transition-all"
                  >
                    <Phone size={13} />
                    <span>Cisterna: 06 969 9412</span>
                  </a>
                  <a
                    href="tel:067804521"
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#E8D3A2] text-[#D11936] font-bold text-xs flex items-center justify-center gap-1.5 shadow active:scale-95 transition-all"
                  >
                    <Phone size={13} />
                    <span>Roma: 06 780 4521</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* POPUP: DETTAGLIO PRODOTTO (SOLA CONSULTAZIONE / NO PRENOTAZIONI) */}
      {/* ========================================================================================= */}
      {selectedProduct && (
        <div 
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-200"
        >
          <div 
            ref={productSwipe.sheetRef}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#9E0B22] border-t-2 border-[#E8D3A2] rounded-t-[32px] shadow-2xl h-[93vh] flex flex-col overflow-hidden touch-pan-y"
          >
            {/* Area drag maniglia iOS con swipe verso il basso */}
            <div 
              className="w-full flex flex-col items-center pt-3 pb-2 cursor-grab active:cursor-grabbing shrink-0 touch-none select-none"
              onTouchStart={productSwipe.handleTouchStart}
              onTouchMove={productSwipe.handleTouchMove}
              onTouchEnd={productSwipe.handleTouchEnd}
            >
              <div className="w-12 h-1.5 rounded-full bg-white/40 shadow-sm" />
            </div>
            
            {/* Header del prodotto */}
            <div 
              className="px-6 pb-3 pt-1 flex justify-between items-start border-b border-white/10 shrink-0 select-none touch-none"
              onTouchStart={productSwipe.handleTouchStart}
              onTouchMove={productSwipe.handleTouchMove}
              onTouchEnd={productSwipe.handleTouchEnd}
            >
              <div>
                <span className="text-[10px] text-[#E8D3A2] font-bold uppercase tracking-wider">{selectedProduct.brand}</span>
                <h3 className="text-base font-bold text-white">{selectedProduct.name}</h3>
                <span className="text-xs text-white/70">{selectedProduct.size}</span>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedProduct(null)} 
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Contenuto scrollabile con swipe support */}
            <div 
              ref={productSwipe.scrollRef}
              onScroll={productSwipe.handleScroll}
              onTouchStart={productSwipe.handleContentTouchStart}
              onTouchMove={productSwipe.handleContentTouchMove}
              onTouchEnd={productSwipe.handleTouchEnd}
              className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar overscroll-contain"
            >
              {/* Foto grande del prodotto */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/15">
                <Image src={selectedProduct.img} alt={selectedProduct.name} fill className="object-cover" />
              </div>

              <div className="space-y-2">
                <p className="text-xs text-white/90 leading-relaxed font-normal">{selectedProduct.desc}</p>
                
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8D3A2]">Caratteristiche & Benefici:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedProduct.benefits || []).map((b: string, i: number) => (
                      <span key={i} className="inline-flex items-center gap-1 text-[10px] bg-black/40 border border-white/15 text-white px-2.5 py-1 rounded-xl">
                        <Sparkle size={10} className="text-[#E8D3A2]" />
                        <span>{b}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prezzo e disponibilità */}
              <div className="p-3.5 rounded-2xl bg-black/35 border border-white/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/60 block">Prezzo al pubblico:</span>
                  <span className="text-xl font-black text-[#E8D3A2]">€ {Number(selectedProduct.price).toFixed(2)}</span>
                </div>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                  In Vendita nei Saloni
                </span>
              </div>

              {/* Selettore Quantità e Aggiunta al Carrello */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/70 block">
                  Quantità da Ordinare per il Ritiro in Salone:
                </span>
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center bg-black/60 border border-white/20 rounded-2xl p-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setProdDetailQty(Math.max(1, prodDetailQty - 1))}
                      className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-95 transition-all"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-9 text-center font-black text-sm text-[#E8D3A2]">
                      {prodDetailQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setProdDetailQty(prodDetailQty + 1)}
                      className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-95 transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      addToCart(selectedProduct, prodDetailQty);
                      setProdDetailQty(1);
                      setSelectedProduct(null);
                      setIsCartOpen(true);
                    }}
                    className="flex-1 py-3 px-3 rounded-2xl bg-gradient-to-r from-white via-[#FFF8E7] to-[#E8D3A2] text-[#D11936] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xl hover:brightness-105 active:scale-95 transition-all"
                  >
                    <ShoppingCart size={16} />
                    <span>Aggiungi al Carrello • € {(Number(selectedProduct.price) * prodDetailQty).toFixed(2)}</span>
                  </button>
                </div>
              </div>

              {/* Azioni Staff Mode nel dettaglio prodotto */}
              {isStaffMode && (
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleOpenEditProduct(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#E8D3A2] hover:bg-[#d8c392] text-[#D11936] font-black text-xs flex items-center justify-center gap-1.5 shadow active:scale-95 transition-all"
                  >
                    <Edit3 size={14} />
                    <span>Modifica Questo Prodotto</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      handleDeleteProduct(selectedProduct.id, e);
                      setSelectedProduct(null);
                    }}
                    className="px-3.5 py-2.5 rounded-xl bg-black/50 text-rose-300 hover:text-white hover:bg-rose-600 font-bold text-xs flex items-center justify-center gap-1.5 border border-rose-500/30 transition-colors"
                  >
                    <Trash2 size={14} />
                    <span>Elimina</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* MODAL TITOLARE: INSERIMENTO NUOVO PRODOTTO CON FOTO DA SMARTPHONE, PREZZO E DESCRIZIONE */}
      {/* ========================================================================================= */}
      {isNewProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#80081B] border-t-2 border-[#E8D3A2] rounded-t-[32px] p-6 space-y-4 animate-in slide-in-from-bottom duration-300 max-h-[92vh] overflow-y-auto no-scrollbar shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-white text-[#D11936] flex items-center justify-center font-bold">
                  {editingProductId ? <Edit3 size={18} /> : <Plus size={18} />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingProductId ? "Modifica Prodotto" : "Aggiungi Prodotto in Vetrina"}
                  </h3>
                  <span className="text-[10px] text-white/70">
                    {editingProductId ? "Aggiorna foto, dettagli o prezzo del prodotto" : "Scatta foto, imposta prezzo e descrizione"}
                  </span>
                </div>
              </div>
              <button onClick={handleCloseProductModal} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
              {/* Caricamento Foto del Prodotto */}
              <div>
                <label className="font-bold text-white/90 block mb-1.5">1. Foto del Prodotto *</label>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-[#E8D3A2]/60 bg-black/50 overflow-hidden relative flex items-center justify-center shrink-0">
                    {newProdImage ? (
                      <Image src={newProdImage} alt="Preview" fill className="object-cover" />
                    ) : (
                      <Camera size={26} className="text-[#E8D3A2]/70" />
                    )}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#D11936] font-bold text-[11px] transition-colors shadow">
                      <Upload size={14} />
                      <span>{newProdImage ? "Cambia Foto" : "Scatta o Scegli Foto"}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                    <p className="text-[10px] text-white/60">Usa la fotocamera del tuo telefono o la galleria</p>
                  </div>
                </div>
              </div>

              {/* Nome */}
              <div>
                <label className="font-bold text-white/90 block mb-1">Nome del Prodotto *</label>
                <input
                  type="text"
                  required
                  placeholder="Es. Shampoo Riparatore Cheratina"
                  value={newProdName}
                  onChange={e => setNewProdName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 outline-none font-medium"
                />
              </div>

              {/* Categoria & Formato */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-white/90 block mb-1">Categoria</label>
                  <select
                    value={newProdCategory}
                    onChange={e => setNewProdCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white outline-none font-medium"
                  >
                    <option value="shampoo">Shampoo</option>
                    <option value="maschere">Maschera / Balsamo</option>
                    <option value="oli">Olio / Siero</option>
                    <option value="styling">Styling</option>
                    <option value="kit">Kit Trattamento</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-white/90 block mb-1">Formato</label>
                  <input
                    type="text"
                    placeholder="Es. 250 ml / 100 ml"
                    value={newProdSize}
                    onChange={e => setNewProdSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 outline-none font-medium"
                  />
                </div>
              </div>

              {/* Prezzo & Linea */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-white/90 block mb-1">Prezzo (€) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Es. 22.00"
                    value={newProdPrice}
                    onChange={e => setNewProdPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#E8D3A2]/60 text-[#E8D3A2] font-black placeholder-white/40 outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-white/90 block mb-1">Linea / Brand</label>
                  <input
                    type="text"
                    placeholder="Es. Cambia Look Care"
                    value={newProdBrand}
                    onChange={e => setNewProdBrand(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 outline-none font-medium"
                  />
                </div>
              </div>

              {/* Descrizione */}
              <div>
                <label className="font-bold text-white/90 block mb-1">Descrizione & Consigli d'Uso</label>
                <textarea
                  rows={2}
                  placeholder="Spiega alle clienti a cosa serve e come si applica..."
                  value={newProdDesc}
                  onChange={e => setNewProdDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 outline-none font-medium resize-none"
                />
              </div>

              {/* Benefici */}
              <div>
                <label className="font-bold text-white/90 block mb-1">Benefici Principali (separati da virgola)</label>
                <input
                  type="text"
                  placeholder="Es. Anticrespo, Lucidante, Ristrutturante"
                  value={newProdBenefits}
                  onChange={e => setNewProdBenefits(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 outline-none font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-white hover:bg-[#E8D3A2] text-[#D11936] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
              >
                <Check size={16} />
                <span>{editingProductId ? "Salva Modifiche" : "Pubblica in Vetrina"}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* MODAL PIN RISERVATO SALONE (PROTETTO, ANONIMO E CON ANTI-INTRUSIONE) */}
      {/* ========================================================================================= */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xs bg-[#80081B] border-2 border-[#E8D3A2] rounded-3xl p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#E8D3A2] mx-auto flex items-center justify-center border border-[#E8D3A2]/40">
              <Lock size={22} />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">Area Riservata Salone</h3>
              <p className="text-[11px] text-white/70 mt-1">
                Inserisci il codice di sicurezza autorizzato
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleVerifyPin(); }} className="space-y-3">
              <input
                type="password"
                maxLength={6}
                inputMode="numeric"
                autoFocus
                placeholder="••••"
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                className="w-36 mx-auto text-center text-xl tracking-widest px-3 py-2.5 rounded-2xl bg-black/50 border border-[#E8D3A2] text-white outline-none"
              />

              {lockoutUntil && Date.now() < lockoutUntil ? (
                <p className="text-[10px] text-rose-300 font-bold">
                  ⚠️ Blocco temporaneo per troppi errori. Attendi 30s.
                </p>
              ) : pinError ? (
                <p className="text-[10px] text-amber-300 font-bold">
                  Codice non valido. Tentativo {pinAttempts}/3
                </p>
              ) : null}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPinModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-white text-[#D11936] text-xs font-black shadow-lg hover:bg-[#E8D3A2] active:scale-95 transition-all"
                >
                  Accedi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* MODAL GESTIONE PIN SALONE (CAMBIO PIN E MASTER PIN DEVELOPER 2860) */}
      {/* ========================================================================================= */}
      {isChangePinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-[#80081B] border-2 border-[#E8D3A2] rounded-3xl p-6 space-y-4 shadow-2xl text-left">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-[#E8D3A2] text-[#80081B] flex items-center justify-center font-bold">
                  <KeyRound size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Sicurezza & PIN Salone</h3>
                  <span className="text-[10px] text-white/70">Gestione codici di accesso staff</span>
                </div>
              </div>
              <button 
                onClick={() => setIsChangePinModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20"
              >
                <X size={16} />
              </button>
            </div>

            {/* SE L'UTENTE È LO SVILUPPATORE (MASTER PIN 2860) */}
            {isDeveloperMode && (
              <div className="p-3 rounded-2xl bg-cyan-950/70 border border-cyan-400/40 text-cyan-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span>💻 Modalità Programmatore Attiva</span>
                  <span className="text-[10px] bg-cyan-400/20 px-2 py-0.5 rounded-full text-cyan-300">Master 2860</span>
                </div>
                <p className="text-[11px] opacity-90">
                  PIN attuale configurato per il salone: <strong className="text-white font-mono text-sm tracking-wider">{salonPin}</strong>
                </p>
                <button
                  type="button"
                  onClick={handleResetSalonPin}
                  className="mt-1 text-[11px] py-1 px-2.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-100 font-bold transition-colors"
                >
                  🔄 Reimposta PIN Salone a 1234
                </button>
              </div>
            )}

            <form onSubmit={handleChangeSalonPin} className="space-y-3 text-xs">
              {!isDeveloperMode && (
                <div>
                  <label className="font-bold text-white/90 block mb-1">PIN Attuale del Salone *</label>
                  <input
                    type="password"
                    required
                    maxLength={6}
                    placeholder="Inserisci il PIN attuale"
                    value={oldPinInput}
                    onChange={e => setOldPinInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white outline-none"
                  />
                </div>
              )}

              <div>
                <label className="font-bold text-white/90 block mb-1">Nuovo PIN Salone (min. 4 cifre) *</label>
                <input
                  type="password"
                  required
                  maxLength={6}
                  placeholder="Es. 5432"
                  value={newPinInput}
                  onChange={e => setNewPinInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#E8D3A2]/60 text-[#E8D3A2] font-black outline-none tracking-widest text-center text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-white/90 block mb-1">Conferma Nuovo PIN *</label>
                <input
                  type="password"
                  required
                  maxLength={6}
                  placeholder="Ripeti il nuovo PIN"
                  value={confirmPinInput}
                  onChange={e => setConfirmPinInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#E8D3A2]/60 text-[#E8D3A2] font-black outline-none tracking-widest text-center text-sm"
                />
              </div>

              {changePinError && (
                <p className="text-[10px] text-amber-300 font-bold bg-black/40 p-2 rounded-lg border border-amber-500/30">
                  ⚠️ {changePinError}
                </p>
              )}

              <p className="text-[10px] text-white/60 leading-tight">
                💡 Nota di sicurezza: il Master PIN programmatore (2860) rimarrà sempre funzionante in caso di smarrimento del codice.
              </p>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-white hover:bg-[#E8D3A2] text-[#D11936] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all mt-2"
              >
                <Check size={16} />
                <span>Salva Nuovo PIN Salone</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* MODAL MODIFICA DATI & ORARI SALONE (CISTERNA DI LATINA / ROMA) */}
      {/* ========================================================================================= */}
      {isEditSalonModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#80081B] border-t-2 border-[#E8D3A2] rounded-t-[32px] p-6 space-y-4 animate-in slide-in-from-bottom duration-300 max-h-[92vh] overflow-y-auto no-scrollbar shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-white text-[#D11936] flex items-center justify-center font-bold">
                  <Edit3 size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Modifica Dati Salone</h3>
                  <span className="text-[10px] text-white/70">{salonFormName}</span>
                </div>
              </div>
              <button onClick={() => setIsEditSalonModalOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveSalon} className="space-y-3 text-xs">
              {/* Foto Salone */}
              <div>
                <label className="font-bold text-white/90 block mb-1.5">Foto Salone</label>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-16 rounded-2xl border-2 border-dashed border-[#E8D3A2]/60 bg-black/50 overflow-hidden relative flex items-center justify-center shrink-0">
                    {salonFormImage ? (
                      <Image src={salonFormImage} alt="Preview" fill className="object-cover" />
                    ) : (
                      <Camera size={22} className="text-[#E8D3A2]/70" />
                    )}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-[#D11936] font-bold text-[11px] shadow">
                      <Upload size={13} />
                      <span>{salonFormImage ? "Sostituisci Foto" : "Carica Foto"}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleSalonImageUpload} />
                    </label>
                    <p className="text-[10px] text-white/60">Scatta dal telefono o scegli dalla galleria</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-white/90 block mb-1">Nome Salone *</label>
                <input
                  type="text"
                  required
                  value={salonFormName}
                  onChange={e => setSalonFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-white/90 block mb-1">Indirizzo Completo *</label>
                <input
                  type="text"
                  required
                  value={salonFormAddress}
                  onChange={e => setSalonFormAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-white/90 block mb-1">Telefono Chiamate *</label>
                  <input
                    type="text"
                    required
                    value={salonFormPhone}
                    onChange={e => setSalonFormPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-white/90 block mb-1">WhatsApp per Ordini</label>
                  <input
                    type="text"
                    placeholder="Es. 069699412 o 340..."
                    value={salonFormWhatsapp}
                    onChange={e => setSalonFormWhatsapp(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#E8D3A2]/60 text-[#E8D3A2] font-bold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-white/90 block mb-1">Orari di Apertura *</label>
                <input
                  type="text"
                  required
                  value={salonFormHours}
                  onChange={e => setSalonFormHours(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-white/90 block mb-1">Descrizione Salone</label>
                <textarea
                  rows={2}
                  value={salonFormDescription}
                  onChange={e => setSalonFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/20 text-white outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-white hover:bg-[#E8D3A2] text-[#D11936] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all mt-2"
              >
                <Check size={16} />
                <span>Salva Dati Salone</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* MODAL NUOVO / MODIFICA TRATTAMENTO SERVIZIO SALONE */}
      {/* ========================================================================================= */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#80081B] border-t-2 border-[#E8D3A2] rounded-t-[32px] p-6 space-y-4 animate-in slide-in-from-bottom duration-300 max-h-[92vh] overflow-y-auto no-scrollbar shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-white text-[#D11936] flex items-center justify-center font-bold">
                  {editingServiceId ? <Edit3 size={18} /> : <Plus size={18} />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingServiceId ? "Modifica Trattamento" : "Aggiungi Nuovo Trattamento"}
                  </h3>
                  <span className="text-[10px] text-white/70">
                    {editingServiceId ? "Aggiorna prezzo, durata o descrizione del servizio" : "Carica foto, imposta prezzo e categoria"}
                  </span>
                </div>
              </div>
              <button onClick={() => setIsServiceModalOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-3 text-xs">
              {/* Foto del Trattamento */}
              <div>
                <label className="font-bold text-white/90 block mb-1.5">Foto del Trattamento</label>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-16 rounded-2xl border-2 border-dashed border-[#E8D3A2]/60 bg-black/50 overflow-hidden relative flex items-center justify-center shrink-0">
                    {serviceFormImage ? (
                      <Image src={serviceFormImage} alt="Preview" fill className="object-cover" />
                    ) : (
                      <Camera size={22} className="text-[#E8D3A2]/70" />
                    )}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-[#D11936] font-bold text-[11px] shadow">
                      <Upload size={13} />
                      <span>{serviceFormImage ? "Sostituisci Foto" : "Scatta o Scegli Foto"}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleServiceImageUpload} />
                    </label>
                    <p className="text-[10px] text-white/60">Usa foto reali dei tuoi lavori</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-white/90 block mb-1">Nome del Trattamento *</label>
                <input
                  type="text"
                  required
                  placeholder="Es. Balayage Caramel & Gloss Luce"
                  value={serviceFormName}
                  onChange={e => setServiceFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-white/90 block mb-1">Categoria *</label>
                  <select
                    value={serviceFormCategory}
                    onChange={e => setServiceFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white outline-none"
                  >
                    <option value="Colore & Effetti Luce">Colore & Effetti Luce</option>
                    <option value="Taglio & Morphing">Taglio & Morphing</option>
                    <option value="Trattamenti Benessere">Trattamenti Benessere</option>
                    <option value="Piega & Styling">Piega & Styling</option>
                    <option value="Consulenza & Diagnosi">Consulenza & Diagnosi</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-white/90 block mb-1">Prezzo (€) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Es. € 48 o da € 95"
                    value={serviceFormPrice}
                    onChange={e => setServiceFormPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#E8D3A2]/60 text-[#E8D3A2] font-black outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-white/90 block mb-1">Durata Indicativa (Opzionale)</label>
                  <input
                    type="text"
                    placeholder="Es. 60 min (lascia vuoto se non indicata)"
                    value={serviceFormDuration}
                    onChange={e => setServiceFormDuration(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-white/90 block mb-1">Etichetta Tag in Evidenza</label>
                  <input
                    type="text"
                    placeholder="Es. Signature / Il Nostro Trend"
                    value={serviceFormTag}
                    onChange={e => setServiceFormTag(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-white/90 block mb-1">Descrizione Dettagliata</label>
                <textarea
                  rows={2}
                  placeholder="Spiega alle clienti cosa comprende questo trattamento..."
                  value={serviceFormDesc}
                  onChange={e => setServiceFormDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/20 text-white outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-white hover:bg-[#E8D3A2] text-[#D11936] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all mt-2"
              >
                <Check size={16} />
                <span>{editingServiceId ? "Salva Modifiche Servizio" : "Aggiungi al Listino"}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* MODAL CARRELLO ACQUISTI: ORDINA SU WHATSAPP & RITIRA IN SALONE */}
      {/* ========================================================================================= */}
      {isCartOpen && (
        <div 
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-200"
        >
          <div 
            ref={cartSwipe.sheetRef}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#80081B] border-t-2 border-[#E8D3A2] rounded-t-[32px] shadow-2xl h-[94vh] flex flex-col overflow-hidden touch-pan-y"
          >
            {/* Area di trascinamento swipe verso il basso con maniglia iOS */}
            <div 
              className="w-full flex flex-col items-center pt-3 pb-2 cursor-grab active:cursor-grabbing shrink-0 touch-none select-none"
              onTouchStart={cartSwipe.handleTouchStart}
              onTouchMove={cartSwipe.handleTouchMove}
              onTouchEnd={cartSwipe.handleTouchEnd}
            >
              <div className="w-12 h-1.5 rounded-full bg-white/40 shadow-sm" />
            </div>

            {/* Header del carrello (supporta swipe down rapido) */}
            <div 
              className="px-6 pb-3 pt-1 flex justify-between items-center border-b border-white/10 shrink-0 select-none touch-none"
              onTouchStart={cartSwipe.handleTouchStart}
              onTouchMove={cartSwipe.handleTouchMove}
              onTouchEnd={cartSwipe.handleTouchEnd}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E8D3A2] to-[#B38F46] text-[#D11936] flex items-center justify-center font-bold shadow shrink-0">
                  <ShoppingCart size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">Il Tuo Carrello</h3>
                  <span className="text-[10px] text-white/70">Ordina su WhatsApp e ritira in salone</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button 
                    type="button"
                    onClick={clearCart} 
                    className="py-1.5 px-3 rounded-xl bg-rose-500/20 hover:bg-rose-600/40 border border-rose-400/30 text-rose-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                    title="Svuota carrello"
                  >
                    <Trash2 size={14} />
                    <span>Svuota Carrello</span>
                  </button>
                )}
                <button 
                  type="button"
                  onClick={() => setIsCartOpen(false)} 
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Contenuto scrollabile a tutta altezza con swipe support */}
            <div 
              ref={cartSwipe.scrollRef}
              onScroll={cartSwipe.handleScroll}
              onTouchStart={cartSwipe.handleContentTouchStart}
              onTouchMove={cartSwipe.handleContentTouchMove}
              onTouchEnd={cartSwipe.handleTouchEnd}
              className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar overscroll-contain"
            >

            {cart.length === 0 ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-black/40 text-white/40 mx-auto flex items-center justify-center border border-white/10">
                  <ShoppingCart size={28} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Il tuo carrello è vuoto</h4>
                  <p className="text-xs text-white/70 max-w-xs mx-auto">
                    Esplora la nostra Boutique e aggiungi i prodotti professionali consigliati per la cura dei tuoi capelli.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveTab("prodotti");
                  }}
                  className="py-3 px-6 rounded-2xl bg-white hover:bg-[#E8D3A2] text-[#D11936] font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all"
                >
                  Sfoglia i Prodotti
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendWhatsAppOrder} className="space-y-4 text-xs">
                
                {/* LISTA DEI PRODOTTI NEL CARRELLO */}
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id}
                      className="p-3 rounded-2xl bg-black/40 border border-white/15 flex items-center gap-3"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-black/60 relative shrink-0 border border-white/10">
                        <Image 
                          src={item.product.img} 
                          alt={item.product.name} 
                          fill 
                          className="object-cover" 
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] uppercase font-bold text-[#E8D3A2] block truncate">
                          {item.product.brand}
                        </span>
                        <h5 className="font-bold text-white text-xs truncate">
                          {item.product.name}
                        </h5>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-black text-[#E8D3A2]">
                            € {(Number(item.product.price) * item.quantity).toFixed(2)}
                          </span>
                          <span className="text-[10px] text-white/50">
                            (€ {Number(item.product.price).toFixed(2)} cad.)
                          </span>
                        </div>
                      </div>

                      {/* Quantità & Rimuovi */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.product.id, -1)}
                          className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-95 transition-all"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center font-black text-xs text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.product.id, 1)}
                          className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-95 transition-all"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="w-7 h-7 ml-1 rounded-lg bg-black/60 hover:bg-rose-600/80 text-rose-300 hover:text-white flex items-center justify-center transition-colors"
                          title="Rimuovi"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SCELTA SALONE DI RITIRO */}
                <div className="space-y-1.5 pt-1">
                  <label className="font-bold text-white/90 block">
                    1. Salone per il Ritiro Gratuito *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCartPickupSalon("cisterna")}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        cartPickupSalon === "cisterna"
                          ? "bg-white text-[#D11936] font-black border-white shadow-md scale-[1.02]"
                          : "bg-black/40 text-white/80 border-white/20 hover:text-white"
                      }`}
                    >
                      <span className="block font-bold text-xs">Cisterna di Latina</span>
                      <span className="text-[10px] opacity-80 block truncate">Corso della Repubblica, 184</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCartPickupSalon("roma")}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        cartPickupSalon === "roma"
                          ? "bg-white text-[#D11936] font-black border-white shadow-md scale-[1.02]"
                          : "bg-black/40 text-white/80 border-white/20 hover:text-white"
                      }`}
                    >
                      <span className="block font-bold text-xs">Roma</span>
                      <span className="text-[10px] opacity-80 block truncate">Via delle Cave, 72</span>
                    </button>
                  </div>
                </div>

                {/* DATI CLIENTE */}
                <div className="space-y-2 pt-1">
                  <label className="font-bold text-white/90 block">
                    2. I Tuoi Dati per l'Ordine *
                  </label>
                  
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Nome e Cognome della cliente *"
                      value={cartClientName}
                      onChange={e => setCartClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 outline-none font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <select
                        value={cartPickupTime}
                        onChange={e => setCartPickupTime(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white outline-none font-medium text-xs"
                      >
                        <option value="Oggi pomeriggio">Ritiro: Oggi pomeriggio</option>
                        <option value="Domani mattina">Ritiro: Domani mattina</option>
                        <option value="Domani pomeriggio">Ritiro: Domani pomeriggio</option>
                        <option value="Entro Sabato">Ritiro: Entro Sabato</option>
                        <option value="Alla mia prossima seduta">Alla prossima seduta</option>
                      </select>
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Note o richieste..."
                        value={cartNotes}
                        onChange={e => setCartNotes(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 outline-none text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* TOTALE E VANTAGGIO RITIRO */}
                <div className="p-3.5 rounded-2xl bg-black/50 border border-[#E8D3A2]/50 space-y-2">
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span>Spedizione & Preparazione:</span>
                    <span className="font-bold text-emerald-300 uppercase text-[11px]">Gratis in Salone</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-2">
                    <span className="text-xs font-bold text-white">Totale da pagare al ritiro:</span>
                    <span className="text-xl font-black text-[#E8D3A2]">
                      € {cartTotalPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/60 leading-tight">
                    ✦ Nessun pagamento anticipato: pagherai comodamente in salone al momento del ritiro (in contanti o con carta).
                  </p>
                </div>

                {/* PULSANTE INVIA ORDINE VIA WHATSAPP */}
                <div className="space-y-2 pt-1">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-all border border-emerald-400/30"
                  >
                    <MessageCircle size={18} />
                    <span>Invia Ordine su WhatsApp ({cartPickupSalon === "cisterna" ? "Cisterna" : "Roma"})</span>
                  </button>

                  <p className="text-[10px] text-center text-white/50 pt-1">
                    Inviando l'ordine accetti l'<a href="/privacy" target="_blank" className="underline text-[#E8D3A2]">Informativa sulla Privacy</a>
                  </p>
                </div>

              </form>
            )}

            </div>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* BOTTOM NAVIGATION BAR (VETRINA ROSSO CAMBIA LOOK - 4 TABS) */}
      {/* ========================================================================================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#A60F25]/95 backdrop-blur-xl border-t border-black/20 max-w-md mx-auto safe-pb shadow-[0_-5px_25px_rgba(0,0,0,0.4)]">
        <div className="grid grid-cols-4 h-16 items-center px-1">
          {[
            { id: "saloni", label: "Saloni", icon: Store },
            { id: "servizi", label: "Servizi", icon: Scissors },
            { id: "prodotti", label: "Prodotti", icon: ShoppingCart, badge: cartTotalCount > 0 },
            { id: "info", label: "Contatti", icon: MapPin },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center justify-center gap-1 transition-all py-1 relative ${
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all relative ${isActive ? "bg-white text-[#D11936] shadow-md scale-105" : ""}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {tab.badge && !isActive && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#E8D3A2] ring-2 ring-[#A60F25]" />
                  )}
                </div>
                <span className={`text-[10px] leading-tight text-center max-w-[80px] ${isActive ? "font-black text-white" : "font-medium"}`}>
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
