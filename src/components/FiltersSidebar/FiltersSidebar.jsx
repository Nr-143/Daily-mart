import React, { useState } from "react";
import CustomDropdown from "../CustomDropdown/CustomDropdown.jsx";

const FiltersSidebar = ({ filters, setFilters }) => {
    const [priceRange, setPriceRange] = useState(filters.price || [0, 1000]);

    const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const categoryOptions = [
        { value: "", label: "All" },
        { value: "groceries", label: "Groceries" },
        { value: "clothing", label: "Clothing" },
        { value: "electronics", label: "Electronics" },
    ];

    const ratingOptions = [
        { value: "", label: "All" },
        { value: "4", label: "4★ & Up" },
        { value: "3", label: "3★ & Up" },
        { value: "2", label: "2★ & Up" },
    ];

    const brandOptions = [
        { value: "", label: "All" },
        { value: "Apple", label: "Apple" },
        { value: "Samsung", label: "Samsung" },
        { value: "Sony", label: "Sony" },
        { value: "Adidas", label: "Adidas" },
        { value: "Nike", label: "Nike" },
    ];

    const availabilityOptions = [
        { value: "", label: "All" },
        { value: "in-stock", label: "In Stock" },
        { value: "out-of-stock", label: "Out of Stock" },
    ];

    const discountOptions = [
        { value: "", label: "All" },
        { value: "10", label: "10% & Above" },
        { value: "20", label: "20% & Above" },
        { value: "30", label: "30% & Above" },
        { value: "50", label: "50% & Above" },
    ];

    return (
        <div className="bg-white shadow-lg p-6 rounded-lg w-full md:w-64">
            <h3 className="text-lg font-semibold mb-4 mt-10">Filters</h3>

            {/* Category Filter */}
            <CustomDropdown
                label="Category"
                options={categoryOptions}
                value={filters.category}
                onChange={(value) => handleFilterChange("category", value)}
            />

            {/* Price Range Filter */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Price Range</label>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                />
                <p className="text-sm text-gray-600">${priceRange[0]} - ${priceRange[1]}</p>
            </div>

            {/* Rating Filter */}
            <CustomDropdown
                label="Rating"
                options={ratingOptions}
                value={filters.rating}
                onChange={(value) => handleFilterChange("rating", value)}
            />

            {/* Brand Filter */}
            <CustomDropdown
                label="Brand"
                options={brandOptions}
                value={filters.brand}
                onChange={(value) => handleFilterChange("brand", value)}
            />

            {/* Availability Filter */}
            <CustomDropdown
                label="Availability"
                options={availabilityOptions}
                value={filters.availability}
                onChange={(value) => handleFilterChange("availability", value)}
            />

            {/* Discount Filter */}
            <CustomDropdown
                label="Discount Range"
                options={discountOptions}
                value={filters.discount}
                onChange={(value) => handleFilterChange("discount", value)}
            />
        </div>
    );
};

export default FiltersSidebar;