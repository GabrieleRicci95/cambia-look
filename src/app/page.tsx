"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Sparkles, 
  ShoppingBag, 
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
  MessageCircle,
  Clock,
  Compass,
  Store,
  Calendar,
  CalendarCheck,
  CalendarPlus,
  CalendarDays,
  Smartphone,
  AlertCircle,
  Edit3,
  Share2,
  ExternalLink
} from "lucide-react";

// --- SALONI FISICI REALI CAMBIA LOOK (DALL'APP ORIGINALE) ---
const SALONS = [
  {
    id: "cisterna",
    name: "Cisterna di Latina",
    address: "Corso della Repubblica, 184 • Cisterna di Latina (LT)",
    phone: "06 969 9412",
    whatsapp: "39069699412",
    hours: "Mar - Sab: 08:30 - 19:30 • Lun e Dom Chiuso",
    image: "/salone_cisterna.jpg",
    description: "Atelier spazioso ed elegante con lampadario barocco fucsia, postazioni specchio luminose e consulenza personalizzata.",
  },
  {
    id: "roma",
    name: "Roma",
    address: "Via delle Cave, 72 • Roma (Zona Colli Albani / Appia)",
    phone: "06 780 4521",
    whatsapp: "39067804521",
    hours: "Mar - Sab: 09:00 - 19:30 • Lun e Dom Chiuso",
    image: "/salone_roma.jpg",
    description: "Salone moderno nel cuore di Roma con specchiere barocche nere, team specializzato in biondi, balayage e cambi look donna.",
  }
];

