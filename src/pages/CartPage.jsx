import React, { useState, useEffect } from "react";
import CartList from "../components/Cart/CartList";
import CartSummary from "../components/Cart/CartSummary";
import defaultImage from "../assets/homeAppliances.jpg";
import LoaderWithMessage from "../components/Loader/LoaderWithMessage";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulating data fetch
    useEffect(() => {
        setTimeout(() => {
            const data = [
                { id: 1, name: "Apple", price: 50, originalPrice: 70, quantity: 1, image: defaultImage, offer: "10%", offerEnd: "2025-03-25T23:59:59", addedDate: "2025-03-20" },
                { id: 2, name: "Milk", price: 30, originalPrice: 70, quantity: 2, image: defaultImage, offer: "10%", offerEnd: "2025-03-25T23:59:59", addedDate: "2025-03-20" },
                { id: 3, name: "Water Bottle", price: 30, quantity: 2, image: defaultImage },
                { id: 4, name: "Bags", price: 30, quantity: 2, image: defaultImage },
                { id: 5, name: "Knife", price: 30, originalPrice: 70, quantity: 2, image: defaultImage, offer: "10%", offerEnd: "2025-03-25T23:59:59", addedDate: "2025-03-20" },
                { id: 6, name: "Mobile Case", price: 30, quantity: 2, image: defaultImage },
                { id: 7, name: "Clothes", price: 30, quantity: 2, image: defaultImage },
            ];
            setCartItems(data);
            setSelectedItems(data.map(item => item.id)); // Select all items by default
            setLoading(false);
        }, 1500); // Simulating a 1.5s API fetch delay
    }, []);

    const updateQuantity = (id, newQuantity) => {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
        setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    };

    const handleSelection = (id, isSelected) => {
        setSelectedItems((prev) =>
            isSelected ? [...prev, id] : prev.filter((itemId) => itemId !== id)
        );
    };

    if (loading) return <LoaderWithMessage message="Loading your cart items..." />;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mt-[45px]">/ Cart</h1>

            {/* Mobile View: Cart Summary Fixed at Bottom */}
            <div className="block md:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 border-t z-50">
                <CartSummary cartItems={cartItems} selectedItems={selectedItems} />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                {/* Cart List - Scrollable */}
                <div className="w-full md:w-2/3 max-h-[calc(100vh-120px)] p-2 border">
                    <CartList
                        cartItems={cartItems}
                        updateQuantity={updateQuantity}
                        removeItem={removeItem}
                        handleSelection={handleSelection}
                        selectedItems={selectedItems}
                    />
                </div>

                {/* Desktop View: Cart Summary Fixed at Top */}
                <div className="hidden md:block w-full md:w-1/3 md:sticky md:top-20 p-2 border shadow-lg bg-white rounded-lg">
                    <CartSummary cartItems={cartItems} selectedItems={selectedItems} />
                </div>
            </div>
        </div>
    );
};

export default CartPage;
