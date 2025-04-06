import React from 'react';
import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Bar,
    Tooltip,
    CartesianGrid,
} from 'recharts';

const SalesGraph = ({ data }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Monthly Sales</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#6A0DAD" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesGraph;
