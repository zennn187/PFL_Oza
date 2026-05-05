import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Register() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFBF7] p-6 text-center">
        

            {/* Heading Section */}
            <h2 className="text-[40px] font-serif font-bold text-[#0D1B3E] mb-1">Sign Up</h2>
            <p className="text-[#9CA3AF] mb-10 text-lg">Create your Hope UI account</p>

            <form className="w-full max-w-2xl text-left">
                {/* Grid Layout untuk First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label className="block text-sm font-medium text-[#9CA3AF] mb-2 ml-1">First Name</label>
                        <input
                            type="text"
                            className="w-full px-5 py-3 bg-white border border-[#FDBA74] rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#9CA3AF] mb-2 ml-1">Last Name</label>
                        <input
                            type="text"
                            className="w-full px-5 py-3 bg-white border border-[#FDBA74] rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                        />
                    </div>
                </div>

                {/* Grid Layout untuk Email & Phone No. */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label className="block text-sm font-medium text-[#9CA3AF] mb-2 ml-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-5 py-3 bg-white border border-[#FDBA74] rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#9CA3AF] mb-2 ml-1">Phone No.</label>
                        <input
                            type="text"
                            className="w-full px-5 py-3 bg-white border border-[#FDBA74] rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                        />
                    </div>
                </div>

                {/* Grid Layout untuk Password & Confirm Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-[#9CA3AF] mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-5 py-3 bg-white border border-[#FDBA74] rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#9CA3AF] mb-2 ml-1">Confirm password</label>
                        <input
                            type="password"
                            className="w-full px-5 py-3 bg-white border border-[#FDBA74] rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                        />
                    </div>
                </div>

                {/* Terms of Use */}
                <div className="flex justify-center items-center mb-8">
                    <label className="flex items-center text-sm text-[#9CA3AF] cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 mr-2 border-gray-300 rounded" />
                        I agree with the terms of use
                    </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full max-w-xs bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold py-3 px-8 rounded-full transition duration-300 text-lg shadow-lg shadow-orange-200"
                    >
                        Sign up
                    </button>
                </div>

                {/* Social Sign In Section */}
                <div className="mt-10 text-center">
                    <p className="text-[#0D1B3E] font-medium mb-6 text-sm md:text-base">or sign up with other accounts?</p>
                    <div className="flex justify-center gap-4 mb-10">
                        <SocialIcon icon={<FcGoogle size={22} />} />
                        <SocialIcon icon={<FaFacebook size={22} className="text-[#3b5998]" />} />
                        <SocialIcon icon={<FaInstagram size={22} className="text-[#E1306C]" />} />
                        <SocialIcon icon={<FaLinkedin size={22} className="text-[#0077b5]" />} />
                    </div>
                    
                    <p className="text-[#0D1B3E] font-medium text-sm md:text-base">
                        Already have an Account <Link to="/login" className="text-[#F97316] hover:underline font-semibold">Sign in</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

// Komponen Ikon Sosial
function SocialIcon({ icon }) {
    return (
        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 cursor-pointer hover:scale-110 transition-transform">
            {icon}
        </div>
    );
}