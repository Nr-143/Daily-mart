import React, { useState, useEffect } from 'react';

const SpecialOffers = () => {
    const [timeLeft, setTimeLeft] = useState(7200); // 2 hours countdown

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };

    return (
        <div className="bg-electric-purple text-white text-center py-10 px-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">🔥 Limited Time Offers!</h2>
            <p className="text-lg mb-6">Hurry! Only {formatTime(timeLeft)} left!</p>
            <button className="bg-sunset-orange text-white px-6 py-3 rounded-md hover:bg-orange-500 transition-all duration-300">
                Grab Now
            </button>
        </div>
    );
};

export default SpecialOffers;
