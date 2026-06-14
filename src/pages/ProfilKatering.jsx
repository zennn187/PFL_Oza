import React, { useState, useRef } from 'react';
import { FaStore, FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser, FaCheckCircle, FaSave, FaEdit, FaClock, FaAward, FaTimesCircle, FaCamera } from 'react-icons/fa';
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ProfilKatering() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const fileInputRef = useRef(null);
    
    const [profile, setProfile] = useState({
        name: 'On-Catering',
        logoUrl: null, 
        slogan: 'Hidangan Lezat untuk Setiap Momen Spesial',
        description: 'Penyedia layanan katering profesional sejak tahun 2024 yang melayani berbagai kebutuhan acara, mulai dari prasmanan pernikahan, nasi kotak kantoran, hingga acara keluarga skala besar dengan jaminan bahan baku premium dan higienis.',
        phone: '081234567890',
        email: 'info@oncatering.com',
        address: 'Jl. Kuliner Raya No. 45, Kompleks Rasa Nyaman, Jakarta Selatan',
        owner_name: 'Oza Okta',
        status: 'Buka', 
        halal_no: 'ID31110001234567890',
        bank_name: 'Bank Mandiri',
        bank_account: '123-00-998877-6',
        open_time_weekday: '08:00',
        close_time_weekday: '20:00',
        open_time_weekend: '09:00',
        close_time_weekend: '17:00',
        break_start_time: '12:00',
        break_end_time: '15:00'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Ukuran file terlalu besar", {
                    description: "Maksimal ukuran logo adalah 2MB.",
                    styles: {
                        description: { color: '#000000' }
                    }
                });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile((prev) => ({ ...prev, logoUrl: reader.result }));
                toast.info("Logo terpilih", {
                    description: "Klik 'Simpan Perubahan' untuk memperbarui secara permanen.",
                    styles: {
                        description: { color: '#000000' }
                    }
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        if (isEditing && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setIsEditing(false);
            setLoading(false);
            
            let statusDescription = `Profil ${profile.name} berhasil diperbarui.`;
            
            if (profile.status === 'Buka') {
                statusDescription = `Status Toko AKTIF. Jam operasional hari ini: ${profile.open_time_weekday} s/d ${profile.close_time_weekday}`;
            } else if (profile.status === 'Libur') {
                statusDescription = `Status Toko LIBUR JEDA pada jam: ${profile.break_start_time} - ${profile.break_end_time}`;
            } else {
                statusDescription = `Status Toko saat ini diatur TUTUP sementara.`;
            }

            toast.success("Perubahan Disimpan", {
                description: statusDescription,
                duration: 4000,
                styles: {
                    description: { color: '#000000', marginTop: '4px' }
                }
            });
        }, 1000);
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto font-poppins">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profil Katering</h1>
                    <p className="text-gray-500 text-sm mt-1">Kelola informasi publik dan operasional identitas bisnis katering Anda.</p>
                </div>
                <button
                    type="button"
                    onClick={() => {
                        setIsEditing(!isEditing);
                        setIsDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#f16322] hover:bg-[#d9531b] text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-orange-500/20"
                >
                    {isEditing ? 'Batal Mengedit' : (
                        <>
                            <FaEdit /> Edit Profil
                        </>
                    )}
                </button>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                <div className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center sticky top-6">
                    
                    <div className="relative group mb-4">
                        <input 
                            type="file"
                            ref={fileInputRef}
                            onChange={handleLogoChange}
                            accept="image/*"
                            className="hidden"
                            disabled={!isEditing}
                        />
                        <div 
                            onClick={triggerFileInput}
                            className={cn(
                                "w-24 h-24 bg-orange-50 rounded-[28px] flex items-center justify-center text-[#f16322] text-4xl border border-orange-100 shadow-inner overflow-hidden relative select-none",
                                isEditing ? "cursor-pointer ring-2 ring-orange-500/20 hover:border-orange-400 hover:bg-orange-100/50 transition-all" : ""
                            )}
                        >
                            {profile.logoUrl ? (
                                <img 
                                    src={profile.logoUrl} 
                                    alt="Logo Catering" 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <FaStore />
                            )}

                            {isEditing && (
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <FaCamera className="text-lg mb-1" />
                                    <span className="font-medium text-[10px]">Ubah Logo</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
                    <p className="text-xs font-medium text-[#f16322] mt-1.5 bg-orange-50/70 px-3 py-1 rounded-full">{profile.slogan}</p>
                    
                    <div className="w-full h-[1px] bg-gray-100 my-5"></div>
                    
                    <div className="w-full space-y-3.5 text-left text-sm">
                        <div className="flex items-center gap-3 text-gray-600">
                            <FaUser className="text-[#f16322] shrink-0" />
                            <div>
                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Pemilik</p>
                                <p className="font-semibold text-gray-700">{profile.owner_name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            {profile.status === 'Buka' && <FaCheckCircle className="text-green-500 shrink-0" />}
                            {profile.status === 'Tutup' && <FaTimesCircle className="text-red-500 shrink-0" />}
                            {profile.status === 'Libur' && <FaClock className="text-amber-500 shrink-0" />}
                            <div>
                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Status Toko</p>
                                <p className={cn(
                                    "font-bold text-sm",
                                    profile.status === 'Buka' && "text-green-600",
                                    profile.status === 'Tutup' && "text-red-600",
                                    profile.status === 'Libur' && "text-amber-600"
                                )}>
                                    {profile.status === 'Buka' && 'Buka Hari Ini'}
                                    {profile.status === 'Tutup' && 'Tutup Sementara'}
                                    {profile.status === 'Libur' && 'Libur Jeda Dapur'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-5">
                    <h3 className="text-md font-bold text-gray-800 border-b border-gray-50 pb-2">Informasi Utama</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Nama Bisnis</label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#f16322] disabled:bg-gray-50/70 disabled:text-gray-500 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Tagline</label>
                            <input
                                type="text"
                                name="slogan"
                                value={profile.slogan}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#f16322] disabled:bg-gray-50/70 disabled:text-gray-500 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Deskripsi Singkat</label>
                        <textarea
                            name="description"
                            value={profile.description}
                            onChange={handleChange}
                            disabled={!isEditing}
                            rows="4"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#f16322] disabled:bg-gray-50/70 disabled:text-gray-500 resize-none transition-all leading-relaxed"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">WhatsApp / No. Telp</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 text-xs">
                                    <FaPhone />
                                </span>
                                <input
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#f16322] disabled:bg-gray-50/70 disabled:text-gray-500 transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Email Operasional</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 text-xs">
                                    <FaEnvelope />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#f16322] disabled:bg-gray-50/70 disabled:text-gray-500 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Alamat Dapur Utama</label>
                        <div className="relative">
                            <span className="absolute top-3 left-3.5 text-gray-400 text-xs">
                                <FaMapMarkerAlt />
                            </span>
                            <textarea
                                name="address"
                                value={profile.address}
                                onChange={handleChange}
                                disabled={!isEditing}
                                rows="2"
                                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#f16322] disabled:bg-gray-50/70 disabled:text-gray-500 resize-none transition-all"
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-2.5 border-b border-gray-50 pb-2">
                            <div className="text-[#f16322] text-sm"><FaClock /></div>
                            <h3 className="text-md font-bold text-gray-800">Manajemen Status & Waktu</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Status Toko</label>
                                
                                <div className="relative">
                                    <button
                                        type="button"
                                        disabled={!isEditing}
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className={cn(
                                            "flex h-11 w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 transition-all text-left",
                                            isEditing && "hover:border-[#f16322] cursor-pointer focus:ring-2 focus:ring-orange-500/10 focus:border-[#f16322]",
                                            !isEditing && "disabled:cursor-not-allowed disabled:bg-gray-50/70 text-gray-400",
                                            profile.status === 'Buka' && isEditing && "border-orange-500 focus:border-orange-500",
                                            profile.status === 'Tutup' && isEditing && "border-orange-500 focus:border-orange-500",
                                            profile.status === 'Libur' && isEditing && "border-orange-500 focus:border-orange-500"
                                        )}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <span className={cn(
                                                "w-2.5 h-2.5 rounded-full shrink-0",
                                                profile.status === 'Buka' && "bg-green-500 shadow-sm shadow-green-500/40",
                                                profile.status === 'Tutup' && "bg-red-500 shadow-sm shadow-red-500/40",
                                                profile.status === 'Libur' && "bg-amber-500 shadow-sm shadow-amber-500/40"
                                            )} />
                                            <span>
                                                {profile.status === 'Buka' && 'Buka (Menerima Pesanan)'}
                                                {profile.status === 'Tutup' && 'Tutup Sementara'}
                                                {profile.status === 'Libur' && 'Libur Jeda / Istirahat Dapur'}
                                            </span>
                                        </div>
                                        
                                        <svg 
                                            className={cn("h-4 w-4 text-gray-400 transition-transform duration-200 shrink-0", isDropdownOpen && "transform rotate-180 text-[#f16322]")} 
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {isDropdownOpen && isEditing && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                                            
                                            <div className="absolute left-0 right-0 mt-2 z-20 rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setProfile(prev => ({ ...prev, status: 'Buka' }));
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className={cn(
                                                        "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all text-left",
                                                        profile.status === 'Buka' ? "bg-orange-50 text-[#f16322]" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                    )}
                                                >
                                                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                                    Buka (Menerima Pesanan)
                                                </button>
                                                
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setProfile(prev => ({ ...prev, status: 'Tutup' }));
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className={cn(
                                                        "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all text-left",
                                                        profile.status === 'Tutup' ? "bg-orange-50 text-[#f16322]" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                    )}
                                                >
                                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                                    Tutup Sementara
                                                </button>
                                                
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setProfile(prev => ({ ...prev, status: 'Libur' }));
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className={cn(
                                                        "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all text-left",
                                                        profile.status === 'Libur' ? "bg-orange-50 text-[#f16322]" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                    )}
                                                >
                                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                                    Libur Jeda / Istirahat Dapur
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {profile.status === 'Libur' && (
                                <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl space-y-3 duration-200 animate-in fade-in slide-in-from-top-1">
                                    <label className="block text-[11px] font-bold text-amber-800 uppercase tracking-wider">Durasi Libur Jeda Dapur</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <span className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Mulai Jam</span>
                                            <input
                                                type="time"
                                                name="break_start_time"
                                                value={profile.break_start_time}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold focus:outline-none focus:border-[#f16322] disabled:bg-gray-50/30 text-gray-700"
                                            />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Selesai Jam</span>
                                            <input
                                                type="time"
                                                name="break_end_time"
                                                value={profile.break_end_time}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold focus:outline-none focus:border-[#f16322] disabled:bg-gray-50/30 text-gray-700"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3 pt-2">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Konfigurasi Jam Operasional</label>
                            
                            <div className="grid grid-cols-2 gap-3 border-t border-gray-50 pt-2">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Senin - Jumat (Buka)</label>
                                    <input
                                        type="time"
                                        name="open_time_weekday"
                                        value={profile.open_time_weekday}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#f16322] disabled:bg-gray-50/70 text-gray-700 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Senin - Jumat (Tutup)</label>
                                    <input
                                        type="time"
                                        name="close_time_weekday"
                                        value={profile.close_time_weekday}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#f16322] disabled:bg-gray-50/70 text-gray-700 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Sabtu - Minggu (Buka)</label>
                                    <input
                                        type="time"
                                        name="open_time_weekend"
                                        value={profile.open_time_weekend}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#f16322] disabled:bg-gray-50/70 text-gray-700 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Sabtu - Minggu (Tutup)</label>
                                    <input
                                        type="time"
                                        name="close_time_weekend"
                                        value={profile.close_time_weekend}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#f16322] disabled:bg-gray-50/70 text-gray-700 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-2.5 border-b border-gray-50 pb-2">
                            <div className="text-[#f16322] text-sm"><FaAward /></div>
                            <h3 className="text-md font-bold text-gray-800">Verifikasi & Keuangan</h3>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">No. Sertifikasi Halal</label>
                            <input
                                type="text"
                                name="halal_no"
                                value={profile.halal_no}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#f16322] disabled:bg-gray-50/70 text-green-700 disabled:text-green-700/80 bg-green-50/30 border-green-100/50 transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-1">
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Bank</label>
                                <input
                                    type="text"
                                    name="bank_name"
                                    value={profile.bank_name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#f16322] disabled:bg-gray-50/70 disabled:text-gray-500 transition-all"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">No. Rekening</label>
                                <input
                                    type="text"
                                    name="bank_account"
                                    value={profile.bank_account}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#f16322] disabled:bg-gray-50/70 disabled:text-gray-500 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-bold transition-all shadow-md disabled:bg-gray-400"
                            >
                                <FaSave /> {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    )}
                </div>

            </form>
        </div>
    );
}