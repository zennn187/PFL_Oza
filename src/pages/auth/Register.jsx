import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useAuth } from "../../context/useAuth";

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dataForm, setDataForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const { signUp } = useAuth();

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
        setError("");
        setSuccess("");

        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Konfirmasi password tidak cocok");
            setLoading(false);
            return;
        }

        const fullName = `${dataForm.firstName} ${dataForm.lastName}`.trim();

        try {
            await signUp(dataForm.email, dataForm.password, fullName, dataForm.phone);
            setSuccess("Registrasi akun berhasil! Silakan masuk.");
            setTimeout(() => {
                navigate("/login");
            }, 2500);
        } catch (err) {
            setError(err.message || "Registrasi gagal, silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFBF7] p-6 text-center">
            <h2 className="text-[40px] font-serif font-bold text-[#0D1B3E] mb-1">Sign Up</h2>
            <p className="text-[#9CA3AF] mb-10 text-lg">Create your Hope UI account</p>

            {error && (
                <div className="w-full max-w-2xl bg-red-50 border-l-4 border-red-500 mb-6 p-4 text-sm text-red-700 rounded-r flex items-center shadow-sm text-left">
                    <BsFillExclamationDiamondFill className="mr-2 text-lg shrink-0" />
                    {error}
                </div>
            )}

            {success && (
                <div className="w-full max-w-2xl bg-green-50 border-l-4 border-green-500 mb-6 p-4 text-sm text-green-700 rounded-r flex items-center shadow-sm text-left">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="w-full max-w-2xl text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label htmlFor="reg-firstname" className="block text-sm font-medium text-[#9CA3AF] mb-2 ml-1">First Name</label>
                        <input
                            id="reg-firstname"
                            type="text"
                            name="firstName"
                            required
                            disabled={loading}
                            value={dataForm.firstName}
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-white border border-[#FDBA74] rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="reg-lastname" className="block text-sm font-medium text-[#9CA3AF] mb-2 ml-1">Last Name</label>
                        <input
                            id="reg-lastname"
                            type="text"
                            name="lastName"
                            required
                            disabled={loading}
                            value={dataForm.lastName}
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-white border border-[#FDBA74] rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label htmlFor="reg-email" className="block text-sm font-medium text-[#9CA3AF] mb-2 ml-1">Email</label>
                        <input
                            id="reg-email"
                            type="email"
                            name="email"
                            required
                            disabled={loading}
                            value={dataForm.email}
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-white border border-[#FDBA74] rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="reg-phone" className="block text-sm font-medium text-[#9CA3AF] mb-2 ml-1">Phone No.</label>
                        <input
                            id="reg-phone"
                            type="text"
                            name="phone"
                            disabled={loading}
                            value={dataForm.phone}
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-white border border-[#FDBA74] rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div>
                        <label htmlFor="reg-password" className="block text-sm font-medium text-[#9CA3AF] mb-2 ml-1">Password</label>
                        <input
                            id="reg-password"
                            type="password"
                            name="password"
                            required
                            disabled={loading}
                            value={dataForm.password}
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-white border border-[#FDBA74] rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="reg-confirm-password" className="block text-sm font-medium text-[#9CA3AF] mb-2 ml-1">Confirm password</label>
                        <input
                            id="reg-confirm-password"
                            type="password"
                            name="confirmPassword"
                            required
                            disabled={loading}
                            value={dataForm.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-white border border-[#FDBA74] rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                        />
                    </div>
                </div>

                <div className="flex justify-center items-center mb-8">
                    <label htmlFor="reg-terms" className="flex items-center text-sm text-[#9CA3AF] cursor-pointer">
                        <input id="reg-terms" type="checkbox" required className="w-4 h-4 mr-2 border-gray-300 rounded" />
                        I agree with the terms of use
                    </label>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full max-w-xs bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold py-3 px-8 rounded-full transition duration-300 flex justify-center items-center text-lg shadow-lg shadow-orange-200"
                    >
                        {loading ? <ImSpinner2 className="animate-spin text-2xl" /> : "Sign up"}
                    </button>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-[#0D1B3E] font-medium mb-6 text-sm md:text-base">or sign up with other accounts?</p>
                    <div className="flex justify-center gap-4 mb-10">
                        <SocialIcon icon={<FcGoogle size={22} />} />
                        <SocialIcon icon={<FaFacebook size={22} className="text-[#3b5998]" />} />
                        <SocialIcon icon={<FaInstagram size={22} className="text-[#E1306C]" />} />
                        <SocialIcon icon={<FaLinkedin size={22} className="text-[#0077b5]" />} />
                    </div>
                    <p className="text-[#0D1B3E] font-medium text-sm md:text-base">
                        Already have an Account? <Link to="/login" className="text-[#F97316] hover:underline font-semibold">Sign in</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

function SocialIcon({ icon }) {
    return (
        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 cursor-pointer hover:scale-110 transition-transform">
            {icon}
        </div>
    );
}
