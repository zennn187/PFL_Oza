import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex bg-white">
            {/* Sisi Kiri - Ilustrasi/Banner (Hidden di layar kecil) */}
            <div className="hidden lg:flex lg:w-1/2 bg-orange-50 items-center justify-center p-12 relative overflow-hidden">
                <div className="relative z-10 text-center flex flex-col items-center">
                    {/* Placeholder untuk gambar ilustrasi dari Figma */}
                    <div className="w-96 h-96 bg-orange-200/50 rounded-full mb-8 flex items-center justify-center">
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/3565/3565406.png" 
                            alt="Illustration" 
                            className="w-64 h-64 object-contain opacity-80"
                        />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Manage Your Catering Easily</h2>
                    <p className="text-gray-500 max-w-md">
                        Join On-Catering dashboard to streamline your orders, customers, and business analytics in one place.
                    </p>
                </div>
            </div>

            {/* Sisi Kanan - Form Kontainer */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white shadow-[0_0_40px_rgba(0,0,0,0.05)] z-10">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-800">
                            On-Catering<span className="text-orange-500">.</span>
                        </h1>
                    </div>
                    
                    <Outlet />
                    
                    <p className="text-center text-sm text-gray-500 mt-10">
                        © 2025 On-Catering Admin Dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
}