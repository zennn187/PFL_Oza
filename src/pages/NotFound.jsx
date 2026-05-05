import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdf8f5] font-poppins text-center p-4">
            
            {/* Bagian 404 & Burger */}
            <div className="flex items-center justify-center gap-2 md:gap-8 mb-4">
                <h1 className="text-[10rem] md:text-[16rem] font-black text-[#f16322] leading-none tracking-tighter">
                    4
                </h1>
                
                {/* Pastikan kamu memiliki gambar burger melayang ini di folder aset */}
                <div className="w-32 md:w-56 relative animate-bounce">
                    <img 
                        src="/assets/burger-floating.png" // Ganti dengan path gambar aslimu
                        alt="Floating Burger" 
                        className="object-contain w-full h-full drop-shadow-xl"
                    />
                </div>

                <h1 className="text-[10rem] md:text-[16rem] font-black text-[#f16322] leading-none tracking-tighter">
                    4
                </h1>
            </div>

            {/* Teks & Tombol */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Page not Found
            </h2>
            <p className="text-gray-500 max-w-md mb-8 text-sm leading-relaxed">
                Permintaan tidak dapat diproses oleh server karena format yang tidak valid. Silakan periksa kembali data Anda.

            </p>

            <Link 
                to="/" 
                className="px-8 py-3 bg-[#f16322] hover:bg-[#d9531b] text-white rounded-full font-medium transition-all shadow-md shadow-orange-500/20"
            >
                Back to home
            </Link>
        </div>
    );
}