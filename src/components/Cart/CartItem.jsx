import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaTrashAlt, FaClock } from "react-icons/fa";

const CartItem = ({ item, updateQuantity, removeItem, handleSelection, isSelected }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const updateTimer = () => {
            if (!item.offerEnd) return;
            const now = new Date();
            const offerEndTime = new Date(item.offerEnd);
            const diff = offerEndTime - now;
            if (diff > 0) {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                setTimeLeft(`${hours}h ${minutes}m left`);
            } else {
                setTimeLeft("Offer expired");
            }
        };

        updateTimer();
        const timer = setInterval(updateTimer, 60000);
        return () => clearInterval(timer);
    }, [item.offerEnd]);

    return (
        <div className="flex items-start gap-3 p-3 border-b hover:bg-gray-50 transition-all rounded-md">
            {/* Checkbox for Selection */}
            <label className="flex items-center cursor-pointer mt-2">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => handleSelection(item.id, e.target.checked)}
                    className="hidden"
                />
                <span
                    className={`w-5 h-5 flex items-center justify-center rounded border-2 border-black-400 
                    ${isSelected ? "border-green-500 text-white" : "bg-white text-gray-400"}`}
                >
                    {isSelected ? "✔" : ""}
                </span>
            </label>

            {/* Link to Product Details Page */}
            <Link to={`/product/${item.id}`} className="flex items-center">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md border"
                />
            </Link>

            {/* Product Details and Actions */}
            <div className="flex-1">
                {/* First Row: Product Name, Quantity Selector, Remove Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    {/* Link for product name to navigate */}
                    <Link to={`/product/${item.id}`} className="font-semibold text-lg text-gray-900 hover:underline">
                        {item.name}
                    </Link>

                    <div className="flex items-center gap-3">
                        {/* Quantity Selector */}
                        <div className="flex items-center border rounded-md">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent navigation
                                    updateQuantity(item.id, Math.max(1, item.quantity - 1));
                                }}
                                className="px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-l"
                            >
                                −
                            </button>
                            <span className="px-3">{item.quantity}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent navigation
                                    updateQuantity(item.id, item.quantity + 1);
                                }}
                                className="px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-r"
                            >
                                +
                            </button>
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent navigation
                                removeItem(item.id);
                            }}
                            className="text-red-500 text-xl hover:text-red-700 ml-[35px]"
                        >
                            <FaTrashAlt />
                        </button>
                    </div>
                </div>

                {/* Second Row: Price, Added Date, Offer, Timer */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                    {item.originalPrice && (
                        <p className="text-[20px] text-red-500 line-through">₹{item.originalPrice}</p>
                    )}
                    <p className="text-[28px] font-bold text-[green] shadow-md tracking-wide">
                        ₹{item.price}
                    </p>

                    <p className="text-gray-400 text-xs">🗓️ Added: {item.addedDate}</p>
                    {item.offer && (
                        <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                            <svg className="w-4 h-4 text-[#FF6B35]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                            {item.offer} OFF
                        </p>
                    )}
                    {item.offerEnd && (
                        <p className="text-red-500 text-xs flex items-center gap-1">
                            <FaClock /> {timeLeft}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartItem;
