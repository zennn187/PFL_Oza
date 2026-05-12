export default function TailwindCSS() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900">
            
            {/* Navbar Premium Light Mode */}
            <FlexboxGrid />
            
            {/* Container Utama untuk Etalase Efek */}
            <div className="max-w-7xl mx-auto px-6 mt-12 flex flex-col gap-12">
                
                {/* Hero Section / Judul */}
                <Typography />

                {/* Grid Etalase Utama */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    
                    {/* Komponen: Transformasi & Efek Hover Skala Besar */}
                    <ShadowEffects />

                    {/* Komponen: Filter Gambar & Opasitas */}
                    <BorderRadius />

                </div>

                {/* Komponen: Gradasi Lembut & Glassmorphism */}
                <BackgroundColors />

                {/* Komponen: Ring, Border, dan Efek Klik */}
                <Spacing />

            </div>
        </div>
    )
}

function Typography() {
    return (
        <div className="text-center mb-6 pt-10">
            {/* Judul Utama dengan Teks Bergradasi Biru-Ungu Elegan */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 tracking-tight pb-2">
                Eksplorasi Efek Modern
            </h1>
            <p className="text-slate-500 text-lg md:text-xl mt-4 max-w-3xl mx-auto font-medium leading-relaxed">
                Katalog interaktif untuk mempelajari efek hover, transformasi, dan filter. Arahkan kursor (hover) pada setiap elemen untuk melihat keajaibannya.
            </p>
        </div>
    )
}

function FlexboxGrid() {
    return (
        // Navbar: Glassmorphism putih (backdrop-blur-xl), posisi sticky (menempel di atas)
        <nav className="flex justify-between items-center bg-white/70 backdrop-blur-xl border-b border-slate-200 p-5 px-10 sticky top-0 z-50 shadow-sm">
            <h1 className="text-3xl font-black tracking-tighter text-slate-900">
                0jeeet<span className="text-indigo-600">.</span>
            </h1>
            <ul className="hidden md:flex space-x-10 font-semibold text-slate-500 text-base">
                <li><a href="#" className="hover:text-indigo-600 transition-colors duration-300">Beranda</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors duration-300">Komponen</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors duration-300">Dokumentasi</a></li>
            </ul>
            <div className="flex gap-4 items-center">
                <button className="bg-slate-900 text-white font-medium px-6 py-2.5 rounded-full shadow-md hover:bg-slate-800 hover:shadow-lg transition-all">
                    Mulai Belajar
                </button>
            </div>
        </nav>
    )
}

function ShadowEffects() {
    return (
        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-8">
            <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-blue-500 pl-4">Transformasi Bergerak (Hover)</h2>
            <p className="text-slate-500 font-medium">Elemen yang merespon gerakan kursor dengan transisi yang sangat halus (Duration & Ease).</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center text-sm">
                
                {/* Efek: Scale Up (Membesar) */}
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 group cursor-pointer">
                    <p className="mb-4 text-slate-500 font-semibold">Efek: Membesar (Scale Up)</p>
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 mx-auto rounded-2xl group-hover:scale-125 transition-transform duration-500 ease-out shadow-lg"></div>
                    <div className="mt-8 pt-4 border-t border-slate-200">
                        <code className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-mono">hover:scale-125</code>
                    </div>
                </div>

                {/* Efek: Translate Y (Melayang Naik) */}
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 group cursor-pointer">
                    <p className="mb-4 text-slate-500 font-semibold">Efek: Melayang Naik (Translate Y)</p>
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 mx-auto rounded-full group-hover:-translate-y-6 transition-transform duration-500 shadow-lg"></div>
                    <div className="mt-8 pt-4 border-t border-slate-200">
                        <code className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-mono">hover:-translate-y-6</code>
                    </div>
                </div>

                {/* Efek: Rotate (Berputar) */}
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 group cursor-pointer">
                    <p className="mb-4 text-slate-500 font-semibold">Efek: Berputar (Rotate)</p>
                    <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-pink-500 mx-auto rounded-2xl group-hover:rotate-45 transition-transform duration-700 shadow-lg"></div>
                    <div className="mt-8 pt-4 border-t border-slate-200">
                        <code className="text-xs bg-rose-50 text-rose-600 px-3 py-1 rounded-full font-mono">hover:rotate-45</code>
                    </div>
                </div>

                {/* Efek: Skew (Miring 3D) */}
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 group cursor-pointer">
                    <p className="mb-4 text-slate-500 font-semibold">Efek: Miring (Skew)</p>
                    <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 mx-auto rounded-2xl group-hover:-skew-x-12 group-hover:skew-y-3 transition-transform duration-500 shadow-lg"></div>
                    <div className="mt-8 pt-4 border-t border-slate-200">
                        <code className="text-xs bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-mono">hover:-skew-x-12</code>
                    </div>
                </div>

            </div>
        </div>
    )
}

function BorderRadius() {
    return (
        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-8">
            <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-indigo-500 pl-4">Filter Gambar & Transparansi</h2>
            <p className="text-slate-500 font-medium">Memanipulasi gambar secara langsung menggunakan utility filter bawaan Tailwind.</p>
            
            <div className="flex flex-col gap-8">
                
                {/* Efek: Grayscale to Color */}
                <div className="group cursor-pointer rounded-2xl overflow-hidden relative shadow-md">
                    {/* Gambar placeholder besar */}
                    <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop" alt="Abstract" className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-slate-800 font-bold mb-1">Efek: Hitam Putih ke Berwarna</p>
                        <code className="text-xs text-indigo-600 font-mono">grayscale hover:grayscale-0</code>
                    </div>
                </div>

                {/* Efek: Blur Reveal */}
                <div className="group cursor-pointer rounded-2xl overflow-hidden relative shadow-md">
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" alt="Abstract 2" className="w-full h-48 object-cover blur-sm group-hover:blur-none group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm">
                        <p className="text-slate-800 font-bold text-sm mb-1">Efek: Blur Reveal</p>
                        <code className="text-xs text-indigo-600 font-mono">blur-sm hover:blur-none</code>
                    </div>
                </div>

            </div>
        </div>
    )
}

function BackgroundColors() {
    return (
        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-8">
            <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-purple-500 pl-4">Model Card Spesial & Gradasi (Bukan Putih Polos)</h2>
            <p className="text-slate-500 font-medium">Contoh gaya card premium yang menggunakan gradasi sangat lembut, shadow berwarna, dan Glassmorphism.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Card 1: Colored Shadow (Bayangan Berwarna) */}
                <div className="bg-white p-8 rounded-3xl border border-slate-50 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/30 transition-shadow duration-500 group">
                    <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Colored Shadow</h3>
                    <p className="text-slate-500 text-sm mb-6">Bayangan tidak harus abu-abu. Memberi warna pada bayangan membuat UI terlihat ceria.</p>
                    <code className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md font-mono block text-center">shadow-blue-500/30</code>
                </div>

                {/* Card 2: Soft Pastel Gradient Background */}
                <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-3xl border border-white shadow-md hover:-translate-y-2 transition-transform duration-500">
                    <div className="w-14 h-14 bg-purple-200 text-purple-700 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Pastel Gradient</h3>
                    <p className="text-slate-500 text-sm mb-6">Latar belakang dengan campuran warna pastel sangat pucat. Sangat mewah dan kekinian.</p>
                    <code className="text-xs bg-white text-purple-600 px-3 py-1.5 rounded-md font-mono block text-center shadow-sm">bg-gradient-to-br ... to-pink-50</code>
                </div>

                {/* Card 3: Glassmorphism atas Gradasi (Efek Kaca) */}
                <div className="relative p-8 rounded-3xl overflow-hidden shadow-md group">
                    {/* Background Abstrak di belakang */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                    
                    {/* Lapisan Kaca (Glass) */}
                    <div className="relative z-10 bg-white/60 backdrop-blur-xl border border-white/50 h-full rounded-2xl p-6">
                        <div className="w-14 h-14 bg-white/80 text-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white">
                             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Glassmorphism</h3>
                        <p className="text-slate-600 text-sm mb-6">Efek kaca buram. Dibuat dengan transparansi putih dipadu efek blur latar belakang.</p>
                        <code className="text-xs bg-white/80 text-cyan-700 px-3 py-1.5 rounded-md font-mono block text-center border border-white/50">backdrop-blur-xl bg-white/60</code>
                    </div>
                </div>

            </div>
        </div>
    )
}

function Spacing() {
    return (
        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-8">
            <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-rose-500 pl-4">Aksen Garis (Ring) & Status Aktif</h2>
            <p className="text-slate-500 font-medium">Penggunaan utilitas "Ring" untuk memberikan sorotan saat elemen diklik (focus) atau di-hover, sangat bagus untuk tombol atau form input.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center">
                
                {/* Efek: Hover Ring (Cincin Sorotan) */}
                <div className="bg-slate-50 p-10 rounded-3xl flex flex-col items-center justify-center border border-slate-100">
                    <p className="mb-6 text-slate-500 font-semibold text-sm">Efek: Cincin Sorotan (Ring)</p>
                    <button className="bg-white text-slate-800 font-bold px-8 py-4 rounded-full shadow-sm border border-slate-200 hover:ring-4 hover:ring-rose-200 hover:border-rose-400 transition-all duration-300 focus:outline-none">
                        Hover Tombol Ini
                    </button>
                    <div className="mt-8 w-full border-t border-slate-200 pt-4">
                        <code className="text-xs bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full font-mono">hover:ring-4 hover:ring-rose-200</code>
                    </div>
                </div>

                {/* Efek: Gradient Border (Garis Tepi Bergradasi) */}
                <div className="bg-slate-50 p-10 rounded-3xl flex flex-col items-center justify-center border border-slate-100">
                    <p className="mb-6 text-slate-500 font-semibold text-sm">Efek: Border Bergradasi</p>
                    
                    {/* Trik membuat border gradient menggunakan wrapper div */}
                    <div className="p-1 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 group cursor-pointer hover:scale-105 transition-transform duration-300">
                        <div className="bg-white px-8 py-3 rounded-xl font-bold text-slate-800 group-hover:bg-slate-50 transition-colors">
                            Gradient Border
                        </div>
                    </div>

                    <div className="mt-8 w-full border-t border-slate-200 pt-4">
                        <code className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full font-mono">bg-gradient... (di wrapper luar)</code>
                    </div>
                </div>

            </div>
        </div>
    )
}