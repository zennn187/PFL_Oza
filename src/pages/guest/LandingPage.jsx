import React, { useEffect, useState, useRef } from "react";
import {
  ArrowRight,
  Beef,
  CakeSlice,
  ChefHat,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Coffee,
  Fish,
  Flame,
  Heart,
  Leaf,
  Pizza,
  Plus,
  Salad,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Utensils,
  X,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import burgerImage from "../../assets/burger_floating.png";
import heroSlideBangkokTable from "../../assets/hero_slide_bangkok_table.jpg";
import heroSlideGrazingTable from "../../assets/hero_slide_grazing_table.jpg";
import heroSlideLoungeDining from "../../assets/hero_slide_lounge_dining.jpg";
import heroSlideSeafoodPlatter from "../../assets/hero_slide_seafood_platter.jpg";
import { useCart } from "../../lib/CartContext";
import { useNavigate } from "react-router-dom";

const heroSlides = [
  {
    image: heroSlideLoungeDining,
    label: "Signature Dining",
    title: "Plating elegan untuk momen spesial",
  },
  {
    image: heroSlideGrazingTable,
    label: "Private Gathering",
    title: "Spread mewah untuk acara intimate",
  },
  {
    image: heroSlideSeafoodPlatter,
    label: "Seafood Selection",
    title: "Bahan laut premium, disajikan fresh",
  },
  {
    image: heroSlideBangkokTable,
    label: "Chef's Table",
    title: "Hidangan hangat dengan rasa berkarakter",
  },
];

function ScrollReveal({ children, delay = 0 }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) will-change-[transform,opacity] ${
        isIntersecting
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-12 scale-[0.98]"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function LandingPage({ authState, setAuthState }) {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const { cartItems, totalPrice, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const categories = [
    { name: "Pizza", icon: Pizza, active: true, items: "18 menu" },
    { name: "Seafood", icon: Fish, active: false, items: "12 menu" },
    { name: "Salad", icon: Salad, active: false, items: "9 menu" },
    { name: "Pasta", icon: Utensils, active: false, items: "14 menu" },
    { name: "Burger", icon: Beef, active: false, items: "11 menu" },
    { name: "Dessert", icon: CakeSlice, active: false, items: "16 menu" },
    { name: "Minuman", icon: Coffee, active: false, items: "21 menu" },
  ];

  const trendingOrders = [
    {
      name: "Premium Seafood Platter",
      desc: "Udang, cumi, ikan bakar, saus lemon butter",
      price: "Rp 285.000",
      rating: 4.8,
      accent: "from-cyan-50 to-orange-50",
      icon: Fish,
    },
    {
      name: "Mushroom Pizza Deluxe",
      desc: "Mozzarella, jamur panggang, basil segar",
      price: "Rp 145.000",
      rating: 4.7,
      accent: "from-orange-50 to-amber-50",
      icon: Pizza,
    },
    {
      name: "Beef Burger Premium",
      desc: "Patty tebal, smoked cheese, caramelized onion",
      price: "Rp 95.000",
      rating: 4.6,
      accent: "from-red-50 to-orange-50",
      icon: Beef,
    },
    {
      name: "Green Garden Salad",
      desc: "Sayur organik, alpukat, honey mustard",
      price: "Rp 68.000",
      rating: 4.9,
      accent: "from-emerald-50 to-lime-50",
      icon: Salad,
    },
  ];

  const reasons = [
    {
      icon: Leaf,
      title: "Bahan Fresh Harian",
      desc: "Bahan dipilih setiap pagi agar rasa tetap bersih dan konsisten.",
    },
    {
      icon: ChefHat,
      title: "Chef Berpengalaman",
      desc: "Setiap menu diracik dengan standar dapur profesional.",
    },
    {
      icon: Truck,
      title: "Pengiriman Cepat",
      desc: "Pesanan dikirim hangat dengan estimasi mulai 30 menit.",
    },
    {
      icon: ShieldCheck,
      title: "Kualitas Terjaga",
      desc: "Kemasan rapi, porsi jelas, dan rasa sesuai ekspektasi.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Food enthusiast",
      comment:
        "Rasanya konsisten enak, plating rapi, and seafood-nya terasa fresh.",
    },
    {
      name: "Michael Chen",
      role: "Regular customer",
      comment:
        "Pilihan menu lengkap. Cocok buat makan siang kantor maupun acara kecil.",
    },
    {
      name: "Emma Rodriguez",
      role: "Verified buyer",
      comment:
        "Pengiriman cepat, makanan masih hangat, dan porsinya memuaskan.",
    },
  ];

  const handleLogoutAction = () => {
    localStorage.removeItem("user_session");
    setAuthState("guest");
  };

  const showPreviousHeroSlide = () => {
    setActiveHeroSlide((current) =>
      current === 0 ? heroSlides.length - 1 : current - 1
    );
  };

  const showNextHeroSlide = () => {
    setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] text-slate-950 font-sans antialiased overflow-x-hidden selection:bg-orange-500 selection:text-white scroll-smooth">
      <style>
        {`
          @keyframes heroSlideFrameFloat {
            0%, 100% {
              transform: translate3d(-50%, 0, 0) rotate3d(0, 0, 1, -0.5deg);
            }
            50% {
              transform: translate3d(-50%, -10px, 0) rotate3d(0, 0, 1, 0.5deg);
            }
          }

          @keyframes heroSlideGlow {
            0%, 100% {
              opacity: 0.3;
              transform: translate3d(-50%, 0, 0) scale3d(0.98, 0.98, 1);
            }
            50% {
              opacity: 0.5;
              transform: translate3d(-50%, 0, 0) scale3d(1.02, 1.02, 1);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translate3d(0, 20px, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes floatBurger {
            0%, 100% { transform: translate3d(0, 0, 0) rotate3d(0, 0, 1, 0deg); }
            50% { transform: translate3d(0, -10px, 0) rotate3d(0, 0, 1, 2deg); }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .animate-float-burger {
            animation: floatBurger 4s ease-in-out infinite;
          }

          .delay-1 { animation-delay: 100ms; }
          .delay-2 { animation-delay: 200ms; }

          .gpu-accelerated {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000px;
            will-change: transform, opacity;
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-slide-frame,
            .hero-slide-glow,
            .animate-fade-in-up,
            .animate-float-burger,
            .transition-all {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
              transition: none !important;
            }
          }
        `}
      </style>
      <Navbar
        isAuthenticated={authState === "authenticated"}
        onLogout={handleLogoutAction}
      />

      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#ffedd5_0,#fff7ed_30%,#ffffff_64%)] px-4 pb-16 pt-28 sm:px-8 lg:pb-24 lg:pt-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
            <div className="max-w-3xl text-left animate-fade-in-up">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-bold text-orange-600 shadow-sm transition-all duration-300 hover:bg-orange-50 hover:border-orange-300 cursor-default">
                <Sparkles className="h-4 w-4 animate-pulse" />
                Premium catering, dibuat saat dipesan
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Sajian hangat untuk acara yang terasa lebih berkesan.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                On-Catering membantu kamu memesan hidangan pilihan dengan bahan
                segar, proses dapur terukur, dan pengiriman yang rapi sampai ke
                lokasi.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#trending-orders"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-xl shadow-slate-950/15 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-orange-600/20 active:scale-95 group"
                >
                  Pesan Sekarang
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="#menu-category"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:text-orange-600 active:scale-95"
                >
                  Lihat Menu
                </a>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 sm:gap-5">
                {[
                  ["6.000+", "Pelanggan"],
                  ["4.9/5", "Rating"],
                  ["500+", "Menu"],
                ].map(([value, label], index) => (
                  <div
                    key={label}
                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                    className="animate-fade-in-up rounded-2xl border border-orange-100 bg-white/75 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:border-orange-300 hover:bg-white hover:shadow-md group"
                  >
                    <p className="text-2xl font-black text-slate-950 sm:text-3xl transition-transform duration-300 group-hover:scale-105 origin-left">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[420px] lg:min-h-[560px] animate-fade-in-up delay-1">
              <div className="absolute right-0 top-8 h-72 w-72 rounded-full bg-orange-200/60 blur-3xl mix-blend-multiply filter" />
              <div className="absolute bottom-4 left-4 h-52 w-52 rounded-full bg-emerald-100 blur-3xl mix-blend-multiply filter" />

              <div className="absolute inset-x-4 bottom-0 top-12 rounded-[2rem] border border-orange-100 bg-white/70 shadow-2xl shadow-orange-900/10 backdrop-blur" />

              <div
                className="hero-slide-glow absolute left-1/2 top-20 h-72 w-[80%] max-w-[480px] rounded-[2rem] bg-orange-300/35 blur-3xl gpu-accelerated"
                style={{
                  animation: "heroSlideGlow 5s linear infinite",
                }}
              />

              <div
                className="hero-slide-frame absolute left-1/2 top-10 z-10 w-[88%] max-w-[520px] overflow-hidden rounded-[1.75rem] border border-white/80 bg-slate-950 shadow-2xl shadow-orange-950/20 ring-8 ring-white/45 group/hero gpu-accelerated"
                style={{
                  animation: "heroSlideFrameFloat 5s ease-in-out infinite",
                }}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-950 rounded-[1.6rem]">
                  {heroSlides.map((slide, index) => {
                    const isCurrent = activeHeroSlide === index;
                    return (
                      <div
                        key={slide.title}
                        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${
                          isCurrent
                            ? "opacity-100 z-10"
                            : "opacity-0 z-0 pointer-events-none"
                        }`}
                      >
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className={`h-full w-full object-cover transition-transform duration-[5000ms] ease-out will-change-transform ${
                            isCurrent ? "scale-105 translate-x-0.5" : "scale-100 translate-x-0"
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-transparent z-10" />
                        
                        <div className="absolute inset-x-0 bottom-0 p-5 text-left text-white sm:p-6 z-20">
                          <p
                            className={`text-xs font-black uppercase tracking-[0.2em] text-orange-300 transition-all duration-500 transform ${
                              isCurrent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                            }`}
                            style={{ transitionDelay: isCurrent ? "200ms" : "0ms" }}
                          >
                            {slide.label}
                          </p>
                          <p
                            className={`mt-2 max-w-sm text-xl font-black leading-tight sm:text-2xl transition-all duration-500 transform ${
                              isCurrent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                            }`}
                            style={{ transitionDelay: isCurrent ? "350ms" : "0ms" }}
                          >
                            {slide.title}
                          </p>
                          <div className="mt-4 flex gap-2">
                            {heroSlides.map((_, dotIndex) => (
                              <button
                                key={dotIndex}
                                type="button"
                                aria-label={`Tampilkan slide ${dotIndex + 1}`}
                                onClick={() => setActiveHeroSlide(dotIndex)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  activeHeroSlide === dotIndex
                                    ? "w-9 bg-orange-400"
                                    : "w-3 bg-white/50 hover:bg-white"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    aria-label="Tampilkan foto sebelumnya"
                    onClick={showPreviousHeroSlide}
                    className="absolute left-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/20 text-white shadow-xl backdrop-blur-md opacity-0 group-hover/hero:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-orange-300 sm:left-5 sm:h-12 sm:w-12"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Tampilkan foto berikutnya"
                    onClick={showNextHeroSlide}
                    className="absolute right-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/20 text-white shadow-xl backdrop-blur-md opacity-0 group-hover/hero:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-orange-300 sm:right-5 sm:h-12 sm:w-12"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="absolute bottom-8 left-0 z-20 flex items-center gap-4 rounded-2xl border border-white/70 bg-white/90 p-4 text-left shadow-xl backdrop-blur transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-transform duration-300 hover:rotate-12">
                  <Clock3 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-950">
                    30 menit
                  </p>
                  <p className="text-xs font-semibold text-slate-500">
                    estimasi pengiriman
                  </p>
                </div>
              </div>

              <div className="absolute right-0 top-2 z-20 rounded-2xl border border-white/70 bg-white/90 p-4 text-left shadow-xl backdrop-blur transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl group">
                <div className="mb-2 flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current transition-transform duration-300 group-hover:scale-110" style={{ transitionDelay: `${i * 50}ms` }} />
                  ))}
                </div>
                <p className="text-sm font-black text-slate-950">
                  Favorit pelanggan
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  2.400+ ulasan positif
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="mb-10 flex flex-col justify-between gap-4 text-left md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
                    Keunggulan
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                    Dibuat untuk pesanan yang rapi dari awal sampai akhir.
                  </h2>
                </div>
                <p className="max-w-xl text-sm leading-7 text-slate-600">
                  Cocok untuk makan siang tim, acara keluarga, meeting, dan
                  kebutuhan catering harian.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {reasons.map((item, index) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.title} delay={index * 100}>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:border-orange-200 hover:bg-white hover:shadow-xl hover:shadow-orange-900/5 group h-full">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white group-hover:rotate-6">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-black text-slate-950 transition-colors duration-300 group-hover:text-orange-600">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-8" id="menu-category">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="mb-8 flex flex-col justify-between gap-4 text-left md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
                    Kategori Menu
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                    Pilih sesuai mood dan kebutuhan acara.
                  </h2>
                </div>
                <button className="inline-flex w-max items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:text-orange-600 hover:ring-orange-200 hover:-translate-y-0.5 active:scale-95 group">
                  Semua Kategori
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
              {categories.map((cat, index) => {
                const Icon = cat.icon;
                return (
                  <ScrollReveal key={cat.name} delay={index * 60}>
                    <button
                      className={`group w-full min-h-32 rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-1 active:scale-95 ${
                        cat.active
                          ? "border-orange-500 bg-slate-950 text-white shadow-xl shadow-slate-950/15"
                          : "border-slate-100 bg-white text-slate-800 shadow-sm hover:border-orange-200 hover:shadow-md"
                      }`}
                    >
                      <div
                        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                          cat.active
                            ? "bg-orange-50 text-white"
                            : "bg-orange-50 text-orange-600 group-hover:bg-orange-100"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="font-black transition-colors duration-300 group-hover:text-orange-500">{cat.name}</p>
                      <p
                        className={`mt-1 text-xs font-bold transition-colors duration-300 ${
                          cat.active ? "text-white/65" : "text-slate-400"
                        }`}
                      >
                        {cat.items}
                      </p>
                    </button>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-8" id="trending-orders">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <ScrollReveal>
                <div className="mb-8 flex flex-col justify-between gap-4 text-left md:flex-row md:items-end">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
                      Menu Populer
                    </p>
                    <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                      Banyak dipesan minggu ini.
                    </h2>
                  </div>
                  <button className="inline-flex w-max items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-600/20 transition-all duration-300 hover:bg-slate-950 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 group">
                    Lihat Semua
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {trendingOrders.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <ScrollReveal key={item.name} delay={index * 150}>
                      <article className="group rounded-3xl border border-slate-100 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-900/5 h-full flex flex-col justify-between">
                        <div>
                          <div
                            className={`mb-5 flex h-32 items-center justify-center rounded-2xl bg-gradient-to-br transition-all duration-500 group-hover:bg-gradient-to-tl ${item.accent}`}
                          >
                            <Icon className="h-16 w-16 text-orange-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" />
                          </div>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-black text-slate-950 transition-colors duration-300 group-hover:text-orange-600">
                                {item.name}
                              </h3>
                              <p className="mt-2 text-sm leading-6 text-slate-500">
                                {item.desc}
                              </p>
                            </div>
                            <button
                              onClick={() => addToCart({ name: item.name, price: item.price, icon: item.icon })}
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white transition-all duration-300 hover:bg-orange-600 hover:rotate-90 active:scale-90 shadow-md"
                              aria-label={`Tambah ${item.name}`}
                            >
                              <Plus className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                          <p className="text-xl font-black text-orange-600 transition-transform duration-300 group-hover:scale-105">
                            {item.price}
                          </p>
                          <div className="flex items-center gap-1 text-sm font-black text-slate-700">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            {item.rating}
                          </div>
                        </div>
                      </article>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:h-max">
              <ScrollReveal delay={200}>
                <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white text-left shadow-xl shadow-orange-900/5 transition-all duration-300 hover:shadow-2xl">
                  <div className="relative bg-slate-950 p-6 text-white overflow-hidden group/cart">
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-500/30 blur-2xl transition-all duration-500 group-hover/cart:scale-120" />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-300">
                          Keranjang
                        </p>
                        <h3 className="mt-2 text-2xl font-black">My Cart</h3>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 transition-all duration-300 group-hover/cart:bg-orange-500 group-hover/cart:rotate-12">
                        <ShoppingBag className="h-6 w-6" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-5">
                    {cartItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.name}
                          className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 transition-all duration-300 hover:bg-white hover:border-orange-100 hover:shadow-sm group/item"
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-orange-600 shadow-sm transition-transform duration-300 group-hover/item:scale-105">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-black text-slate-950">
                              {item.name}
                            </p>
                            <p className="mt-1 text-xs font-semibold text-slate-500">
                              {item.qty} item - {item.price}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.name)}
                            className="text-slate-400 transition-all duration-300 hover:text-red-500 hover:scale-110 p-1"
                            aria-label={`Hapus ${item.name}`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })}

                    <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-4 transition-colors duration-300 hover:bg-orange-50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-slate-600">
                          Subtotal
                        </span>
                        <span className="font-black text-slate-950">
                          {formatRupiah(totalPrice)}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="font-semibold text-slate-600">
                          Delivery
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-black text-emerald-700 animate-pulse">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Gratis
                        </span>
                      </div>
                      <div className="mt-4 flex items-end justify-between border-t border-orange-200 pt-4">
                        <span className="font-black text-slate-950">Total</span>
                        <span className="text-2xl font-black text-orange-600">
                          {formatRupiah(totalPrice)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (cartItems.length === 0) return;

                        if (authState === "guest") {
                          toast.info("Silakan login dulu untuk melanjutkan checkout.");
                          navigate("/login", {
                            state: { checkout: { cartItems, totalPrice } },
                          });
                          return;
                        }

                        navigate("/checkout", {
                          state: { cartItems, totalPrice },
                        });
                      }}
                      disabled={cartItems.length === 0}
                      className={`flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-black text-white shadow-lg transition-all duration-300 group ${
                        cartItems.length > 0
                          ? "bg-orange-600 shadow-orange-600/20 hover:bg-slate-950 hover:shadow-xl active:scale-98 cursor-pointer"
                          : "bg-slate-200 text-slate-400 shadow-none cursor-not-allowed"
                      }`}
                    >
                      Checkout
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="mb-12 text-center">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
                  Ulasan Pelanggan
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Apa kata mereka tentang kami?
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {testimonials.map((testi, index) => (
                <ScrollReveal key={testi.name} delay={index * 150}>
                  <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 text-left shadow-sm transition-all duration-300 hover:bg-white hover:border-orange-200 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col justify-between group">
                    <div>
                      <div className="mb-4 flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm leading-7 text-slate-700 italic">
                        "{testi.comment}"
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-black text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                        {testi.name[0]}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-950">{testi.name}</h4>
                        <p className="text-xs font-semibold text-slate-400">{testi.role}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 pt-10 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="group/cta relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-orange-500 to-amber-600 px-6 py-12 text-left text-white shadow-2xl shadow-orange-900/20 sm:px-12 md:p-20">
                <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-black/10 blur-3xl" />
                
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_320px]">
                  <div className="relative z-10 max-w-2xl">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em]">
                      <Flame className="h-4 w-4 animate-pulse" />
                      Dapur Higienis Profesional
                    </div>
                    <h2 className="text-3xl font-black tracking-tight sm:text-5xl leading-[1.1]">
                      Siap pesan hidangan favorit Anda?
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-orange-50/90">
                      Pilih ragam menu katering terbaik Anda sekarang, atur kuantitas sesuai tipe event, 
                      dan biarkan para juru masak ahli On-Catering menyiapkannya secara sempurna.
                    </p>
                    <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-xl transition-all duration-300 hover:bg-white hover:text-orange-600 hover:-translate-y-1 active:scale-95 group/btn">
                      Mulai Pemesanan
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>

                  <div className="relative flex justify-center md:justify-end items-center min-h-[180px] sm:min-h-[220px] md:min-h-0">
                    <img
                      src={burgerImage}
                      alt="Burger premium On-Catering"
                      className="w-44 sm:w-56 md:w-72 lg:w-80 drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)] animate-float-burger transition-transform duration-500 group-hover/cta:scale-105 object-contain"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </div>
  );
}