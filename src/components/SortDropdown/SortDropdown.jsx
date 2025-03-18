import React from "react";

const SortDropdown = ({ sort, setSort }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1 mt-14">Sort By</label>
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="p-2 border rounded-md"
            >
                <option value="popularity">Popularity</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
            </select>
        </div>
    );
};

export default SortDropdown;
