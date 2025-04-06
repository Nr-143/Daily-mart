import { React, useState } from "react";
import { FiUser, FiShield, FiShoppingBag, FiSettings, FiCreditCard, FiTruck } from "react-icons/fi";

const PrivacyPolicy = () => {
    const userTypes = [
        {
            id: 'customer',
            name: 'For Customers',
            icon: <FiUser className="text-blue-500" size={20} />,
            color: 'blue'
        },
        {
            id: 'seller',
            name: 'For Sellers',
            icon: <FiShoppingBag className="text-purple-500" size={20} />,
            color: 'purple'
        },
        {
            id: 'admin',
            name: 'For Admins',
            icon: <FiSettings className="text-green-500" size={20} />,
            color: 'green'
        }
    ];

    const [activeUserType, setActiveUserType] = useState('customer');

    return (
        <div className="max-w-6xl mx-auto  sm:px-2 py-3 pb- md:pb-8 mb-[40px] sm:mb-[10px]">
            {/* Policy Container */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r  p-8 md:p-8  -mt-[40px] ">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                
                        <div className="flex flex-wrap gap-3 mt-2">
                            {userTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setActiveUserType(type.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${activeUserType === type.id
                                        ? `bg-${type.color}-100 border-${type.color}-300 text-${type.color}-700`
                                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {type.icon}
                                    <span>{type.name}</span>
                                </button>
                            ))}
                        </div>
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border h-[50px] md:mt-[10px]">
                            <p className="text-sm font-medium">
                                <span className="text-gray-500">Applicable to:</span>
                                <span className={`ml-2 text-${userTypes.find(t => t.id === activeUserType)?.color}-600`}>
                                    {userTypes.find(t => t.id === activeUserType)?.name}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content with custom scrollbar */}
                <div className="p- md:p-2 md:max-h-[77vh] overflow-y-auto custom-scrollbar">
                    {/* Introduction */}
                    <section className="mb-10">
                        <div className="flex items-start gap-4">
                            <FiShield className="flex-shrink-0 mt-1 text-blue-500" size={20} />
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
                                <p className="text-gray-700 mb-4">
                                    Welcome to DailyMart. We are committed to protecting your privacy across all user roles.
                                    This policy outlines how we handle information for customers, sellers, and administrators.
                                </p>
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                    <p className="text-blue-800 font-medium">
                                        {activeUserType === 'customer' && "As a customer, your shopping data is protected with industry-standard security measures."}
                                        {activeUserType === 'seller' && "As a seller, your business information is secured and only used for platform operations."}
                                        {activeUserType === 'admin' && "As an admin, your access privileges are carefully managed to protect all user data."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Information Collection - Role Specific */}
                    <section className="mb-10">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            {/* Common Data */}
                            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                                    <FiUser className="text-gray-500" /> Common Data
                                </h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="inline-block w-2 h-2 mt-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                                        <span>Account information (email, name)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="inline-block w-2 h-2 mt-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                                        <span>Device and usage data</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="inline-block w-2 h-2 mt-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                                        <span>Contact information</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Role Specific Data */}
                            <div className={`p-5 rounded-lg border bg-${userTypes.find(t => t.id === activeUserType)?.color}-50 border-${userTypes.find(t => t.id === activeUserType)?.color}-200`}>
                                <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                                    {userTypes.find(t => t.id === activeUserType)?.icon}
                                    {activeUserType === 'customer' ? 'Customer Data' : activeUserType === 'seller' ? 'Seller Data' : 'Admin Data'}
                                </h3>
                                <ul className="space-y-2 text-gray-700">
                                    {activeUserType === 'customer' && (
                                        <>
                                            <li className="flex items-start gap-2">
                                                <span className="inline-block w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                                                <span>Payment and shipping details</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="inline-block w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                                                <span>Purchase history and preferences</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="inline-block w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                                                <span>Wishlists and saved items</span>
                                            </li>
                                        </>
                                    )}
                                    {activeUserType === 'seller' && (
                                        <>
                                            <li className="flex items-start gap-2">
                                                <span className="inline-block w-2 h-2 mt-2 rounded-full bg-purple-500 flex-shrink-0"></span>
                                                <span>Business registration details</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="inline-block w-2 h-2 mt-2 rounded-full bg-purple-500 flex-shrink-0"></span>
                                                <span>Bank account information</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="inline-block w-2 h-2 mt-2 rounded-full bg-purple-500 flex-shrink-0"></span>
                                                <span>Inventory and sales data</span>
                                            </li>
                                        </>
                                    )}
                                    {activeUserType === 'admin' && (
                                        <>
                                            <li className="flex items-start gap-2">
                                                <span className="inline-block w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0"></span>
                                                <span>System access logs</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="inline-block w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0"></span>
                                                <span>Administrative permissions</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="inline-block w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0"></span>
                                                <span>Audit trail data</span>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Data Usage */}
                    <section className="mb-10">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {activeUserType === 'customer' && (
                                <>
                                    <DataUsageCard
                                        icon={<FiShoppingBag className="text-blue-500" />}
                                        title="Order Processing"
                                        description="Process purchases and deliveries"
                                    />
                                    <DataUsageCard
                                        icon={<FiCreditCard className="text-blue-500" />}
                                        title="Payment Security"
                                        description="Secure payment processing"
                                    />
                                    <DataUsageCard
                                        icon={<FiUser className="text-blue-500" />}
                                        title="Personalization"
                                        description="Tailor shopping experience"
                                    />
                                </>
                            )}
                            {activeUserType === 'seller' && (
                                <>
                                    <DataUsageCard
                                        icon={<FiTruck className="text-purple-500" />}
                                        title="Order Fulfillment"
                                        description="Process and ship customer orders"
                                    />
                                    <DataUsageCard
                                        icon={<FiCreditCard className="text-purple-500" />}
                                        title="Payments"
                                        description="Calculate and disburse earnings"
                                    />
                                    <DataUsageCard
                                        icon={<FiSettings className="text-purple-500" />}
                                        title="Performance Analytics"
                                        description="Provide sales insights"
                                    />
                                </>
                            )}
                            {activeUserType === 'admin' && (
                                <>
                                    <DataUsageCard
                                        icon={<FiShield className="text-green-500" />}
                                        title="System Security"
                                        description="Monitor and protect the platform"
                                    />
                                    <DataUsageCard
                                        icon={<FiUser className="text-green-500" />}
                                        title="User Support"
                                        description="Assist customers and sellers"
                                    />
                                    <DataUsageCard
                                        icon={<FiSettings className="text-green-500" />}
                                        title="Platform Maintenance"
                                        description="Improve system functionality"
                                    />
                                </>
                            )}
                        </div>
                    </section>

                    {/* Other sections would follow the same pattern */}
                    {/* ... */}

                    {/* Contact Section */}
                    <section className="mt-12 pt-6 border-t border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Contact Our Privacy Team</h2>
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                            <p className="text-gray-700 mb-4">For privacy-related inquiries specific to your role:</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-medium text-gray-800 mb-1">General Privacy Questions</p>
                                    <p className="text-gray-600">privacy@dailymart.com</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800 mb-1">Role-Specific Support</p>
                                    <p className="text-gray-600">
                                        {activeUserType === 'customer' && "customer.privacy@dailymart.com"}
                                        {activeUserType === 'seller' && "seller.support@dailymart.com"}
                                        {activeUserType === 'admin' && "admin.security@dailymart.com"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

// Reusable component for data usage cards
const DataUsageCard = ({ icon, title, description }) => {
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-200 transition-all h-full">
            <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-lg flex-shrink-0">
                    {icon}
                </div>
                <div>
                    <h3 className="font-medium text-gray-800 mb-1">{title}</h3>
                    <p className="text-gray-600 text-sm">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;