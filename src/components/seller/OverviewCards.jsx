import React from 'react';

const cardData = [
    { title: 'Products Added', key: 'added', color: 'bg-blue-100 text-blue-800' },
    { title: 'Products Sold', key: 'sold', color: 'bg-green-100 text-green-800' },
    { title: 'Unsold Products', key: 'unsold', color: 'bg-yellow-100 text-yellow-800' },
    { title: 'Total Revenue', key: 'revenue', color: 'bg-purple-100 text-purple-800' },
];

const OverviewCards = ({ data }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cardData.map((item) => (
                <div
                    key={item.key}
                    className={`rounded-xl p-4 shadow-sm ${item.color} font-semibold text-center`}
                >
                    <h4 className="text-sm">{item.title}</h4>
                    <p className="text-xl mt-1">
                        {item.key === 'revenue' ? `₹${data[item.key]}` : data[item.key]}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default OverviewCards;
