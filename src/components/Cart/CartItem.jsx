import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaClock, FaCheck } from "react-icons/fa";

const CartItem = ({ item, updateQuantity, removeItem, handleSelection, isSelected }) => {
    const [timeLeft, setTimeLeft] = useState("");

    // Function to calculate offer time left
    const calculateTimeLeft = useCallback(() => {
        if (!item.offerEnd) return "";

        const now = new Date();
        const offerEndTime = new Date(item.offerEnd);
        const diff = offerEndTime - now;

        if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            return `${hours}h ${minutes}m left`;
        }
        return "Offer expired";
    }, [item.offerEnd]);

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 60000); // Update exactly every minute

        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    return (
        <div
            className={`flex items-start gap-4 p-4 rounded-lg transition-all mt-[5px]
                ${isSelected ? "bg-blue-5 border-2 border-blue-2" : "bg-white border border-gray-200"}
            `}
        >
            {/* Custom Checkbox */}
            <button
                onClick={() => handleSelection(item.id, !isSelected)}
                className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center mt-3 transition-all
                    ${isSelected ? "bg-blue-500 border-blue-500" : "bg-white border-2 border-gray-300"}
                `}
                aria-label={isSelected ? "Deselect item" : "Select item"}
            >
                {isSelected && <FaCheck className="text-white text-xs" />}
            </button>

            {/* Product Image */}
            <Link to={`/product/${item.id}`} className="flex-shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                />
            </Link>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
                {/* Top Row - Name and Actions */}
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <Link
                        to={`/product/${item.id}`}
                        className="text-lg font-semibold text-gray-800 hover:text-blue-600 truncate"
                        title={item.name}
                    >
                        {item.name}
                    </Link>

                    <div className="flex items-center gap-3">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>
                            <span className="px-3 py-1 text-center min-w-[2rem]">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                        >
                            <FaTrashAlt />
                        </button>
                    </div>
                </div>

                {/* Price Information */}
                <div className="mt-2 flex flex-wrap items-center gap-3">
                    {/* Original Price (Strikethrough) */}
                    {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                    )}

                    {/* Discounted Price */}
                    <span className="text-2xl font-extrabold text-orange-600 shadow-sm">
                        ₹{item.price}
                    </span>

                    {/* Offer Badge */}
                    {item.offer && (
                        <span className="text-xs font-semibold bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-full shadow-md">
                            {item.offer} OFF
                        </span>
                    )}
                </div>


                {/* Meta Information */}
                <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-4 text-sm">
                    {/* Added Date - Stacked in mobile, inline in desktop */}
                    <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-md shadow-sm text-xs sm:text-sm w-full sm:w-auto text-center sm:text-left">
                        🗓️ Added: <span className="font-semibold">{item.addedDate}</span>
                    </span>

                    {/* Offer Countdown - Adjusts for mobile */}
                    {item.offerEnd && timeLeft && (
                        <span
                            className={`flex items-center gap-1 px-3 py-1 rounded-md shadow-sm text-xs sm:text-sm 
                ${timeLeft === "Offer expired" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-700"} 
                w-full sm:w-auto justify-center sm:justify-start`}
                            aria-live="polite"
                        >
                            <FaClock className="text-base sm:text-sm" />
                            <span className="font-semibold">{timeLeft}</span>
                        </span>
                    )}
                </div>

            </div>
        </div>
    );
};

export default CartItem;
