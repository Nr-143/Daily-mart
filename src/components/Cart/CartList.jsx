import React from "react";
import CartItem from "./CartItem";

const CartList = ({ cartItems, updateQuantity, removeItem, handleSelection, selectedItems }) => {
    return (
        <div className="w-full p-1 bg-white rounded-lg">
            {/* Scrollable Cart Items */}
            <div className="max-h-[600px] sm:max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            updateQuantity={updateQuantity}
                            removeItem={removeItem}
                            handleSelection={handleSelection}
                            isSelected={selectedItems.includes(item.id)}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 text-lg">Your cart is empty! 🛒</p>
                )}
            </div>
        </div>
    );
};

export default CartList;
