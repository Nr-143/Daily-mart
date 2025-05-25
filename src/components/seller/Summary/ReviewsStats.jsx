// components/seller/Summary/ReviewsStats.jsx
import React from 'react';

const ReviewsStats = () => (
    <div className="bg-white mt-6 p-4 rounded-xl shadow">
        <h2 className="font-bold text-lg mb-4">Review Summary</h2>
        <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
                <p className="text-green-600 font-bold text-2xl">78%</p>
                <p className="text-sm text-gray-500">Positive Reviews</p>
            </div>
            <div className="text-center">
                <p className="text-red-500 font-bold text-2xl">22%</p>
                <p className="text-sm text-gray-500">Negative Reviews</p>
            </div>
        </div>
    </div>
);

export default ReviewsStats;
