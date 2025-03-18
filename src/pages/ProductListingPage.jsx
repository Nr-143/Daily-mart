import React, { useState, useEffect } from "react";
import FiltersSidebar from "../components/FiltersSidebar/FiltersSidebar";
import SortDropdown from "../components/SortDropdown/SortDropdown";
import ProductCard from "../components/ProductCards/ProductCards.jsx";

const exampleProducts = [
    { id: 1, name: "Apple iPhone 14", category: "electronics", price: 999, rating: 5, reviews: 120, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Samsung Galaxy S23", category: "electronics", price: 799, rating: 4, reviews: 95, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Organic Bananas", category: "groceries", price: 2, rating: 5, reviews: 45, image: "https://via.placeholder.com/150" },
    { id: 4, name: "Men's Cotton T-Shirt", category: "clothing", price: 20, rating: 4, reviews: 60, image: "https://via.placeholder.com/150" },
    { id: 5, name: "Sony WH-1000XM5", category: "electronics", price: 350, rating: 5, reviews: 210, image: "https://via.placeholder.com/150" },
    { id: 6, name: "Adidas Running Shoes", category: "clothing", price: 120, rating: 4, reviews: 88, image: "https://via.placeholder.com/150" },
];

const ProductListingPage = () => {
    const [filters, setFilters] = useState({ category: "", price: [0, 1000], rating: "" });
    const [sort, setSort] = useState("popularity");
    const [products, setProducts] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile Sidebar Toggle

    useEffect(() => {
        let filteredProducts = exampleProducts.filter((product) => {
            return (
                (!filters.category || product.category === filters.category) &&
                (product.price >= filters.price[0] && product.price <= filters.price[1]) &&
                (!filters.rating || product.rating >= parseInt(filters.rating))
            );
        });

        // Sorting Logic
        if (sort === "price-low-high") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sort === "price-high-low") {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sort === "newest") {
            filteredProducts.reverse(); // Assuming newest are at the end of the array
        }

        setProducts(filteredProducts);
    }, [filters, sort]);

    return (
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row">
            {/* Sidebar for Desktop */}
            <div className={`md:w-1/4 ${isSidebarOpen ? "block" : "hidden"} md:block`}>
                <FiltersSidebar filters={filters} setFilters={setFilters} />
            </div>

            {/* Main Content */}
            <div className="md:w-3/4 flex flex-col">
                {/* Top Controls */}
                <div className="flex justify-between items-center mb-4">
                    <button className="md:hidden bg-electric-purple text-white px-4 py-2 rounded-lg"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? "Close Filters" : "Open Filters"}
                    </button>
                    <SortDropdown sort={sort} setSort={setSort} />
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.length > 0 ? (
                        products.map((product) => <ProductCard key={product.id} product={product} />)
                    ) : (
                        <p className="text-gray-500">No products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListingPage;
