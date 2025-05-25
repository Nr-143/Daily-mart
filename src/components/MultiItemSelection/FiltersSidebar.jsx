import React from 'react';
import { FiX } from 'react-icons/fi';

const FiltersSidebar = ({
    filters = {
        price: [0, 100],
        categories: [],
        dietary: [],
        minRating: null,
        discount: null,
        inStockOnly: false
    },
    setFilters,
    onClose
}) => {
    const dietaryOptions = ['organic', 'vegan', 'gluten-free', 'keto', 'dairy-free'];
    const categories = ['fruits', 'vegetables', 'dairy', 'bakery', 'beverages', 'meat', 'seafood', 'frozen'];
    const ratingOptions = [4, 3, 2, 1];
    const discountOptions = ['10%+', '20%+', '30%+', '50%+'];

    // Safe filter values
    const safeFilters = {
        price: filters.price || [0, 100],
        categories: filters.categories || [],
        dietary: filters.dietary || [],
        minRating: filters.minRating || null,
        discount: filters.discount || null,
        inStockOnly: filters.inStockOnly || false
    };

    const handleFilterChange = (updates) => {
        setFilters({ ...safeFilters, ...updates });
    };

    const resetFilters = () => {
        setFilters({
            price: [0, 100],
            categories: [],
            dietary: [],
            minRating: null,
            discount: null,
            inStockOnly: false
        });
    };

    return (
        <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button
                    onClick={onClose}
                    className="md:hidden p-1 rounded-full hover:bg-gray-100"
                    aria-label="Close filters"
                >
                    <FiX size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
                {/* Price Range Filter */}
                <div>
                    <h3 className="font-medium mb-2">
                        Price Range (${safeFilters.price[0]} - ${safeFilters.price[1]})
                    </h3>
                    <div className="flex space-x-4 mb-2">
                        <input
                            type="number"
                            min="0"
                            max={safeFilters.price[1]}
                            value={safeFilters.price[0]}
                            onChange={(e) => handleFilterChange({
                                price: [parseInt(e.target.value) || 0, safeFilters.price[1]]
                            })}
                            className="w-1/2 p-2 border rounded-lg"
                            placeholder="Min"
                        />
                        <input
                            type="number"
                            min={safeFilters.price[0]}
                            max="1000"
                            value={safeFilters.price[1]}
                            onChange={(e) => handleFilterChange({
                                price: [safeFilters.price[0], parseInt(e.target.value) || 100]
                            })}
                            className="w-1/2 p-2 border rounded-lg"
                            placeholder="Max"
                        />
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={safeFilters.price[1]}
                        onChange={(e) => handleFilterChange({
                            price: [safeFilters.price[0], parseInt(e.target.value)]
                        })}
                        className="w-full"
                    />
                </div>

                {/* Category Filter */}
                <div>
                    <h3 className="font-medium mb-2">Categories</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {categories.map((cat) => (
                            <label key={cat} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={safeFilters.categories.includes(cat)}
                                    onChange={() => {
                                        const newCategories = safeFilters.categories.includes(cat)
                                            ? safeFilters.categories.filter((c) => c !== cat)
                                            : [...safeFilters.categories, cat];
                                        handleFilterChange({ categories: newCategories });
                                    }}
                                    className="mr-2"
                                />
                                <span className="capitalize">{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Dietary Preferences */}
                <div>
                    <h3 className="font-medium mb-2">Dietary Preferences</h3>
                    <div className="space-y-2">
                        {dietaryOptions.map((option) => (
                            <label key={option} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={safeFilters.dietary.includes(option)}
                                    onChange={() => {
                                        const newDietary = safeFilters.dietary.includes(option)
                                            ? safeFilters.dietary.filter((d) => d !== option)
                                            : [...safeFilters.dietary, option];
                                        handleFilterChange({ dietary: newDietary });
                                    }}
                                    className="mr-2"
                                />
                                <span className="capitalize">{option.replace('-', ' ')}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Rating Filter */}
                <div>
                    <h3 className="font-medium mb-2">Minimum Rating</h3>
                    <div className="flex space-x-2">
                        {ratingOptions.map((stars) => (
                            <button
                                key={stars}
                                onClick={() => handleFilterChange({
                                    minRating: safeFilters.minRating === stars ? null : stars
                                })}
                                className={`p-2 rounded-lg ${safeFilters.minRating === stars
                                        ? 'bg-yellow-100 text-yellow-600'
                                        : 'bg-gray-100'
                                    }`}
                            >
                                {Array(stars).fill().map((_, i) => (
                                    <span key={i}>★</span>
                                ))}+
                            </button>
                        ))}
                    </div>
                </div>

                {/* Discount Filter */}
                <div>
                    <h3 className="font-medium mb-2">Discount</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {discountOptions.map((discount) => (
                            <button
                                key={discount}
                                onClick={() => handleFilterChange({
                                    discount: safeFilters.discount === discount ? null : discount
                                })}
                                className={`p-2 rounded-lg ${safeFilters.discount === discount
                                        ? 'bg-green-100 text-green-600'
                                        : 'bg-gray-100'
                                    }`}
                            >
                                {discount} off
                            </button>
                        ))}
                    </div>
                </div>

                {/* Availability Filter */}
                <div>
                    <h3 className="font-medium mb-2">Availability</h3>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={safeFilters.inStockOnly}
                            onChange={() => handleFilterChange({
                                inStockOnly: !safeFilters.inStockOnly
                            })}
                            className="mr-2"
                        />
                        <span>In stock only</span>
                    </label>
                </div>
            </div>

            <div className="pt-4 pb-8 md:pb-1 border-t flex space-x-2">
                <button
                    onClick={resetFilters}
                    className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium"
                >
                    Reset All
                </button>
                <button
                    onClick={onClose}
                    className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default FiltersSidebar;