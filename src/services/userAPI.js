import { supabase } from "../lib/supabaseClient";

const normalizeCustomer = (profile) => ({
    id: profile.id,
    customerName: profile.nama_lengkap,
    email: profile.email,
    phone: profile.no_telepon || "-",
    loyalty: profile.member_points?.[0]?.tier
        ? profile.member_points[0].tier.charAt(0).toUpperCase() + profile.member_points[0].tier.slice(1)
        : "Bronze",
});

export const userAPI = {
    async getAllCustomers() {
        const { data, error } = await supabase
            .from("profiles")
            .select("id, nama_lengkap, email, no_telepon, role, member_points(tier)")
            .eq("role", "member")
            .is("deleted_at", null)
            .order("created_at", { ascending: false });

        if (error) throw error;
        return (data || []).map(normalizeCustomer);
    },

    async createCustomer(customerData) {
        const { data, error } = await supabase
            .from("profiles")
            .insert([
                {
                    nama_lengkap: customerData.customerName,
                    email: customerData.email,
                    no_telepon: customerData.phone,
                    role: "member",
                },
            ])
            .select()
            .single();

        if (error) throw error;
        return normalizeCustomer({ ...data, member_points: [{ tier: customerData.loyalty?.toLowerCase() || "bronze" }] });
    },
};
