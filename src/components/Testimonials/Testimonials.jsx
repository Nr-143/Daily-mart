import React from 'react';

const Testimonials = () => {
    const feedback = [
        { name: 'Aarav K.', comment: 'Fast delivery and amazing quality!' },
        { name: 'Meera P.', comment: 'I love the discounts they offer!' },
        { name: 'Rohit S.', comment: 'Best online shopping experience!' }
    ];

    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold text-center mb-6">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {feedback.map((review, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 rounded-md shadow-md border-l-4 border-sunset-orange"
                    >
                        <p className="italic">"{review.comment}"</p>
                        <h4 className="font-bold text-right mt-2">- {review.name}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
