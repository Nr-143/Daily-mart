import React, { useState } from "react";
import { FaUser, FaMapMarkerAlt, FaBox, FaQuestionCircle, FaCreditCard, FaSignOutAlt } from "react-icons/fa";
import AccountSettings from "./AccountSettings";
import AddressSettings from "./AddressSettings";
import OrderHistory from "./OrderHistory";
import HelpSupport from "./HelpSupport";
import PaymentMethods from "./PaymentMethods";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("account");

    // Function to render the selected tab content
    const renderTabContent = () => {
        switch (activeTab) {
            case "account": return <AccountSettings />;
            case "address": return <AddressSettings />;
            case "orders": return <OrderHistory />;
            case "help": return <HelpSupport />;
            case "payment": return <PaymentMethods />;
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
    ];

    return (
        <div className="flex flex-col md:flex-row h-screen ">
            {/* Sidebar for Desktop */}
            <aside className="hidden md:flex flex-col w-1/4 bg-graphite-gray text-white p-6">
                <h2 className="text-xl font-bold mb-4">Settings</h2>
                <nav className="flex flex-col gap-3">
                    {menuItems.map(({ id, icon: Icon, label }) => (
                        <button
                            key={id}
                            className={`flex items-center gap-3 p-2 rounded-md transition ${activeTab === id ? "bg-electric-purple" : "hover:bg-gray-600"}`}
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
            <main className="flex-1 p-6 mt-[40px]">{renderTabContent()}</main>

            {/* Bottom Navigation for Mobile */}
            <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-2 shadow-md mb-[60px]">
                {menuItems.map(({ id, icon: Icon }) => (
                    <button
                        key={id}
                        className={`text-black flex flex-col items-center ${activeTab === id ? "text-electric-purple" : ""}`}
                        onClick={() => setActiveTab(id)}
                    >
                        <Icon size={20} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Settings;
