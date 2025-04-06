// components/seller/Summary/TotalStatsCards.jsx
import React from 'react';
import {
    FiPackage,
    FiShoppingCart,
    FiBox,
    FiDollarSign,
    FiTrendingUp,
    FiTrendingDown
} from 'react-icons/fi';
import { Link } from 'react-router-dom';


const TotalStatsCards = () => {
    const stats = [
        {
            label: 'Total Products',
            value: 152,
            change: '+12%',
            isPositive: true,
            icon: <FiPackage className="text-blue-500" size={20} />,
            description: 'All your listed products',
            bgColor: 'bg-blue-50'
        },
        {
            label: 'Products Sold',
            value: 98,
            change: '+8%',
            isPositive: true,
            icon: <FiShoppingCart className="text-green-500" size={20} />,
            description: 'Sold in last 30 days',
            bgColor: 'bg-green-50'
        },
        {
            label: 'In Stock',
            value: 54,
            change: '-5%',
            isPositive: false,
            icon: <FiBox className="text-yellow-500" size={20} />,
            description: 'Available for sale',
            bgColor: 'bg-yellow-50'
        },
        {
            label: 'Revenue',
            value: '₹24,560',
            change: '+18%',
            isPositive: true,
            icon: <FiDollarSign className="text-purple-500" size={20} />,
            description: 'Last 30 days earnings',
            bgColor: 'bg-purple-50'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((item) => (
                <div
                    key={item.label}
                    className={`${item.bgColor} rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow`}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-600">{item.label}</p>
                            <p className="text-2xl font-bold mt-1">{item.value}</p>

                            <div className="flex items-center mt-2">
                                {item.isPositive ? (
                                    <FiTrendingUp className="text-green-500 mr-1" />
                                ) : (
                                    <FiTrendingDown className="text-red-500 mr-1" />
                                )}
                                <span className={`text-xs ${item.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.change}
                                </span>
                                <span className="text-xs text-gray-500 ml-1">vs last month</span>
                            </div>
                        </div>

                        <div className="p-2 rounded-lg bg-white bg-opacity-50">
                            {item.icon}
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-3">{item.description}</p>

                </div>
            ))}
        </div>
    );
};

export default TotalStatsCards;