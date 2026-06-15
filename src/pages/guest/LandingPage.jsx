import React, { useState } from "react";
import Navbar from "../../components/Navbar";

export default function LandingPage({ authState, setAuthState }) {
  const [cartOpen, setCartOpen] = useState(false);

  const categories = [
    { name: "Pizza", icon: "🍕", active: true },
    { name: "Seafood", icon: "🦞", active: false },
    { name: "Salad", icon: "🥗", active: false },
    { name: "Pasta", icon: "🍝", active: false },
    { name: "Burger", icon: "🍔", active: false },
    { name: "Dessert", icon: "🍰", active: false },
    { name: "Beverage", icon: "🥤", active: false },
  ];

  const trendingOrders = [
    { name: "Premium Seafood Platter", desc: "850 Calories · 2-3 persons", price: "Rp 285.000", img: "🦞", rating: 4.8 },
    { name: "Grilled Fish Specialty", desc: "720 Calories · 2 persons", price: "Rp 195.000", img: "🐟", rating: 4.9 },
    { name: "Mushroom Pizza Deluxe", desc: "580 Calories · 3 persons", price: "Rp 145.000", img: "🍕", rating: 4.7 },
    { name: "Beef Burger Premium", desc: "620 Calories · 1 person", price: "Rp 95.000", img: "🍔", rating: 4.6 },
  ];

  const whyChooseUs = [
    { icon: "🌊", title: "Fresh Daily", desc: "Premium ingredients sourced fresh every morning" },
    { icon: "👨‍🍳", title: "Expert Chefs", desc: "Prepared by award-winning culinary professionals" },
    { icon: "⚡", title: "Fast Delivery", desc: "Hot food delivered in 30 minutes or less" },
    { icon: "💚", title: "Quality First", desc: "100% satisfaction guarantee on every order" },
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "Food Enthusiast", comment: "Absolutely delicious! The freshest seafood I've ever tasted. Service was impeccable.", rating: 5 },
    { name: "Michael Chen", role: "Regular Customer", comment: "Consistently amazing quality. My go-to place for special occasions and everyday meals.", rating: 5 },
    { name: "Emma Rodriguez", role: "Verified Buyer", comment: "Beautiful presentation, fantastic flavors, and the delivery was lightning fast!", rating: 5 },
  ];

  const handleLogoutAction = () => {
    localStorage.removeItem("user_session");
    setAuthState("guest");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 font-sans antialiased">
      <Navbar 
        isAuthenticated={authState === "authenticated"} 
        onLogout={handleLogoutAction} 
      />

      <section className="relative pt-32 pb-20 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-2">
              <span className="text-xl">✨</span>
              <span className="text-sm font-semibold text-orange-600">Premium Food Experience</span>
            </div>
            
            <div>
              <h1 className="text-5xl lg:text-6xl font-black leading-tight text-slate-900 tracking-tight">
                Indulge in Culinary
                <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Excellence</span>
              </h1>
            </div>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              Experience the finest flavors crafted with passion. From fresh seafood to gourmet dishes, every plate is a masterpiece prepared by our award-winning chefs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95">
                Explore Menu
              </button>
              <button className="border-2 border-slate-300 text-slate-900 font-bold px-8 py-4 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all duration-300">
                View Specials
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <p className="text-3xl font-black text-orange-500">6000+</p>
                <p className="text-sm text-slate-500 font-medium mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-black text-orange-500">4.9★</p>
                <p className="text-sm text-slate-500 font-medium mt-1">Avg Rating</p>
              </div>
              <div>
                <p className="text-3xl font-black text-orange-500">500+</p>
                <p className="text-sm text-slate-500 font-medium mt-1">Menu Items</p>
              </div>
            </div>
          </div>

          <div className="relative h-96 lg:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-red-100 to-transparent rounded-3xl blur-2xl opacity-60"></div>
            <div className="relative bg-gradient-to-br from-orange-100 to-red-50 rounded-3xl p-8 border border-orange-200/50 h-full flex flex-col justify-center items-center text-center">
              <div className="text-9xl animate-bounce">🍽️</div>
              <p className="text-xl font-bold text-slate-700 mt-6">Gourmet Delights Await</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Expertly crafted with exclusive features for the best dining experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="group bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            <div id="menu-category" className="scroll-mt-32">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-3xl font-bold tracking-tight text-slate-900">Menu Categories</h3>
                  <p className="text-sm text-slate-500 mt-2 font-medium">Explore our diverse selection of delicious dishes</p>
                </div>
                <button className="text-sm font-bold text-orange-500 flex items-center gap-2 hover:gap-3 transition-all bg-orange-50 px-4 py-2 rounded-lg hover:bg-orange-100">
                  View All <span>→</span>
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-4 pt-1 no-scrollbar snap-x">
                {categories.map((cat, i) => (
                  <div 
                    key={i} 
                    className={`flex flex-col items-center justify-center min-w-[100px] h-36 rounded-2xl cursor-pointer transition-all duration-300 snap-start border-2 font-semibold ${
                      cat.active 
                        ? "bg-gradient-to-br from-orange-500 to-red-500 text-white border-orange-600 shadow-lg shadow-orange-500/30 scale-105" 
                        : "bg-white text-slate-700 border-slate-200 hover:border-orange-300 hover:shadow-md hover:shadow-slate-200/50"
                    }`}
                  >
                    <span className="text-4xl mb-2">{cat.icon}</span>
                    <span className="text-xs text-center">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="trending-orders" className="scroll-mt-32">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-3xl font-bold tracking-tight text-slate-900">Popular Dishes</h3>
                  <p className="text-sm text-slate-500 mt-2 font-medium">Most loved by our customers this week</p>
                </div>
                <button className="text-sm font-bold text-orange-500 flex items-center gap-2 hover:gap-3 transition-all bg-orange-50 px-4 py-2 rounded-lg hover:bg-orange-100">
                  View All <span>→</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {trendingOrders.map((item, i) => (
                  <div key={i} className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.1)] hover:border-orange-200 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-50 rounded-xl flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                          {item.img}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-slate-900 mb-1">{item.name}</h4>
                          <p className="text-xs text-slate-500 font-medium mb-2">{item.desc}</p>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-orange-500">★ {item.rating}</span>
                            <span className="text-xs text-slate-400">(240 reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <p className="text-lg font-black text-orange-500">{item.price}</p>
                        <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold text-lg flex items-center justify-center hover:shadow-lg hover:shadow-orange-500/30 transition-all active:scale-90">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-2">Loved by Thousands</h3>
              <p className="text-slate-300 mb-10">See what our satisfied customers have to say</p>
              <div className="grid grid-cols-1 gap-6">
                {testimonials.map((test, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex gap-1 mb-3">
                          {[...Array(test.rating)].map((_, j) => (
                            <span key={j} className="text-yellow-400">★</span>
                          ))}
                        </div>
                        <p className="text-white font-medium mb-3 leading-relaxed">"{test.comment}"</p>
                        <p className="text-sm font-bold text-slate-200">{test.name}</p>
                        <p className="text-xs text-slate-400">{test.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.06)] h-max lg:sticky lg:top-32">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">My Cart</h3>
                <span className="text-xs font-bold bg-orange-100 text-orange-600 px-3 py-1 rounded-full">2 Items</span>
              </div>
              
              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-2xl font-bold">🍕</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Mushroom Pizza</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">× 1 • Rp 145.000</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-red-500 font-bold text-xl transition-colors">×</button>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-2xl font-bold">🍔</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Beef Burger</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">× 2 • Rp 190.000</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-red-500 font-bold text-xl transition-colors">×</button>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-bold text-slate-900">Rp 335.000</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">Delivery</span>
                  <span className="font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded">FREE</span>
                </div>
                <div className="flex justify-between items-center font-bold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total</span>
                  <span className="text-xl text-orange-500">Rp 335.000</span>
                </div>
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold py-3.5 rounded-lg mt-4 hover:shadow-lg hover:shadow-orange-500/30 transition-all active:scale-95">
                  Checkout Now
                </button>
                <button className="w-full border-2 border-slate-300 text-slate-900 text-sm font-bold py-2.5 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-8 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-black mb-4">Ready to Taste Excellence?</h2>
          <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">Order now and experience the finest culinary creations delivered fresh to your doorstep</p>
          <button className="bg-white text-orange-500 font-bold px-10 py-4 rounded-xl hover:shadow-2xl hover:shadow-orange-500/40 transition-all transform hover:scale-105 active:scale-95">
            Order Your Favorite Dish
          </button>
        </div>
      </section>
    </div>
  );
}