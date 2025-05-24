// components/seller/Summary/TotalStatsCards.jsx
import React from 'react';
import {
    FiPackage,
    FiShoppingCart,
    FiBox,
    FiDollarSign,
    FiTrendingUp,
    FiTrendingDown,
    FiUsers,
    FiEye,
    FiStar,
    FiClock
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
            bgColor: 'bg-blue-50',
            link: '/seller/products'
        },
        {
            label: 'Products Sold',
            value: 98,
            change: '+8%',
            isPositive: true,
            icon: <FiShoppingCart className="text-green-500" size={20} />,
            description: 'Sold in last 30 days',
            bgColor: 'bg-green-50',
            link: '/seller/orders'
        },
        {
            label: 'In Stock',
            value: 54,
            change: '-5%',
            isPositive: false,
            icon: <FiBox className="text-yellow-500" size={20} />,
            description: 'Available for sale',
            bgColor: 'bg-yellow-50',
            link: '/seller/inventory'
        },
        {
            label: 'Revenue',
            value: '₹24,560',
            change: '+18%',
            isPositive: true,
            icon: <FiDollarSign className="text-purple-500" size={20} />,
            description: 'Last 30 days earnings',
            bgColor: 'bg-purple-50',
            link: '/seller/revenue'
        },
        {
            label: 'Store Visitors',
            value: '1,284',
            change: '+22%',
            isPositive: true,
            icon: <FiUsers className="text-indigo-500" size={20} />,
            description: 'Unique visitors this month',
            bgColor: 'bg-indigo-50',
            link: '/seller/analytics'
        },
        {
            label: 'Product Views',
            value: '3,742',
            change: '+15%',
            isPositive: true,
            icon: <FiEye className="text-cyan-500" size={20} />,
            description: 'Total product views',
            bgColor: 'bg-cyan-50',
            link: '/seller/analytics/views'
        },
        {
            label: 'Avg. Rating',
            value: '4.6',
            change: '+0.2',
            isPositive: true,
            icon: <FiStar className="text-amber-500" size={20} />,
            description: 'Customer satisfaction',
            bgColor: 'bg-amber-50',
            link: '/seller/reviews'
        },
        {
            label: 'Avg. Response',
            value: '2.4h',
            change: '-0.8h',
            isPositive: true,
            icon: <FiClock className="text-emerald-500" size={20} />,
            description: 'Customer query response',
            bgColor: 'bg-emerald-50',
            link: '/seller/support'
        },
        {
            label: 'Product Comments',
            value: '125',
            change: '-0.8h',
            isPositive: true,
            icon: <FiClock className="text-emerald-500" size={20} />,
            description: 'Product review by Customer',
            bgColor: 'bg-emerald-50',
            link: '/seller/support'
        },
        {
            label: 'Comments Response',
            value: '96',
            change: '0.8h',
            isPositive: true,
            icon: <FiClock className="text-emerald-500" size={20} />,
            description: 'Seller replies to the comments',
            bgColor: 'bg-emerald-50',
            link: '/seller/support'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((item) => (
                    <div className={`${item.bgColor} rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow h-full`}>
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

                        {/* Additional context for specific cards */}
                        {item.label === 'Store Visitors' && (
                            <p className="text-xs text-indigo-600 mt-1">
                                42% returning customers
                            </p>
                        )}

                        {item.label === 'Avg. Rating' && (
                            <div className="flex mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-3 h-3 ${i < 4 ? 'text-amber-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        )}
                    </div>
            ))}
        </div>
    );
};

export default TotalStatsCards;