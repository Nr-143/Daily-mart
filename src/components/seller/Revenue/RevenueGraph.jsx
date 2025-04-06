// components/seller/Revenue/RevenueGraph.jsx
import React, { useState } from 'react';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { FiFilter, FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

// Sample data - replace with API data
const revenueData = {
    daily: [
        { day: 'Mon', revenue: 4200, profit: 3200, loss: 1000, topProduct: 'Smartphones' },
        { day: 'Tue', revenue: 2900, profit: 2200, loss: 700, topProduct: 'Laptops' },
        { day: 'Wed', revenue: 5700, profit: 4100, loss: 1600, topProduct: 'Headphones' },
        { day: 'Thu', revenue: 4400, profit: 3400, loss: 1000, topProduct: 'Smartphones' },
        { day: 'Fri', revenue: 7200, profit: 5800, loss: 1400, topProduct: 'Tablets' },
        { day: 'Sat', revenue: 8100, profit: 6500, loss: 1600, topProduct: 'Gaming Consoles' },
        { day: 'Sun', revenue: 6300, profit: 4900, loss: 1400, topProduct: 'Smartwatches' }
    ],
    byCategory: [
        { name: 'Electronics', value: 45, profitMargin: 32 },
        { name: 'Clothing', value: 25, profitMargin: 18 },
        { name: 'Home Goods', value: 15, profitMargin: 22 },
        { name: 'Others', value: 15, profitMargin: 12 }
    ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RevenueGraph = () => {
    const [timeRange, setTimeRange] = useState('daily');
    const [activeTab, setActiveTab] = useState('revenue');

    return (
        <div className="bg-white mt-6 p-6 rounded-xl shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h2 className="font-bold text-xl">Revenue Analytics</h2>
                    <p className="text-sm text-gray-500">Track sales performance and product trends</p>
                </div>

                <div className="flex space-x-2 mt-3 md:mt-0">
                    <select
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="border rounded-lg px-3 py-1 text-sm"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>

                    <div className="flex bg-gray-100 rounded-lg p-1">
                        {['revenue', 'products', 'profits'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-1 text-sm rounded-md ${activeTab === tab ? 'bg-white shadow' : 'text-gray-600'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {activeTab === 'revenue' && (
                <div className="space-y-6">
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData.daily}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) => [`₹${value}`, 'Amount']}
                                    labelFormatter={(label) => `Day: ${label}`}
                                />
                                <Legend />
                                <Bar dataKey="revenue" fill="#6A0DAD" name="Total Revenue" />
                                <Bar dataKey="profit" fill="#4CAF50" name="Profit" />
                                <Bar dataKey="loss" fill="#F44336" name="Loss" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {revenueData.daily.slice(0, 3).map((day) => (
                            <div key={day.day} className="border rounded-lg p-4">
                                <h3 className="font-medium">{day.day}</h3>
                                <p className="text-2xl font-bold mt-1">₹{day.revenue}</p>
                                <div className="flex justify-between mt-2">
                                    <span className="text-green-600 flex items-center">
                                        <FiTrendingUp className="mr-1" /> ₹{day.profit}
                                    </span>
                                    <span className="text-red-600 flex items-center">
                                        <FiTrendingDown className="mr-1" /> ₹{day.loss}
                                    </span>
                                </div>
                                <p className="text-sm mt-2 text-gray-600">
                                    Top product: <span className="font-medium">{day.topProduct}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'products' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-64">
                        <h3 className="font-medium mb-3">Revenue by Category</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={revenueData.byCategory}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {revenueData.byCategory.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name, props) => [
                                        `₹${(value / 100 * revenueData.daily.reduce((sum, day) => sum + day.revenue, 0)).toFixed(0)}`,
                                        name
                                    ]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div>
                        <h3 className="font-medium mb-3">Top Performing Products</h3>
                        <div className="space-y-3">
                            {revenueData.byCategory.map((category, index) => (
                                <div key={category.name} className="flex items-center">
                                    <div
                                        className="w-3 h-3 rounded-full mr-2"
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <span>{category.name}</span>
                                            <span className="font-medium">
                                                {category.value}% (₹
                                                {(category.value / 100 * revenueData.daily.reduce((sum, day) => sum + day.revenue, 0)).toFixed(0)}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                            <div
                                                className="h-1.5 rounded-full"
                                                style={{
                                                    width: `${category.value}%`,
                                                    backgroundColor: COLORS[index % COLORS.length]
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'profits' && (
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData.daily}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip
                                formatter={(value) => [`₹${value}`, 'Amount']}
                                labelFormatter={(label) => `Day: ${label}`}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="profit"
                                stroke="#4CAF50"
                                strokeWidth={2}
                                name="Profit"
                                dot={{ r: 4 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="loss"
                                stroke="#F44336"
                                strokeWidth={2}
                                name="Loss"
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}


        </div>
    );
};

export default RevenueGraph;