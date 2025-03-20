import React, { useState, useEffect } from "react";
import FiltersSidebar from "../components/FiltersSidebar/FiltersSidebar";
import SortDropdown from "../components/SortDropdown/SortDropdown";
import ProductCard from "../components/ProductCards/ProductCards";

const ProductListingPage = ({ searchQuery }) => {
    // State Management
    const [filters, setFilters] = useState({
        category: "",
        price: [0, 1000],
        rating: "",
        brand: "",
        availability: "",
        discount: ""
    });


    const [sort, setSort] = useState("popularity");
    const [products, setProducts] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile Sidebar Toggle
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Example Data (Simulating API Response)
    const exampleProducts = [
        { id: 1, name: "Apple iPhone 14", category: "electronics", price: 999, rating: 5, brand: "Apple", availability: "in-stock", discount: 10, reviews: 120, image: "https://via.placeholder.com/150", description: "A stunning 6.7-inch display with A16 Bionic chip." },
        { id: 2, name: "Samsung Galaxy S23", category: "electronics", price: 799, rating: 4, brand: "Samsung", availability: "in-stock", discount: 20, reviews: 95, image: "https://via.placeholder.com/150", description: "Powerful performance with Snapdragon processor." },
        { id: 3, name: "Organic Bananas", category: "groceries", price: 2, rating: 5, brand: "", availability: "in-stock", discount: 5, reviews: 45, image: "https://via.placeholder.com/150", description: "Fresh and organic bananas for daily nutrition." },
        { id: 4, name: "Men's Cotton T-Shirt", category: "clothing", price: 20, rating: 4, brand: "Nike", availability: "in-stock", discount: 30, reviews: 60, image: "https://via.placeholder.com/150", description: "Comfortable cotton T-shirt for everyday wear." },
        { id: 5, name: "Sony WH-1000XM5", category: "electronics", price: 350, rating: 5, brand: "Sony", availability: "out-of-stock", discount: 15, reviews: 210, image: "https://via.placeholder.com/150", description: "Noise-canceling headphones with superior sound quality." },
        { id: 6, name: "Adidas Running Shoes", category: "clothing", price: 120, rating: 4, brand: "Adidas", availability: "in-stock", discount: 50, reviews: 88, image: "https://via.placeholder.com/150", description: "Durable and lightweight running shoes." }
    ];

    // Function to Fetch Products (Simulating API Call)
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 500));
            setProducts(exampleProducts);
        } catch (err) {
            setError("Failed to load products.");
        }

        setLoading(false);
    };

    // Function to Fetch Search Results (Simulating API Call)
    const searchProducts = async (query) => {
        setLoading(true);
        setError(null);

        try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Filter example products based on search query
            const filteredProducts = exampleProducts.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            console.log("searchQuery", searchQuery)

            setProducts(filteredProducts);
        } catch (err) {
            setError("Failed to load search results.");
        }

        setLoading(false);
    };

    // useEffect to Fetch Data
    useEffect(() => {
        (async () => {
            if (searchQuery) {
                console.log("searchQuery", searchQuery)
                await searchProducts(searchQuery);
            } else {
                await fetchProducts(filters);
            }
        })();
    }, [searchQuery, filters, sort]); // Dependencies

    return (
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row">
            {/* Sidebar (Filters) */}
            <div className={`md:w-1/4 ${isSidebarOpen ? "block" : "hidden"} md:block`}>
                <FiltersSidebar filters={filters} setFilters={setFilters} />
            </div>

            {/* Main Content */}
            <div className="md:w-3/4 flex flex-col">
                {/* Top Controls - Sticky */}
                <div className="sticky top-0 bg-white z-10 py-4 flex justify-between items-center">
                    <button
                        className="md:hidden bg-electric-purple text-white px-4 py-2 rounded-lg"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? "Close Filters" : "Open Filters"}
                    </button>
                    <SortDropdown sort={sort} setSort={setSort} />
                </div>

                {/* Product Grid */}
                {loading ? (
                    <p className="text-gray-500">Loading products...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto scrollbar-hide h-[72vh]">
                        {products.length > 0 ? (
                            products.map((product) => <ProductCard key={product.id} product={product} />)
                        ) : (
                            <p className="text-gray-500">No products found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductListingPage;
