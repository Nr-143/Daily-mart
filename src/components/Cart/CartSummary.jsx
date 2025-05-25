import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";

const CartSummary = ({ cartItems, selectedItems }) => {
    const navigate = useNavigate();
    const filteredItems = cartItems.filter(item => selectedItems.includes(item.id));
    const totalPrice = filteredItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="p-6 bg-white  ">
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#1B1F3B]">
                <FaShoppingCart className="text-[#FF6B35]" /> Cart Summary
            </h2>
            <p className="text-gray-600 mt-2 text-sm">Total Items: <span className="font-semibold text-[#6A0DAD]">{filteredItems.length}</span></p>

            <div className="flex justify-between items-center mt-3">
                <p className="text-lg font-semibold flex items-center text-[#FF6B35]">
                    <FaRupeeSign className="mr-1" /> {totalPrice.toFixed(2)}
                </p>
            </div>

            <button
                onClick={() => navigate("/checkout")}
                disabled={cartItems.length === 0 || selectedItems.length === 0} // Disable if cart is empty or no items selected
                className={`w-full py-3 mt-5 rounded-lg font-semibold transition-all duration-300 shadow-md
        ${cartItems.length === 0 || selectedItems.length === 0
                        ? "bg-gray-400 cursor-not-allowed"  // Disabled state styling
                        : "bg-[#FF6B35] text-white hover:bg-[#e65c2a]"}`
                }>
                Proceed to Checkout →
            </button>



            {/* Display selected products only on desktop */}
            <div className="hidden md:block mt-6">
                <h3 className="text-lg font-semibold text-[#1B1F3B] mb-2">Selected Products</h3>
                <div className="h-[200px] overflow-y-auto border-t custom-scrollbar border-gray-300 pt-2">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 ">
                                <p className="text-sm font-medium text-gray-700">{item.name}</p>
                                <p className="text-sm font-semibold text-[green] mr-[15px]">{item.quantity} × ₹{item.price}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No items selected.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
