import React from 'react';
import { FiPlus } from 'react-icons/fi';

const ProductCard = ({ product, onAddToSelection, isSelected }) => {
    return (
        <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col h-full relative ${isSelected ? 'ring-2 ring-indigo-500' : ''}`}>
            <div className="relative pt-[100%]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loading="lazy"
                />
                {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{product.discount}%
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                    <h3 className="font-medium text-gray-900 text-sm md:text-base mb-2 line-clamp-2">
                        {product.name}
                    </h3>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600 capitalize">
                            {product.category}
                        </span>
                        {product.dietary.map(pref => (
                            <span key={pref} className="text-xs px-2 py-1 bg-green-100 rounded-full text-green-800 capitalize">
                                {pref}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                        <span className="font-bold text-indigo-600">
                            ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                                ${product.originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => onAddToSelection(product)}
                        className={`px-3 py-1.5 rounded-lg transition-colors text-sm font-medium ${isSelected
                            ? 'bg-green-500 text-white'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                    >
                        {isSelected ? (
                            <span className="flex items-center">
                                <FiPlus className="mr-1" /> Added
                            </span>
                        ) : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;