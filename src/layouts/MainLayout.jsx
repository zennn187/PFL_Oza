import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout() {
    return (
        <div id="app-container" className="bg-gray-50 min-h-screen flex font-sans">
            <Sidebar />
            <div id="main-content" className="flex-1 flex flex-col h-screen overflow-hidden">
                <Navbar isAuthenticated={true} userRole="Admin Utama" />
                <div className="flex-1 overflow-y-auto px-8 pb-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}