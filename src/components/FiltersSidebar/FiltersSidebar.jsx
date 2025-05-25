import React, { useState, useEffect } from "react";
import CustomDropdown from "../CustomDropdown/CustomDropdown.jsx";
import "../FiltersSidebar/FiltersSidebar.css"
const FiltersSidebar = ({ filters = {}, setFilters }) => {
    // Existing state for category and subcategory
    const [selectedCategory, setSelectedCategory] = useState(filters.category || "");
    const [selectedSubCategory, setSelectedSubCategory] = useState(filters.subCategory || "");

    // New state for additional filters
    const [selectedPriceRange, setSelectedPriceRange] = useState(filters.priceRange || "");
    const [selectedBrand, setSelectedBrand] = useState(filters.brand || "");
    const [selectedRating, setSelectedRating] = useState(filters.rating || "");
    const [selectedAvailability, setSelectedAvailability] = useState(filters.availability || "");

    // Update filters whenever any state changes
    useEffect(() => {
        setFilters?.((prevFilters) => ({
            ...prevFilters,
            category: selectedCategory,
            subCategory: selectedSubCategory,
            priceRange: selectedPriceRange,
            brand: selectedBrand,
            rating: selectedRating,
            availability: selectedAvailability,
        }));
    }, [
        selectedCategory,
        selectedSubCategory,
        selectedPriceRange,
        selectedBrand,
        selectedRating,
        selectedAvailability,
        setFilters,
    ]);

    // Handlers for category and subcategory
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setSelectedSubCategory(""); // Reset subcategory when category changes
    };

    const handleSubCategoryChange = (value) => {
        setSelectedSubCategory(value);
    };

    // Handlers for additional filters
    const handlePriceRangeChange = (value) => {
        setSelectedPriceRange(value);
    };

    const handleBrandChange = (value) => {
        setSelectedBrand(value);
    };

    const handleRatingChange = (value) => {
        setSelectedRating(value);
    };

    const handleAvailabilityChange = (value) => {
        setSelectedAvailability(value);
    };

    // Options for category and subcategory
    const categoryOptions = [
        { value: "", label: "All" },
        { value: "groceries", label: "Groceries" },
        { value: "clothing", label: "Clothing" },
        { value: "electronics", label: "Electronics" },
        { value: "home-furniture", label: "Home & Furniture" },
    ];

    const subCategoryOptions = {
        groceries: [
            { value: "fruits-vegetables", label: "Fruits & Vegetables" },
            { value: "dairy-bakery", label: "Dairy & Bakery" },
            { value: "beverages", label: "Beverages" },
            { value: "snacks-instant", label: "Snacks & Instant Foods" },
        ],
        clothing: [
            { value: "men", label: "Men" },
            { value: "women", label: "Women" },
            { value: "kids", label: "Kids" },
        ],
        electronics: [
            { value: "mobiles", label: "Mobile Phones" },
            { value: "laptops", label: "Laptops & Computers" },
            { value: "audio", label: "Audio & Headphones" },
            { value: "wearables", label: "Smart Wearables" },
        ],
        "home-furniture": [
            { value: "decor", label: "Home Decor" },
            { value: "kitchen", label: "Kitchen Essentials" },
            { value: "storage", label: "Storage & Organization" },
        ],
    };

    const clothingSubCategories = {
        men: [
            { value: "top-wear", label: "Top Wear" },
            { value: "bottom-wear", label: "Bottom Wear" },
            { value: "footwear", label: "Footwear" },
        ],
        women: [
            { value: "ethnic-wear", label: "Ethnic Wear" },
            { value: "western-wear", label: "Western Wear" },
            { value: "footwear", label: "Footwear" },
        ],
        kids: [
            { value: "boys-clothing", label: "Boys' Clothing" },
            { value: "girls-clothing", label: "Girls' Clothing" },
        ],
    };

    // Options for additional filters
    const priceRangeOptions = [
        { value: "", label: "All" },
        { value: "0-500", label: "Under ₹500" },
        { value: "500-1000", label: "₹500 - ₹1000" },
        { value: "1000-2000", label: "₹1000 - ₹2000" },
        { value: "2000-5000", label: "₹2000 - ₹5000" },
        { value: "5000+", label: "Above ₹5000" },
    ];

    const brandOptions = [
        { value: "", label: "All" },
        { value: "brand1", label: "Brand 1" },
        { value: "brand2", label: "Brand 2" },
        { value: "brand3", label: "Brand 3" },
    ];

    const ratingOptions = [
        { value: "", label: "All" },
        { value: "4.5", label: "4.5 & above" },
        { value: "4", label: "4 & above" },
        { value: "3", label: "3 & above" },
        { value: "2", label: "2 & above" },
    ];

    const availabilityOptions = [
        { value: "", label: "All" },
        { value: "in-stock", label: "In Stock" },
        { value: "out-of-stock", label: "Out of Stock" },
    ];

    return (
        <div className="filters-sidebar custom-scrollbar mt-10">
            <h3 className="text-lg font-semibold mt-[-10px] ">Filters</h3>

            {/* Category Filter */}
            <CustomDropdown
                label="Category"
                options={categoryOptions}
                value={selectedCategory}
                onChange={handleCategoryChange}
            />

            {/* Subcategory Filter */}
            {selectedCategory && subCategoryOptions[selectedCategory] && (
                <CustomDropdown
                    label="Subcategory"
                    options={subCategoryOptions[selectedCategory]}
                    value={selectedSubCategory}
                    onChange={handleSubCategoryChange}
                />
            )}

            {/* Clothing Nested Filter */}
            {selectedCategory === "clothing" && selectedSubCategory && clothingSubCategories[selectedSubCategory] && (
                <CustomDropdown
                    label={`${selectedSubCategory} Category`}
                    options={clothingSubCategories[selectedSubCategory]}
                    value={filters?.clothingType || ""}
                    onChange={(value) =>
                        setFilters?.((prevFilters) => ({
                            ...prevFilters,
                            clothingType: value,
                        }))
                    }
                />
            )}

            {/* Price Range Filter */}
            <CustomDropdown
                label="Price Range"
                options={priceRangeOptions}
                value={selectedPriceRange}
                onChange={handlePriceRangeChange}
            />

            {/* Brand Filter */}
            <CustomDropdown
                label="Brand"
                options={brandOptions}
                value={selectedBrand}
                onChange={handleBrandChange}
            />

            {/* Rating Filter */}
            <CustomDropdown
                label="Rating"
                options={ratingOptions}
                value={selectedRating}
                onChange={handleRatingChange}
            />

            {/* Availability Filter */}
            <CustomDropdown
                label="Availability"
                options={availabilityOptions}
                value={selectedAvailability}
                onChange={handleAvailabilityChange}
            />
        </div>
    );
};

export default FiltersSidebar;