import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FiltersSidebar from "../components/FiltersSidebar/FiltersSidebar";
import SortDropdown from "../components/SortDropdown/SortDropdown";
import ProductCard from "../components/ProductCards/ProductCards";
import LoaderWithMessage from "../components/Loader/LoaderWithMessage";

const ProductListingPage = ({ searchQuery }) => {
    const { category } = useParams();
    const [filters, setFilters] = useState({
        category: category || "",
        price: [0, 1000],
        rating: "",
        brand: "",
        availability: "",
        discount: "",
    });

    const [sort, setSort] = useState("popularity");
    const [products, setProducts] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Example Data
    const exampleProducts = [
        { id: 1, name: "Apple iPhone 14", category: "electronics", price: 999, rating: 5, brand: "Apple", availability: "in-stock", discount: 10, reviews: 120, image: "https://via.placeholder.com/150", description: "A stunning 6.7-inch display with A16 Bionic chip." },
        { id: 2, name: "Samsung Galaxy S23", category: "electronics", price: 799, rating: 4, brand: "Samsung", availability: "in-stock", discount: 20, reviews: 95, image: "https://via.placeholder.com/150", description: "Powerful performance with Snapdragon processor." },
        { id: 3, name: "Organic Bananas", category: "groceries", price: 2, rating: 5, brand: "", availability: "in-stock", discount: 5, reviews: 45, image: "https://via.placeholder.com/150", description: "Fresh and organic bananas for daily nutrition." },
        { id: 4, name: "Men's Cotton T-Shirt", category: "clothing", price: 20, rating: 4, brand: "Nike", availability: "in-stock", discount: 30, reviews: 60, image: "https://via.placeholder.com/150", description: "Comfortable cotton T-shirt for everyday wear." },
        { id: 5, name: "Sony WH-1000XM5", category: "electronics", price: 350, rating: 5, brand: "Sony", availability: "out-of-stock", discount: 15, reviews: 210, image: "https://via.placeholder.com/150", description: "Noise-canceling headphones with superior sound quality." },
        { id: 6, name: "Adidas Running Shoes", category: "clothing", price: 120, rating: 4, brand: "Adidas", availability: "in-stock", discount: 50, reviews: 88, image: "https://via.placeholder.com/150", description: "Durable and lightweight running shoes." }
    ];

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            let filteredProducts = exampleProducts;
            if (filters.category) {
                filteredProducts = filteredProducts.filter(
                    product => product.category.toLowerCase() === filters.category.toLowerCase()
                );
            }

            // Apply additional filters
            filteredProducts = filteredProducts.filter(product => {
                return (
                    product.price >= filters.price[0] &&
                    product.price <= filters.price[1] &&
                    (filters.rating ? product.rating >= parseInt(filters.rating) : true) &&
                    (filters.brand ? product.brand === filters.brand : true) &&
                    (filters.availability ? product.availability === filters.availability : true) &&
                    (filters.discount ? product.discount >= parseInt(filters.discount) : true)
                );
            });

            setProducts(filteredProducts);
        } catch (err) {
            setError("Failed to load products. Please try again later.");
            console.error("Fetch error:", err);
        }

        setLoading(false);
    };

    const searchProducts = async (query) => {
        setLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            let filteredProducts = exampleProducts.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
            );

            if (filters.category) {
                filteredProducts = filteredProducts.filter(
                    product => product.category.toLowerCase() === filters.category.toLowerCase()
                );
            }

            setProducts(filteredProducts);
        } catch (err) {
            setError("Failed to load search results.");
            console.error("Search error:", err);
        }

        setLoading(false);
    };

    useEffect(() => {
        setFilters(prev => ({ ...prev, category: category || "" }));
    }, [category]);

    useEffect(() => {
        const loadData = async () => {
            if (searchQuery) {
                await searchProducts(searchQuery);
            } else {
                await fetchProducts();
            }
        };

        // Add debounce for real API calls
        const debounceTimer = setTimeout(loadData, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery, category, filters]);

    const resetFilters = () => {
        setFilters({
            category: category || "",
            price: [0, 1000],
            rating: "",
            brand: "",
            availability: "",
            discount: "",
        });
    };

    return (
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row min-h-screen">
            {/* Sidebar */}
            <div className={`md:w-1/4 ${isSidebarOpen ? "block" : "hidden"} md:block`}>
                <FiltersSidebar
                    filters={filters}
                    setFilters={setFilters}
                    onReset={resetFilters}
                />
            </div>

            {/* Main Content */}
            <div className="md:w-3/4 flex flex-col">
                {/* Top Controls */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <button
                        className="md:hidden bg-electric-purple hover:bg-electric-purple-dark text-white px-4 py-2 rounded-lg transition-colors"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        aria-expanded={isSidebarOpen}
                        aria-label="Toggle filters sidebar"
                    >
                        {isSidebarOpen ? "Close Filters" : "Open Filters"}
                    </button>
                    <SortDropdown sort={sort} setSort={setSort} />
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <LoaderWithMessage message="Loading products..." />
                    </div>
                ) : error ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                        <span className="text-red-500 text-lg mb-4">{error}</span>
                        <button
                            onClick={searchQuery ? () => searchProducts(searchQuery) : fetchProducts}
                            className="bg-electric-purple text-white px-6 py-2 rounded-lg hover:bg-electric-purple-dark transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 py-4">
                        {products.length > 0 ? (
                            products.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    className="hover:shadow-lg transition-shadow"
                                />
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-12">
                                <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-gray-500 text-lg mb-2">No products found</p>
                                <p className="text-gray-400 mb-4">Try adjusting your filters or search term</p>
                                <button
                                    onClick={resetFilters}
                                    className="text-electric-purple hover:underline font-medium"
                                >
                                    Reset all filters
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductListingPage;