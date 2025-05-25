import React from "react";

const SortDropdown = ({ sort, setSort }) => {
    return (
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-[20px]">
            {/* Sort Label */}
            {/* <label className="text-gray-900 font-semibold whitespace-nowrap">
                Sort By:
            </label> */}

            {/* Sort Dropdown */}
            <div className="relative w-full md:w-48 min-w-[120px]">
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md 
                     text-gray-700 cursor-pointer transition duration-300 ease-in-out 
                     bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                     hover:shadow-md hover:border-gray-400 appearance-none"
                >
                    <option value="popularity">Popularity</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="newest">Newest Arrivals</option>
                </select>

                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-600 transition-transform duration-300 ease-in-out"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SortDropdown;
