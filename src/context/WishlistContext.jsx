import React, { createContext, useState, useContext } from "react";

// Create Wishlist Context
const WishlistContext = createContext();

// Hardcoded wishlist items for testing
const initialWishlist = [
    { id: 1, name: "Sony WH-1000XM5", price: 299, image: "/images/sony-headphones.jpg" },
    { id: 2, name: "Apple AirPods Pro", price: 199, image: "/images/airpods-pro.jpg" },
];

// Wishlist Provider
export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(initialWishlist);

    // Function to add an item to the wishlist
    const addToWishlist = (product) => {
        if (!wishlist.find((item) => item.id === product.id)) {
            setWishlist([...wishlist, product]);
        }
    };

    // Function to remove an item from the wishlist
    const removeFromWishlist = (id) => {
        setWishlist(wishlist.filter((item) => item.id !== id));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

// Custom hook for easy access
export const useWishlist = () => useContext(WishlistContext);