// --- LISTINO SERVIZI VETRINA (SOLA CONSULTAZIONE) ---
const SERVICES_SHOWCASE = [
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
    name: "Piega Glamour & Maschera Idratante",
    price: "€ 25",
    desc: "Bagno capillare nutriente, massaggio cutaneo distensivo, maschera intensiva e styling finale a scelta.",
    duration: "40 min",
    tag: "Sempre Perfetta",
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

export interface ClientAppointment {
  id: string;
  salonId: "cisterna" | "roma";
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  service: string;
  stylist?: string;
  notes?: string;
  reminder24h: boolean;
  reminder2h: boolean;
  createdAt: string;
}

const getTomorrowString = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const getInitialSampleAppointment = (): ClientAppointment => {
  const future = new Date();
  future.setDate(future.getDate() + 2);
  const pad = (n: number) => n.toString().padStart(2, "0");
  const dateStr = `${future.getFullYear()}-${pad(future.getMonth() + 1)}-${pad(future.getDate())}`;

  return {
    id: "sample-demo-1",
    salonId: "cisterna",
    date: dateStr,
    time: "10:30",
    service: "Balayage Soleil & Gloss Tonificante",
    stylist: "Simona",
    notes: "Consulenza tonalizzazione biondo caldo",
    reminder24h: true,
    reminder2h: true,
    createdAt: new Date().toISOString()
  };
};

export default function CambiaLookApp() {
  const [activeTab, setActiveTab] = useState<"saloni" | "servizi" | "agenda" | "prodotti" | "info">("saloni");
  
  // Selected Salon for direct contacts
  const [selectedSalon, setSelectedSalon] = useState<any | null>(null);

  // Selected Service for showcase detail popup
  const [selectedService, setSelectedService] = useState<any | null>(null);

  // Selected Product for showcase detail popup (only viewing, no bookings)
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Appointments / Diary State (Client Side Agenda)
  const [myAppointments, setMyAppointments] = useState<ClientAppointment[]>([]);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [editingAppointmentId, setEditingAppointmentId] = useState<string | null>(null);

  // Appointment Form fields
  const [formSalonId, setFormSalonId] = useState<"cisterna" | "roma">("cisterna");
  const [formDate, setFormDate] = useState(getTomorrowString());
  const [formTime, setFormTime] = useState("10:00");
  const [formService, setFormService] = useState("Balayage Soleil & Gloss Tonificante");
  const [formStylist, setFormStylist] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [formReminder24h, setFormReminder24h] = useState(true);
  const [formReminder2h, setFormReminder2h] = useState(true);

  // Products Dynamic State
  const [productsList, setProductsList] = useState<any[]>(INITIAL_PRODUCTS);
  const [productCategory, setProductCategory] = useState<string>("tutti");

  // Staff / Salon Mode State (To let the hairdresser add products with photo, price, description)
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

  // Notification simulation
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem("cambia_look_products");
      if (savedProducts) {
        setProductsList(JSON.parse(savedProducts));
      }

      const savedAppts = localStorage.getItem("cambia_look_appointments");
      if (savedAppts) {
        setMyAppointments(JSON.parse(savedAppts));
      } else {
        const sample = getInitialSampleAppointment();
        setMyAppointments([sample]);
        localStorage.setItem("cambia_look_appointments", JSON.stringify([sample]));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveAppointments = (newAppts: ClientAppointment[]) => {
    setMyAppointments(newAppts);
    try {
      localStorage.setItem("cambia_look_appointments", JSON.stringify(newAppts));
    } catch (e) {
      console.error(e);
    }
  };

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

  // Helper date formatting (in Italian)
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const [y, m, d] = dateStr.split("-").map(Number);
      const date = new Date(y, m - 1, d);
      return date.toLocaleDateString("it-IT", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    } catch {
      return dateStr;
    }
  };

  // Remaining days calculation
  const getDaysRemaining = (dateStr: string) => {
    if (!dateStr) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [y, m, d] = dateStr.split("-").map(Number);
    const target = new Date(y, m - 1, d);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Sorted appointments & next upcoming
  const sortedAppointments = [...myAppointments].sort((a, b) => {
    return `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`);
  });

  const nextUpcomingAppointment = sortedAppointments.find(a => {
    const days = getDaysRemaining(a.date);
    return days !== null && days >= 0;
  }) || sortedAppointments[0];

  // Open modal to add new appointment
  const handleOpenNewAppointmentModal = () => {
    setEditingAppointmentId(null);
    setFormSalonId("cisterna");
    setFormDate(getTomorrowString());
    setFormTime("10:00");
    setFormService(SERVICES_SHOWCASE[0]?.name || "Taglio & Piega");
    setFormStylist("");
    setFormNotes("");
    setFormReminder24h(true);
    setFormReminder2h(true);
    setIsAppointmentModalOpen(true);
  };

  // Open modal to edit existing appointment
  const handleEditAppointment = (appt: ClientAppointment) => {
    setEditingAppointmentId(appt.id);
    setFormSalonId(appt.salonId);
    setFormDate(appt.date);
    setFormTime(appt.time);
    setFormService(appt.service);
    setFormStylist(appt.stylist || "");
    setFormNotes(appt.notes || "");
    setFormReminder24h(appt.reminder24h ?? true);
    setFormReminder2h(appt.reminder2h ?? true);
    setIsAppointmentModalOpen(true);
  };

  // Save (create or update) appointment
  const handleSaveAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDate || !formTime || !formService) return;

    if (editingAppointmentId) {
      // Update
      const updated = myAppointments.map(a => 
        a.id === editingAppointmentId
          ? {
              ...a,
              salonId: formSalonId,
              date: formDate,
              time: formTime,
              service: formService,
              stylist: formStylist,
              notes: formNotes,
              reminder24h: formReminder24h,
              reminder2h: formReminder2h,
            }
          : a
      );
      saveAppointments(updated);
      triggerPushDemo("✨ Appuntamento aggiornato con successo!");
    } else {
      // Create new
      const newAppt: ClientAppointment = {
        id: `appt-${Date.now()}`,
        salonId: formSalonId,
        date: formDate,
        time: formTime,
        service: formService,
        stylist: formStylist,
        notes: formNotes,
        reminder24h: formReminder24h,
        reminder2h: formReminder2h,
        createdAt: new Date().toISOString()
      };
      saveAppointments([...myAppointments, newAppt]);
      triggerPushDemo("🎉 Appuntamento salvato nella tua agenda! Ora puoi salvarlo nel calendario del telefono.");
    }

    setIsAppointmentModalOpen(false);
  };

  // Delete appointment
  const handleDeleteAppointment = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm("Vuoi cancellare questo appuntamento dalla tua agenda?")) {
      const filtered = myAppointments.filter(a => a.id !== id);
      saveAppointments(filtered);
      triggerPushDemo("🗑️ Appuntamento rimosso dall'agenda");
    }
  };

  // Native iCalendar (.ics) export with built-in alarms (24h and 2h before)
  const handleExportIcs = (appt: ClientAppointment) => {
    const salon = SALONS.find(s => s.id === appt.salonId) || SALONS[0];
    const [year, month, day] = appt.date.split("-").map(Number);
    const [hour, minute] = appt.time.split(":").map(Number);

    const startDate = new Date(year, month - 1, day, hour, minute);
    const endDate = new Date(startDate.getTime() + 90 * 60 * 1000); // 90 min default

    const pad = (n: number) => n.toString().padStart(2, "0");
    const formatUtc = (d: Date) => 
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

    const alarms: string[] = [];
    if (appt.reminder24h) {
      alarms.push([
        "BEGIN:VALARM",
        "ACTION:DISPLAY",
        `DESCRIPTION:Promemoria Cambia Look: Domani hai l'appuntamento da ${salon.name}!`,
        "TRIGGER:-P1D",
        "END:VALARM"
      ].join("\r\n"));
    }
    if (appt.reminder2h) {
      alarms.push([
        "BEGIN:VALARM",
        "ACTION:DISPLAY",
        `DESCRIPTION:Promemoria Cambia Look: Tra 2 ore hai l'appuntamento a ${salon.name}!`,
        "TRIGGER:-PT2H",
        "END:VALARM"
      ].join("\r\n"));
    }

    const icsRows = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Cambia Look//Agenda Salone//IT",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:cambialook-${appt.id}-${Date.now()}@cambialook.it`,
      `DTSTAMP:${formatUtc(new Date())}`,
      `DTSTART:${formatUtc(startDate)}`,
      `DTEND:${formatUtc(endDate)}`,
      `SUMMARY:Cambia Look - ${appt.service || "Appuntamento Capelli"}`,
      `DESCRIPTION:Salone Cambia Look (${salon.name})\\nTrattamento: ${appt.service}\\nIndirizzo: ${salon.address}\\nTelefono: ${salon.phone}${appt.notes ? `\\nNote: ${appt.notes}` : ""}`,
      `LOCATION:${salon.address}`,
      "STATUS:CONFIRMED",
      ...alarms,
      "END:VEVENT",
      "END:VCALENDAR"
    ];

    const icsContent = icsRows.join("\r\n");
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `appuntamento-cambia-look.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerPushDemo("📲 Evento calendario generato! Tocca 'Aggiungi' sul tuo telefono per attivare i promemoria.");
  };

  // Google Calendar Link generator
  const openGoogleCalendar = (appt: ClientAppointment) => {
    const salon = SALONS.find(s => s.id === appt.salonId) || SALONS[0];
    const [year, month, day] = appt.date.split("-").map(Number);
    const [hour, minute] = appt.time.split(":").map(Number);
    const startDate = new Date(year, month - 1, day, hour, minute);
    const endDate = new Date(startDate.getTime() + 90 * 60 * 1000);

    const pad = (n: number) => n.toString().padStart(2, "0");
    const formatUtc = (d: Date) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

    const title = encodeURIComponent(`Cambia Look - ${appt.service || "Appuntamento Capelli"}`);
    const details = encodeURIComponent(`Appuntamento presso Salone Cambia Look (${salon.name})\nTrattamento: ${appt.service}\nIndirizzo: ${salon.address}\nTelefono: ${salon.phone}\n${appt.notes ? `Note: ${appt.notes}` : ""}`);
    const location = encodeURIComponent(salon.address);
    const dates = `${formatUtc(startDate)}/${formatUtc(endDate)}`;

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(url, "_blank");
    triggerPushDemo("📅 Apertura Google Calendar...");
  };

  // Web Notification API activation
  const handleEnablePushNotifications = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          new Notification("Cambia Look", {
            body: "🔔 Promemoria attivo! Ti ricorderemo il tuo prossimo appuntamento.",
            icon: "/app_icon_192.png"
          });
          triggerPushDemo("✅ Promemoria notifiche attivato con successo sul tuo smartphone!");
        } else {
          triggerPushDemo("⚠️ Notifiche web bloccate. Usa il pulsante 'Salva nel Calendario iPhone / Android'!");
        }
      } catch {
        triggerPushDemo("Promemoria salvato!");
      }
    } else {
      triggerPushDemo("💡 Usa il tasto 'Salva nel Calendario iPhone / Android' per la sveglia nativa del telefono!");
    }
  };

  const handleToggleStaffMode = () => {
    if (isStaffMode) {
      setIsStaffMode(false);
      triggerPushDemo("👤 Modalità Cliente Attiva (Vetrina in sola consultazione)");
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
      triggerPushDemo("👑 Accesso Titolare Salone Attivato! Ora puoi inserire nuovi prodotti con foto.");
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
      : ["Formula professionale salone", "Consigliato dalle nostre stylist"];

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
      desc: newProdDesc || "Prodotto esclusivo disponibile nei saloni Cambia Look di Roma e Cisterna di Latina.",
      benefits: benefitsList,
      img: newProdImage || fallbackImg,
    };

    saveProducts([newProduct, ...productsList]);
    setIsNewProductModalOpen(false);

    setNewProdName("");
    setNewProdPrice("");
    setNewProdDesc("");
    setNewProdBenefits("");
    setNewProdImage("");

    triggerPushDemo(`🎉 Prodotto "${newProduct.name}" pubblicato in vetrina!`);
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
    <div className="max-w-md mx-auto min-h-screen bg-[#D11936] text-white flex flex-col relative select-none font-sans overflow-x-hidden pb-24 shadow-2xl">
      
      {/* SIMULATED PUSH NOTIFICATION */}
      {showNotification && (
        <div className="fixed top-4 left-4 right-4 z-50 animate-in slide-in-from-top duration-300">
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
        <div className="bg-black/90 text-white px-4 py-2 text-xs font-bold flex items-center justify-between sticky top-0 z-50 border-b border-[#E8D3A2]/50">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#E8D3A2]" />
            <span className="text-[11px] font-black uppercase tracking-wider text-[#E8D3A2]">Gestione Vetrina Titolare</span>
          </div>
          <button 
            onClick={handleToggleStaffMode}
            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-[10px] uppercase font-black rounded-lg transition-colors border border-white/20"
          >
            Vista Cliente
          </button>
        </div>
      )}

      {/* HEADER ROSSO CON LOGO ORIGINALE & TASTO ACCESSO TITOLARE */}
      <header className="px-5 pt-8 pb-4 bg-gradient-to-b from-[#B80F29] to-[#D11936] flex items-center justify-between sticky top-0 z-40 border-b border-black/10">
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
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#E8D3A2] block">Salone Donna</span>
            <h1 className="text-xl font-extrabold tracking-tight text-white leading-tight font-script text-2xl">
              Cambia Look
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Tasto Titolare per sbloccare l'inserimento prodotti */}
          <button 
            onClick={handleToggleStaffMode}
            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 transition-all shadow-md ${
              isStaffMode 
                ? "bg-white text-[#D11936] font-bold" 
                : "bg-black/30 text-white/90 border border-white/20 hover:bg-black/50"
            }`}
          >
            {isStaffMode ? <Unlock size={12} /> : <Lock size={12} />}
            <span>{isStaffMode ? "Staff" : "Titolare"}</span>
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
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8D3A2]">Atelier Donna</span>
            <h2 className="text-3xl font-normal font-script text-white drop-shadow">
              I Nostri Saloni
            </h2>
            <div className="w-16 h-0.5 bg-[#E8D3A2] mx-auto rounded-full mt-1" />
          </div>

          {/* BANNER PROMEMORIA PROSSIMO APPUNTAMENTO */}
          {nextUpcomingAppointment && (
            <div 
              onClick={() => setActiveTab("agenda")}
              className="bg-black/50 border-2 border-[#E8D3A2] rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:bg-black/60 transition-all shadow-xl group active:scale-[0.99] relative overflow-hidden"
            >
              <div className="absolute -right-3 -bottom-3 text-[#E8D3A2]/10 pointer-events-none">
                <Calendar size={75} />
              </div>
              <div className="flex items-center gap-3 relative z-10 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#E8D3A2] to-[#B38F46] flex items-center justify-center text-[#D11936] shadow shrink-0">
                  <CalendarCheck size={22} strokeWidth={2.5} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase text-[#E8D3A2] tracking-wider">Il Tuo Appuntamento</span>
                    {getDaysRemaining(nextUpcomingAppointment.date) !== null && (
                      <span className="text-[9px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold">
                        {getDaysRemaining(nextUpcomingAppointment.date) === 0 
                          ? "Oggi! ✨" 
                          : getDaysRemaining(nextUpcomingAppointment.date) === 1 
                          ? "Domani" 
                          : `Tra ${getDaysRemaining(nextUpcomingAppointment.date)} giorni`}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-white capitalize truncate mt-0.5">
                    {formatDateDisplay(nextUpcomingAppointment.date)} • Ore {nextUpcomingAppointment.time}
                  </p>
                  <span className="text-[10px] text-white/70 block truncate">
                    Salone {nextUpcomingAppointment.salonId === "cisterna" ? "Cisterna di Latina" : "Roma"} • {nextUpcomingAppointment.service}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-black text-[#E8D3A2] group-hover:translate-x-1 transition-transform shrink-0 pl-2 relative z-10">
                <span>Agenda</span>
                <ChevronRight size={14} />
              </div>
            </div>
          )}

          {/* LISTA DEI 2 SALONI REALI CON LE FOTO VERE RITAGLIATE DALL'APP PRECEDENTE */}
          <div className="space-y-6">
            {SALONS.map((salon) => (
              <div 
                key={salon.id}
                onClick={() => setSelectedSalon(salon)}
                className="relative cursor-pointer group active:scale-[0.99] transition-all"
              >
                {/* Cornicette dorate ornamentali negli angoli come nell'app precedente */}
                <div className="absolute -top-1.5 -left-1.5 w-6 h-6 gold-corner-tl z-10 pointer-events-none" />
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 gold-corner-br z-10 pointer-events-none" />
                <div className="absolute -top-1 right-2 text-[#E8D3A2] text-xs pointer-events-none">✦</div>
                <div className="absolute -bottom-1 left-2 text-[#E8D3A2] text-xs pointer-events-none">✦</div>

                {/* Card con foto reale del salone */}
                <div className="relative rounded-2xl overflow-hidden bg-black/40 border-2 border-white/90 shadow-2xl h-52">
                  <Image 
                    src={salon.image} 
                    alt={salon.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />

                  {/* Gradient scuro sotto per far risaltare la scritta in corsivo come nell'app originale */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

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
                  <span className="text-[#E8D3A2] font-bold shrink-0 pl-2">Aperto</span>
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
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8D3A2]">Atelier Capelli</span>
            <h2 className="text-3xl font-normal font-script text-white drop-shadow">
              I Nostri Trattamenti
            </h2>
            <p className="text-xs text-white/80">Listino prezzi e trattamenti per sole donne</p>
          </div>

          {/* Services Cards (Vetrina Chiara con Foto e Prezzo) */}
          <div className="space-y-3.5">
            {SERVICES_SHOWCASE.map((serv) => (
              <div 
                key={serv.id}
                onClick={() => setSelectedService(serv)}
                className="p-4 rounded-2xl bg-black/35 backdrop-blur-md border border-white/20 hover:border-[#E8D3A2]/60 transition-all cursor-pointer group active:scale-[0.99] space-y-2.5"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black uppercase tracking-wider text-[#E8D3A2] bg-black/40 px-2 py-0.5 rounded-full">
                        {serv.category}
                      </span>
                      {serv.tag && (
                        <span className="text-[9px] font-bold text-white/80 bg-white/10 px-2 py-0.5 rounded-full">
                          {serv.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#E8D3A2] transition-colors">
                      {serv.name}
                    </h3>
                  </div>
                  <span className="text-base font-black text-[#E8D3A2] shrink-0 bg-black/50 px-2.5 py-1 rounded-xl border border-[#E8D3A2]/30">
                    {serv.price}
                  </span>
                </div>

                <p className="text-xs text-white/80 leading-relaxed font-normal">
                  {serv.desc}
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70">
                  <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#E8D3A2]" /> Durata indicativa: {serv.duration}</span>
                  <span className="text-[#E8D3A2] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Vedi Dettagli <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ========================================================================================= */}
      {/* TAB 3: LA MIA AGENDA (APPUNTAMENTI SALONE & PROMEMORIA TELEFONO) */}
      {/* ========================================================================================= */}
      {activeTab === "agenda" && (
        <main className="flex-1 px-5 pt-4 space-y-6 animate-in fade-in duration-300">
          
          {/* HEADER SEZIONE */}
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8D3A2]">Promemoria Personale</span>
              <h2 className="text-3xl font-normal font-script text-white drop-shadow">
                La Mia Agenda
              </h2>
              <p className="text-xs text-white/80">
                I tuoi appuntamenti segnati con notifica sul telefono
              </p>
            </div>

            <button
              onClick={handleOpenNewAppointmentModal}
              className="py-2.5 px-3.5 rounded-2xl bg-white text-[#D11936] text-xs font-black flex items-center gap-1.5 shadow-xl active:scale-95 transition-all shrink-0 hover:bg-[#E8D3A2]"
            >
              <CalendarPlus size={16} />
              <span>Nuovo</span>
            </button>
          </div>

          {/* NESSUN APPUNTAMENTO SEGNATO */}
          {myAppointments.length === 0 ? (
            <div className="p-6 rounded-3xl bg-black/40 border-2 border-white/80 text-center space-y-4 shadow-2xl relative">
              <div className="w-16 h-16 rounded-2xl bg-white/10 text-[#E8D3A2] mx-auto flex items-center justify-center border border-[#E8D3A2]/40 shadow-inner">
                <CalendarDays size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Nessun Appuntamento Segnato</h3>
                <p className="text-xs text-white/70 leading-relaxed max-w-xs mx-auto">
                  Hai concordato un appuntamento con il salone a Cisterna di Latina o a Roma? Annalo qui: potrai salvarlo sul tuo telefono con allarme e notifica automatica 24 ore e 2 ore prima!
                </p>
              </div>
              <button
                onClick={handleOpenNewAppointmentModal}
                className="w-full py-3.5 rounded-2xl bg-white text-[#D11936] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:bg-[#E8D3A2] active:scale-95 transition-all"
              >
                <Plus size={16} />
                <span>Segna il Tuo Appuntamento</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* LISTA DEGLI APPUNTAMENTI */}
              {sortedAppointments.map((appt) => {
                const salon = SALONS.find(s => s.id === appt.salonId) || SALONS[0];
                const daysRemaining = getDaysRemaining(appt.date);
                const isToday = daysRemaining === 0;
                const isPast = daysRemaining !== null && daysRemaining < 0;

                return (
                  <div
                    key={appt.id}
                    className="relative group transition-all"
                  >
                    {/* Ornamenti dorati negli angoli stile Cambia Look */}
                    <div className="absolute -top-1.5 -left-1.5 w-6 h-6 gold-corner-tl z-10 pointer-events-none" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 gold-corner-br z-10 pointer-events-none" />
                    <div className="absolute -top-1 right-2 text-[#E8D3A2] text-xs pointer-events-none">✦</div>
                    <div className="absolute -bottom-1 left-2 text-[#E8D3A2] text-xs pointer-events-none">✦</div>

                    <div className="p-5 rounded-3xl bg-black/45 backdrop-blur-md border-2 border-white/90 shadow-2xl space-y-4">
                      
                      {/* INTESTAZIONE CARD: SALONE & COUNTDOWN */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#E8D3A2] animate-pulse" />
                          <span className="text-xs font-black uppercase text-[#E8D3A2] tracking-wider">
                            Salone {salon.name}
                          </span>
                        </div>

                        {daysRemaining !== null && (
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow ${
                            isToday
                              ? "bg-amber-400 text-black font-black animate-pulse"
                              : isPast
                              ? "bg-white/15 text-white/50"
                              : daysRemaining === 1
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                              : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          }`}>
                            {isToday ? "Oggi! ✨" : isPast ? "Completato" : daysRemaining === 1 ? "Domani" : `Tra ${daysRemaining} giorni`}
                          </span>
                        )}
                      </div>

                      {/* DATA & ORA GRANDE STILE VIP */}
                      <div className="bg-black/35 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#E8D3A2]">Data Fissata</span>
                          <h4 className="text-base font-extrabold text-white capitalize">
                            {formatDateDisplay(appt.date)}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-black uppercase tracking-wider text-white/60">Orario</span>
                          <div className="text-lg font-black text-[#E8D3A2] flex items-center justify-end gap-1">
                            <Clock size={16} />
                            <span>{appt.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* DETTAGLI TRATTAMENTO & NOTE */}
                      <div className="space-y-2 text-xs">
                        <div className="flex items-start gap-2">
                          <Scissors size={14} className="text-[#E8D3A2] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-white/60 block text-[10px] uppercase font-bold">Trattamento Richiesto</span>
                            <span className="text-white font-bold text-sm">{appt.service}</span>
                          </div>
                        </div>

                        {appt.stylist && (
                          <div className="flex items-center gap-2 text-white/80">
                            <User size={13} className="text-[#E8D3A2] shrink-0" />
                            <span>Stylist di riferimento: <strong className="text-white">{appt.stylist}</strong></span>
                          </div>
                        )}

                        {appt.notes && (
                          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/80 italic">
                            "{appt.notes}"
                          </div>
                        )}

                        <div className="flex items-center gap-2 pt-1">
                          <MapPin size={13} className="text-[#E8D3A2] shrink-0" />
                          <span className="text-[11px] text-white/70 truncate">{salon.address}</span>
                        </div>
                      </div>

                      {/* STATO PROMEMORIA ATTIVI */}
                      <div className="bg-[#80081B]/60 border border-[#E8D3A2]/30 rounded-xl p-2.5 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2 text-white/90">
                          <Bell size={14} className="text-[#E8D3A2]" />
                          <span>Allarmi telefono:</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#E8D3A2]">
                          {appt.reminder24h && <span>🔔 24h prima</span>}
                          {appt.reminder24h && appt.reminder2h && <span>•</span>}
                          {appt.reminder2h && <span>🔔 2h prima</span>}
                        </div>
                      </div>

                      {/* ========================================================================= */}
                      {/* IL PULSANTE PRINCIPALE: SALVA NEL CALENDARIO IPHONE / ANDROID */}
                      {/* ========================================================================= */}
                      <div className="space-y-2 pt-1">
                        <button
                          onClick={() => handleExportIcs(appt)}
                          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-white via-[#FFF8E7] to-[#E8D3A2] text-[#D11936] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:brightness-105 active:scale-95 transition-all border border-[#E8D3A2]"
                        >
                          <Smartphone size={16} />
                          <span>Salva nel Calendario Telefono</span>
                        </button>
                        <p className="text-[10px] text-center text-white/70 leading-tight">
                          ✦ Compatibile con iPhone (Apple Calendar) e Android: aprirà l'evento con il promemoria e la notifica già impostati!
                        </p>
                      </div>

                      {/* PULSANTI SECONDARI CALENDARIO & NOTIFICHE */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => openGoogleCalendar(appt)}
                          className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors border border-white/20"
                        >
                          <Calendar size={13} className="text-[#E8D3A2]" />
                          <span>Google Calendar</span>
                        </button>

                        <button
                          onClick={handleEnablePushNotifications}
                          className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors border border-white/20"
                        >
                          <Bell size={13} className="text-[#E8D3A2]" />
                          <span>Notifiche Telefono</span>
                        </button>
                      </div>

                      {/* CONTATTI DIRETTI AL SALONE */}
                      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10">
                        <a
                          href={`tel:${salon.phone.replace(/\s+/g, '')}`}
                          className="py-2 rounded-xl bg-black/40 hover:bg-black/60 text-white font-bold text-[10px] flex items-center justify-center gap-1 border border-white/15"
                        >
                          <Phone size={11} className="text-[#E8D3A2]" />
                          <span>Chiama</span>
                        </a>

                        <a
                          href={`https://wa.me/${salon.whatsapp}?text=${encodeURIComponent(`Ciao Cambia Look, ho l'appuntamento il ${formatDateDisplay(appt.date)} alle ${appt.time} a ${salon.name}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center gap-1"
                        >
                          <MessageCircle size={11} />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salon.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 rounded-xl bg-black/40 hover:bg-black/60 text-white font-bold text-[10px] flex items-center justify-center gap-1 border border-white/15"
                        >
                          <MapPin size={11} className="text-[#E8D3A2]" />
                          <span>Mappa</span>
                        </a>
                      </div>

                      {/* MODIFICA O CANCELLA */}
                      <div className="flex justify-end gap-3 pt-2 text-xs border-t border-white/10">
                        <button
                          onClick={() => handleEditAppointment(appt)}
                          className="text-white/70 hover:text-white flex items-center gap-1 text-[11px]"
                        >
                          <Edit3 size={12} />
                          <span>Modifica</span>
                        </button>
                        <button
                          onClick={(e) => handleDeleteAppointment(appt.id, e)}
                          className="text-rose-300 hover:text-white flex items-center gap-1 text-[11px]"
                        >
                          <Trash2 size={12} />
                          <span>Rimuovi</span>
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}

              <button
                onClick={handleOpenNewAppointmentModal}
                className="w-full py-3 rounded-2xl bg-black/40 border border-white/25 text-white hover:border-[#E8D3A2] font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <Plus size={15} />
                <span>Segna un Altro Appuntamento</span>
              </button>
            </div>
          )}

          {/* BANNER SPIEGAZIONE NOTIFICHE */}
          <div className="p-4 rounded-2xl bg-black/30 border border-white/15 text-center space-y-1.5">
            <Sparkles size={18} className="mx-auto text-[#E8D3A2]" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Come Funzionano i Promemoria?</h4>
            <p className="text-[11px] text-white/75 leading-relaxed">
              Dopo aver segnato la data, tocca <strong>"Salva nel Calendario Telefono"</strong>. L'app sincronizzerà l'evento con il calendario del tuo dispositivo (iOS o Android) impostando gli allarmi 24h e 2h prima per ricordarti l'orario esatto.
            </p>
          </div>

        </main>
      )}

      {/* ========================================================================================= */}
      {/* TAB 4: VETRINA PRODOTTI (IL PARRUCCHIERE PUÒ INSERIRLI CON FOTO, PREZZO E DESCRIZIONE) */}
      {/* ========================================================================================= */}
      {activeTab === "prodotti" && (
        <main className="flex-1 px-5 pt-4 space-y-5 animate-in fade-in duration-300">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8D3A2]">Boutique Salone</span>
              <h2 className="text-3xl font-normal font-script text-white drop-shadow">
                I Prodotti del Salone
              </h2>
              <p className="text-xs text-white/80">
                {isStaffMode 
                  ? "Pannello Parrucchieri: carica foto, descrizione e prezzo" 
                  : "Le linee professionali che puoi acquistare nei nostri saloni"}
              </p>
            </div>

            {/* PULSANTE AGGIUNGI PRODOTTO (Visibile solo in modalità Titolare) */}
            {isStaffMode && (
              <button
                onClick={() => setIsNewProductModalOpen(true)}
                className="py-2.5 px-3.5 rounded-2xl bg-white text-[#D11936] text-xs font-black flex items-center gap-1.5 shadow-xl active:scale-95 transition-all shrink-0 hover:bg-[#E8D3A2]"
              >
                <Plus size={16} />
                <span>Nuovo Prodotto</span>
              </button>
            )}
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
                  {/* Tasto elimina prodotto per lo Staff */}
                  {isStaffMode && (
                    <button
                      onClick={(e) => handleDeleteProduct(prod.id, e)}
                      className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-black/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shadow-lg border border-white/20"
                      title="Elimina prodotto"
                    >
                      <Trash2 size={13} />
                    </button>
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
                      <span className="text-[10px] font-bold text-white/70 group-hover:text-white">Dettagli →</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="p-4 rounded-2xl bg-black/30 border border-white/15 text-center space-y-1">
            <ShoppingBag size={20} className="mx-auto text-[#E8D3A2]" />
            <h4 className="text-xs font-bold text-white">Acquisto Diretto in Salone</h4>
            <p className="text-[11px] text-white/75 leading-relaxed">
              Tutti i prodotti del catalogo sono disponibili per l'acquisto nei saloni di Roma e Cisterna di Latina.
            </p>
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
            {SALONS.map((salon) => (
              <div key={salon.id} className="p-5 rounded-2xl bg-black/40 border border-white/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-script text-white">{salon.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    Aperto Mar - Sab
                  </span>
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

                <div className="pt-2 flex gap-2">
                  <button 
                    onClick={() => triggerPushDemo(`📞 Chiamata al salone di ${salon.name} (${salon.phone})`)}
                    className="flex-1 py-2 px-3 rounded-xl bg-white text-[#D11936] font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                  >
                    <Phone size={13} />
                    <span>Chiama Ora</span>
                  </button>
                  <button 
                    onClick={() => triggerPushDemo(`💬 Apertura chat WhatsApp con il salone di ${salon.name}`)}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* BOX ACCESSO TITOLARE SALONE */}
          <div className="p-5 rounded-2xl bg-black/50 border border-[#E8D3A2]/40 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#E8D3A2]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Area Parrucchieri (Titolare)</h4>
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              Attiva la modalità titolare per fotografare con lo smartphone i prodotti in salone, inserire il prezzo e la descrizione e pubblicarli nell'app per le clienti.
            </p>
            <button
              onClick={handleToggleStaffMode}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white text-white hover:text-[#D11936] text-xs font-bold transition-all border border-white/20"
            >
              {isStaffMode ? "Passa a Vista Cliente" : "Sblocca Gestione Salone (PIN: 1234)"}
            </button>
          </div>
        </main>
      )}

      {/* ========================================================================================= */}
      {/* POPUP: DETTAGLIO SALONE SELEZIONATO */}
      {/* ========================================================================================= */}
      {selectedSalon && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#9E0B22] border-t-2 border-[#E8D3A2] rounded-t-[32px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] flex flex-col">
            <div className="relative h-56 w-full">
              <Image src={selectedSalon.image} alt={selectedSalon.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#9E0B22] via-transparent to-transparent" />
              <button 
                onClick={() => setSelectedSalon(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-3 left-5">
                <span className="text-[10px] text-[#E8D3A2] uppercase tracking-wider font-bold block">Salone Cambia Look</span>
                <h3 className="text-3xl font-script text-white drop-shadow-md">{selectedSalon.name}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto no-scrollbar">
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

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button 
                  onClick={() => triggerPushDemo(`📞 Chiamata al salone di ${selectedSalon.name}`)}
                  className="py-3 px-4 rounded-xl bg-white text-[#D11936] font-bold text-xs flex items-center justify-center gap-2 shadow"
                >
                  <Phone size={15} />
                  <span>Chiama Salone</span>
                </button>
                <button 
                  onClick={() => triggerPushDemo(`💬 Apertura chat WhatsApp (${selectedSalon.name})`)}
                  className="py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
                >
                  <MessageCircle size={16} />
                  <span>Scrivi su WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* POPUP: DETTAGLIO SERVIZIO (SOLA CONSULTAZIONE) */}
      {/* ========================================================================================= */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#9E0B22] border-t-2 border-[#E8D3A2] rounded-t-[32px] p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-[#E8D3A2] font-bold uppercase tracking-wider">{selectedService.category}</span>
                <h3 className="text-lg font-bold text-white">{selectedService.name}</h3>
                <span className="text-xs text-white/70">Durata indicativa: {selectedService.duration}</span>
              </div>
              <button onClick={() => setSelectedService(null)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80">
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-white/90 leading-relaxed font-normal">
              {selectedService.desc}
            </p>

            <div className="p-3 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/70">Prezzo in salone:</span>
              <span className="text-xl font-black text-[#E8D3A2]">{selectedService.price}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-center space-y-1">
              <p className="text-xs text-white/80 font-normal">
                Disponibile nei saloni Cambia Look di Roma e Cisterna di Latina.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* POPUP: DETTAGLIO PRODOTTO (SOLA CONSULTAZIONE / NO PRENOTAZIONI) */}
      {/* ========================================================================================= */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#9E0B22] border-t-2 border-[#E8D3A2] rounded-t-[32px] p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[88vh] overflow-y-auto no-scrollbar">
            
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-[#E8D3A2] font-bold uppercase tracking-wider">{selectedProduct.brand}</span>
                <h3 className="text-base font-bold text-white">{selectedProduct.name}</h3>
                <span className="text-xs text-white/70">{selectedProduct.size}</span>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80">
                <X size={16} />
              </button>
            </div>

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
                  <Plus size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Aggiungi Prodotto in Vetrina</h3>
                  <span className="text-[10px] text-white/70">Scatta foto, imposta prezzo e descrizione</span>
                </div>
              </div>
              <button onClick={() => setIsNewProductModalOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3.5 text-xs">
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
                <span>Pubblica in Vetrina</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* MODAL PIN TITOLARE */}
      {/* ========================================================================================= */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xs bg-[#80081B] border-2 border-[#E8D3A2] rounded-3xl p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#E8D3A2] mx-auto flex items-center justify-center border border-[#E8D3A2]/40">
              <Lock size={22} />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">Accesso Staff Salone</h3>
              <p className="text-[11px] text-white/70 mt-1">
                Inserisci il PIN per scattare foto e aggiungere prodotti (PIN demo: <strong className="text-white">1234</strong>)
              </p>
            </div>

            <input
              type="password"
              maxLength={4}
              placeholder="••••"
              value={pinInput}
              onChange={e => setPinInput(e.target.value)}
              className="w-32 mx-auto text-center text-xl tracking-widest px-3 py-2 rounded-2xl bg-black/50 border border-[#E8D3A2] text-white outline-none"
            />

            {pinError && (
              <p className="text-[10px] text-amber-300 font-bold">PIN errato. Prova 1234</p>
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
                className="flex-1 py-2.5 rounded-xl bg-white text-[#D11936] text-xs font-black shadow-lg hover:bg-[#E8D3A2]"
              >
                Sblocca
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* MODAL: SEGNA / MODIFICA APPUNTAMENTO CLIENTE (AGENDA & PROMEMORIA TELEFONO) */}
      {/* ========================================================================================= */}
      {isAppointmentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-end sm:items-center justify-center p-3 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-[#80081B] border-2 border-[#E8D3A2] rounded-3xl p-5 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 text-[#E8D3A2] flex items-center justify-center border border-[#E8D3A2]/40">
                  <Calendar size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {editingAppointmentId ? "Modifica Appuntamento" : "Segna il Tuo Appuntamento"}
                  </h3>
                  <p className="text-[10px] text-white/70">
                    Sincronizza data e orario con il promemoria dello smartphone
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsAppointmentModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSaveAppointment} className="space-y-3.5 text-xs text-left">
              
              {/* Salone */}
              <div>
                <label className="font-bold text-white/90 block mb-1.5">Scegli il Salone *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormSalonId("cisterna")}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      formSalonId === "cisterna"
                        ? "bg-white text-[#D11936] font-black border-white shadow-md"
                        : "bg-black/40 text-white/80 border-white/20 hover:text-white"
                    }`}
                  >
                    <span className="block font-bold text-xs">Cisterna di Latina</span>
                    <span className="text-[9px] opacity-80 block truncate">Corso della Repubblica</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormSalonId("roma")}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      formSalonId === "roma"
                        ? "bg-white text-[#D11936] font-black border-white shadow-md"
                        : "bg-black/40 text-white/80 border-white/20 hover:text-white"
                    }`}
                  >
                    <span className="block font-bold text-xs">Roma</span>
                    <span className="text-[9px] opacity-80 block truncate">Via delle Cave, 72</span>
                  </button>
                </div>
              </div>

              {/* Data dell'appuntamento */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-white/90">Data dell'Appuntamento *</label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        const d = new Date();
                        const pad = (n: number) => n.toString().padStart(2, "0");
                        setFormDate(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
                      }}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/80"
                    >
                      Oggi
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const d = new Date();
                        d.setDate(d.getDate() + 1);
                        const pad = (n: number) => n.toString().padStart(2, "0");
                        setFormDate(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
                      }}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/80"
                    >
                      Domani
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const d = new Date();
                        const diff = (6 - d.getDay() + 7) % 7 || 7;
                        d.setDate(d.getDate() + diff);
                        const pad = (n: number) => n.toString().padStart(2, "0");
                        setFormDate(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
                      }}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-[#E8D3A2]/20 hover:bg-[#E8D3A2]/30 text-[#E8D3A2] font-bold"
                    >
                      Sabato
                    </button>
                  </div>
                </div>
                <input
                  type="date"
                  required
                  value={formDate}
                  onChange={e => setFormDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/20 text-white outline-none font-bold"
                />
              </div>

              {/* Orario */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-white/90">Orario *</label>
                  <div className="flex items-center gap-1">
                    {["09:30", "11:00", "15:00", "16:30", "18:00"].map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFormTime(t)}
                        className={`text-[9px] px-1.5 py-0.5 rounded transition-colors ${
                          formTime === t ? "bg-white text-[#D11936] font-bold" : "bg-white/10 text-white/70 hover:bg-white/20"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="time"
                  required
                  value={formTime}
                  onChange={e => setFormTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-[#E8D3A2]/60 text-[#E8D3A2] font-black outline-none text-base tracking-wider"
                />
              </div>

              {/* Trattamento / Servizio */}
              <div>
                <label className="font-bold text-white/90 block mb-1">Trattamento Richiesto *</label>
                <select
                  value={formService}
                  onChange={e => setFormService(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white outline-none font-medium"
                >
                  <option value="Balayage Soleil & Gloss Tonificante">Balayage Soleil & Gloss Tonificante</option>
                  <option value="Taglio Sartoriale Donna & Piega Glamour">Taglio Sartoriale Donna & Piega Glamour</option>
                  <option value="Botox Capillare & Cheratina Rimpolpante">Botox Capillare & Cheratina Rimpolpante</option>
                  <option value="Colore Radici Botanico No Ammoniaca">Colore Radici Botanico No Ammoniaca</option>
                  <option value="Piega Glamour & Trattamento Lucidante">Piega Glamour & Trattamento Lucidante</option>
                  <option value="Consulenza Completa Cambio Look">Consulenza Completa Cambio Look</option>
                  <option value="Altro / Trattamento Personalizzato">Altro / Trattamento Personalizzato</option>
                </select>
              </div>

              {/* Stylist & Note */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-white/90 block mb-1">Stylist (Opzionale)</label>
                  <input
                    type="text"
                    placeholder="Es. Simona / Giorgia"
                    value={formStylist}
                    onChange={e => setFormStylist(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-white/90 block mb-1">Note (Opzionale)</label>
                  <input
                    type="text"
                    placeholder="Es. Onde finish"
                    value={formNotes}
                    onChange={e => setFormNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 outline-none text-xs"
                  />
                </div>
              </div>

              {/* Opzioni Promemoria Telefono */}
              <div className="p-3 rounded-2xl bg-black/40 border border-[#E8D3A2]/40 space-y-2">
                <span className="text-[10px] font-black uppercase text-[#E8D3A2] tracking-wider block">
                  🔔 Promemoria Notifica Telefono
                </span>
                
                <label className="flex items-center gap-2 cursor-pointer text-[11px] text-white/90">
                  <input
                    type="checkbox"
                    checked={formReminder24h}
                    onChange={e => setFormReminder24h(e.target.checked)}
                    className="w-4 h-4 rounded text-[#D11936] accent-[#D11936]"
                  />
                  <span>Avvisami 24 ore prima (il giorno prima)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[11px] text-white/90">
                  <input
                    type="checkbox"
                    checked={formReminder2h}
                    onChange={e => setFormReminder2h(e.target.checked)}
                    className="w-4 h-4 rounded text-[#D11936] accent-[#D11936]"
                  />
                  <span>Avvisami 2 ore prima dell'appuntamento</span>
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAppointmentModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-colors"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-white to-[#E8D3A2] text-[#D11936] font-black text-xs uppercase tracking-wider shadow-xl hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <Check size={16} />
                  <span>{editingAppointmentId ? "Aggiorna Agenda" : "Salva in Agenda"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* BOTTOM NAVIGATION BAR (VETRINA ROSSO CAMBIA LOOK - 5 TABS) */}
      {/* ========================================================================================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#A60F25]/95 backdrop-blur-xl border-t border-black/20 max-w-md mx-auto safe-pb shadow-[0_-5px_25px_rgba(0,0,0,0.4)]">
        <div className="grid grid-cols-5 h-16 items-center px-1">
          {[
            { id: "saloni", label: "Saloni", icon: Store },
            { id: "servizi", label: "Servizi", icon: Scissors },
            { id: "agenda", label: "Mia Agenda", icon: Calendar, badge: myAppointments.length > 0 },
            { id: "prodotti", label: "Prodotti", icon: ShoppingBag },
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
                <div className={`p-1 rounded-xl transition-all relative ${isActive ? "bg-white text-[#D11936] shadow-md scale-105" : ""}`}>
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  {tab.badge && !isActive && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#E8D3A2] ring-2 ring-[#A60F25]" />
                  )}
                </div>
                <span className={`text-[9.5px] truncate max-w-[62px] text-center ${isActive ? "font-black text-white" : "font-medium"}`}>
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
