import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaUser, FaMapMarkerAlt, FaBox, FaQuestionCircle,
    FaCreditCard, FaShieldAlt, FaSignOutAlt
} from "react-icons/fa";
import AccountSettings from "./AccountSettings";
import AddressSettings from "./AddressSettings/AddressSettings";
import OrderHistory from "./OrderHistory";
import HelpSupport from "./HelpSupport/HelpSupport";
import PaymentMethods from "./PaymentMethods";
import PrivacyPolicy from "./PrivacyPolicy";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("account");
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = useCallback(() => setShowMenu((prev) => !prev), []);

    // Render selected tab content
    const renderTabContent = () => {
        switch (activeTab) {
            case "account": return <AccountSettings />;
            case "address": return <AddressSettings />;
            case "orders": return <OrderHistory />;
            case "help": return <HelpSupport />;
            case "payment": return <PaymentMethods />;
            case "privacyPolicy": return <PrivacyPolicy />;
            default: return <AccountSettings />;
        }
    };

    // Sidebar menu items
    const menuItems = [
        { id: "account", icon: FaUser, label: "Account" },
        { id: "address", icon: FaMapMarkerAlt, label: "Address" },
        { id: "orders", icon: FaBox, label: "Orders" },
        { id: "help", icon: FaQuestionCircle, label: "Help & Support" },
        { id: "payment", icon: FaCreditCard, label: "Payment Methods" },
        { id: "privacyPolicy", icon: FaShieldAlt, label: "Privacy & Security" }, // Fixed Icon
    ];

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-1/4 bg-graphite-gray text-white p-4 mt-2">
                <h2 className="text-xl font-bold mb-4">Settings</h2>
                <nav className="flex flex-col gap-3">
                    {menuItems.map(({ id, icon: Icon, label }) => (
                        <button
                            key={id}
                            className={`flex items-center gap-3 p-2 rounded-md transition ${activeTab === id ? "bg-electric-purple" : "hover:bg-gray-600"
                                }`}
                            onClick={() => setActiveTab(id)}
                        >
                            <Icon /> {label}
                        </button>
                    ))}
                    <button className="flex items-center gap-3 p-2 rounded-md bg-sunset-orange mt-4">
                        <FaSignOutAlt /> Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 mt-10">{renderTabContent()}</main>

            {/* ---------------------- MOBILE NAVIGATION OPTIONS ---------------------- */}

            {/* Floating Action Button */}
            <button
                className="md:hidden fixed bottom-16 right-6 bg-electric-purple text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110"
                onClick={toggleMenu}
            >
                <FaUser size={24} />
            </button>

            {/* AnimatePresence for smooth animations */}
            <AnimatePresence>
                {showMenu && (
                    <>
                        {/* Backdrop Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                        />

                        {/* Mobile Menu */}
                        <motion.div
                            className="md:hidden fixed bottom-16 right-6 bg-white shadow-md rounded-lg p-3"
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            {menuItems.map(({ id, icon: Icon, label }) => (
                                <button
                                    key={id}
                                    className={`flex items-center gap-2 text-black py-2 px-3 hover:bg-gray-200 rounded-md w-full transition ${activeTab === id ? "bg-electric-purple text-white" : ""
                                        }`}
                                    onClick={() => { setActiveTab(id); toggleMenu(); }}
                                >
                                    <Icon size={20} />
                                    {label}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Settings;
