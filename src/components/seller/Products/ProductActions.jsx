import React from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';

const ProductActions = ({ searchTerm, onSearchChange, onAddProduct }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-bold">Your Products</h2>
            <div className="flex space-x-3 mt-3 md:mt-0">
                <div className="relative flex-grow md:flex-grow-0">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
                        value={searchTerm}
                        onChange={onSearchChange}
                    />
                </div>
                <button
                    onClick={onAddProduct}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap"
                >
                    <FiPlus className="mr-2" />
                    <span className="hidden sm:inline">Add Product</span>
                    <span className="sm:hidden">Add</span>
                </button>
            </div>
        </div>
    );
};

export default ProductActions;