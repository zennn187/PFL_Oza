import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc"; // Icon tambahan untuk social login
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Mengubah false menjadi string kosong agar konsisten

        axios
            .post("https://dummyjson.com/user/login", {
                username: dataForm.email,
                password: dataForm.password,
            })
            .then((response) => {
                navigate("/");
            })
            .catch((err) => {
                setError(err.response?.data?.message || err.message || "An error occurred");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFBF7] p-6 text-center">
            {/* Heading Section */}
            <h1 className="text-[40px] font-serif font-bold text-[#0D1B3E] mb-1">Sign In</h1>
            <p className="text-[#9CA3AF] mb-10 text-lg">Sign in to stay connected.</p>

            {error && (
                <div className="w-full max-w-md bg-red-50 border-l-4 border-red-500 mb-6 p-4 text-sm text-red-700 rounded-r flex items-center shadow-sm text-left">
                    <BsFillExclamationDiamondFill className="mr-2 text-lg shrink-0" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="w-full max-w-md text-left">
                {/* Email Field */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-[#9CA3AF] mb-2 ml-1">Email</label>
                    <input
                        type="text"
                        name="email"
                        className="w-full px-5 py-3 bg-white border border-[#FDBA74] rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                        onChange={handleChange}
                    />
                </div>
                
                {/* Password Field */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[#9CA3AF] mb-2 ml-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="w-full px-5 py-3 bg-white border border-[#FDBA74] rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                        onChange={handleChange}
                    />
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between mb-10">
                    <label className="flex items-center text-sm text-[#9CA3AF] cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 mr-2 border-gray-300 rounded" />
                        Remember me?
                    </label>
                    <Link to="/forgot" className="text-sm text-[#F97316] font-medium hover:underline">
                        Forgot Password
                    </Link>
                </div>

                {/* Submit Button - Sesuai Figma: Rounded Full & Orange */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold py-4 px-4 rounded-full transition duration-300 flex justify-center items-center text-lg shadow-lg shadow-orange-200"
                >
                    {loading ? <ImSpinner2 className="animate-spin text-2xl" /> : "Sign in"}
                </button>

                {/* Social Sign In Section */}
                <div className="mt-10 text-center">
                    <p className="text-[#0D1B3E] font-medium mb-6">or sign in with other accounts?</p>
                    <div className="flex justify-center gap-4 mb-10">
                        <SocialIcon icon={<FcGoogle size={24} />} />
                        <SocialIcon icon={<FaFacebook size={24} className="text-[#3b5998]" />} />
                        <SocialIcon icon={<FaInstagram size={24} className="text-[#E1306C]" />} />
                        <SocialIcon icon={<FaLinkedin size={24} className="text-[#0077b5]" />} />
                    </div>
                    
                    <p className="text-[#0D1B3E] font-medium">
                        Don't have an account? <Link to="/register" className="text-[#F97316] hover:underline">Click here to sign up.</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

// Komponen Kecil untuk Ikon Sosial
function SocialIcon({ icon }) {
    return (
        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 cursor-pointer hover:scale-110 transition-transform">
            {icon}
        </div>
    );
}