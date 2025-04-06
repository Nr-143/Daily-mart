// pages/seller/Dashboard.jsx
import React, { useState } from 'react';
import MobileSafeWrapper from '../../components/MobileSafeWrapper';
import TotalStatsCards from '../../components/seller/Summary/TotalStatsCards';
import ReviewsStats from '../../components/seller/Summary/ReviewsStats';
import AddedProductsList from '../../components/seller/Products/AddedProductsList';
import RevenueGraph from '../../components/seller/Revenue/RevenueGraph';

const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'products', label: 'My Products' },
    { key: 'revenue', label: 'Revenue Report' },
];

const SellerDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <>
                        <TotalStatsCards />
                        <RevenueGraph />
                        <ReviewsStats />
                    </>
                );
            case 'products':
                return <AddedProductsList />;
            case 'revenue':
                return <RevenueGraph />;
            default:
                return null;
        }
    };

    return (
        <MobileSafeWrapper>
            <div className="flex justify-around bg-white rounded-xl shadow mb-6 sticky top-[48px] z-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`w-full py-3 font-medium border-b-2 transition-all ${activeTab === tab.key
                                ? 'border-purple-600 text-purple-600'
                                : 'border-transparent text-gray-500 hover:text-purple-500'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="space-y-6">{renderTabContent()}</div>
        </MobileSafeWrapper>
    );
};

export default SellerDashboard;
