import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#6A0DAD', '#FF6B35', '#E0BBE4'];

const RevenueBreakdown = ({ data }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Revenue Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={data}
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        label
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueBreakdown;
