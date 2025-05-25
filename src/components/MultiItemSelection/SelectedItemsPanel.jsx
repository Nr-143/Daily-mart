import React from 'react';
import { FiX, FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi';

const SelectedItemsPanel = ({ selectedItems, onRemove, onQuantityChange, onClose }) => {
    const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    return (
        <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Selected Items</h2>
                <button onClick={onClose} className="md:hidden p-1 rounded-full hover:bg-gray-100">
                    <FiX size={20} />
                </button>
            </div>

            {selectedItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                    <FiShoppingCart size={48} className="mb-4 opacity-50" />
                    <p>Your cart is empty</p>
                </div>
            ) : (
                <>
                    <div className="flex-1 overflow-y-auto space-y-4">
                        {selectedItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                                    >
                                        <FiMinus size={14} />
                                    </button>
                                    <span className="w-6 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                                    >
                                        <FiPlus size={14} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => onRemove(item.id)}
                                    className="ml-4 text-red-500 hover:text-red-700"
                                >
                                    <FiX size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4  md:pb-3 pb-9 border-t">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-medium">Total:</span>
                            <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                        </div>
                        <button
                            className="w-full py-3 bg-orange-600 hover:bg-orange-500  rounded-lg text-white font-medium"
                        >
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default SelectedItemsPanel;