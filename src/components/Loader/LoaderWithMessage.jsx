import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import shoppingAnimation from "../../assets/Animation - 1742575875401.json"; // Lottie animation file

const funMessages = [
    "🛒 Adding extra savings just for you...",
    "🤖 Finding the best deals in the galaxy...",
    "🍕 Grabbing a snack while we load your products...",
    "🚀 Beep boop! Your cart is almost ready...",
    "🎉 Flash sale loading... stay tuned!",
];

const LoaderWithMessage = ({ size = "50px", color = "#6A0DAD" }) => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % funMessages.length); // Linear execution
        }, 2500); // Change message every 2.5s

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white mb-[150px]">
            {/* Lottie Animation */}
            <div className="w-44 h-44 flex  justify-center">
                <Lottie animationData={shoppingAnimation} loop autoPlay />
            </div>

            {/* Spinner */}
            <div
                className="animate-spin rounded-full border-8 border-blue-900 border-t-4 ease-linear mt-4"
                style={{
                    width: "50px",
                    height: "50px",
                    borderTopColor: "orange",
                }}
            ></div>

            {/* Fun Messages */}
            <p className="mt-6 text-gray-800 text-lg font-semibold text-center px-6 italic tracking-wide">
                {funMessages[messageIndex]}
            </p>
        </div>
    );
};

export default LoaderWithMessage;
