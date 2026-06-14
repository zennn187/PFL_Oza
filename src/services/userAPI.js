import axios from 'axios';

const BASE_URL = "https://lhageigjdpvfjjfshfae.supabase.co/rest/v1";
const API_KEY = "sb_publishable_l6KTL_GyvbAlQjBh9LZsbA_NsEk2Vnd";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
};

const USERS_URL = `${BASE_URL}/users`;
const CUSTOMERS_URL = `${BASE_URL}/customers`;

export const userAPI = {
    async registerUser(userData) {
        const checkEmail = await axios.get(`${USERS_URL}?email=eq.${userData.email}`, { headers });
        if (checkEmail.data.length > 0) {
            throw new Error("Email sudah terdaftar");
        }

        const response = await axios.post(USERS_URL, userData, { headers });
        return response.data;
    },

    async loginUser(credential, password) {
        const response = await axios.get(`${USERS_URL}?email=eq.${credential}&password=eq.${password}`, { headers });
        if (response.data.length === 0) {
            throw new Error("Email atau password salah");
        }
        return response.data[0];
    },

    async getAllUsers() {
        const response = await axios.get(USERS_URL, { headers });
        return response.data;
    },

    async updateUser(id, userData) {
        const response = await axios.patch(`${USERS_URL}?id=eq.${id}`, userData, { headers });
        return response.data;
    },

    async deleteUser(id) {
        const response = await axios.delete(`${USERS_URL}?id=eq.${id}`, { headers });
        return response.data;
    },

    async getAllCustomers() {
        const response = await axios.get(`${CUSTOMERS_URL}?order=created_at.desc`, { headers });
        return response.data;
    },

    async createCustomer(customerData) {
        const response = await axios.post(CUSTOMERS_URL, customerData, { headers });
        return response.data;
    }
};