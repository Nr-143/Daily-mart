import React, { useState, useEffect } from "react";
import FiltersSidebar from "../components/FiltersSidebar/FiltersSidebar";
import SortDropdown from "../components/SortDropdown/SortDropdown";
import ProductCard from "../components/ProductCards/ProductCards";

const ProductListingPage = () => {
    const [filters, setFilters] = useState({ category: "", price: [0, 1000], rating: "", brand: "", availability: "", discount: "" });
    const [sort, setSort] = useState("popularity");
    const [products, setProducts] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile Sidebar Toggle
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("filters", filters, "setSort", sort);
        const getProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = [
                    { id: 1, name: "Apple iPhone 14", category: "electronics", price: 999, rating: 5, brand: "Apple", availability: "in-stock", discount: 10, reviews: 120, image: "https://via.placeholder.com/150", description:"Experience the ultimate smartphone with a stunning 6.7-inch display, A16 Bionic chip" },
                    { id: 2, name: "Samsung Galaxy S23", category: "electronics", price: 799, rating: 4, brand: "Samsung", availability: "in-stock", discount: 20, reviews: 95, image: "https://via.placeholder.com/150", description: "Experience the ultimate smartphone with a stunning 6.7-inch display, A16 Bionic chip"  },
                    { id: 3, name: "Organic Bananas", category: "groceries", price: 2, rating: 5, brand: "", availability: "in-stock", discount: 5, reviews: 45, image: "https://via.placeholder.com/150", description: "Experience the ultimate smartphone with a stunning 6.7-inch display, A16 Bionic chip"  },
                    { id: 4, name: "Men's Cotton T-Shirt", category: "clothing", price: 20, rating: 4, brand: "Nike", availability: "in-stock", discount: 30, reviews: 60, image: "https://via.placeholder.com/150", description: "Experience the ultimate smartphone with a stunning 6.7-inch display, A16 Bionic chip"  },
                    { id: 5, name: "Sony WH-1000XM5", category: "electronics", price: 350, rating: 5, brand: "Sony", availability: "out-of-stock", discount: 15, reviews: 210, image: "https://via.placeholder.com/150", description: "Experience the ultimate smartphone with a stunning 6.7-inch display, A16 Bionic chip"  },
                    { id: 6, name: "Adidas Running Shoes", category: "clothing", price: 120, rating: 4, brand: "Adidas", availability: "in-stock", discount: 50, reviews: 88, image: "https://via.placeholder.com/150", description: "Experience the ultimate smartphone with a stunning 6.7-inch display, A16 Bionic chip" },
                ];
                setProducts(response);
            } catch (err) {
                setError("Failed to load products.");
            }
            setLoading(false);
        };

        getProducts();
    }, [filters, sort]);

    return (
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row">
            {/* Sidebar for Desktop */}
            <div className={`md:w-1/4 ${isSidebarOpen ? "block" : "hidden"} md:block`}>
                <FiltersSidebar filters={filters} setFilters={setFilters} />
            </div>

            {/* Main Content */}
            <div className="md:w-3/4 flex flex-col">
                {/* Top Controls - Sticky */}
                <div className="sticky top-0 bg-white z-10 py-4">
                    <div className="flex justify-between items-center mb-4">
                        <button className="md:hidden bg-electric-purple text-white px-4 py-2 rounded-lg mt-[40px]"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            {isSidebarOpen ? "Close Filters" : "Open Filters"}
                        </button>
                        <SortDropdown sort={sort} setSort={setSort} />
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <p className="text-gray-500">Loading products...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 
                 overflow-y-auto scrollbar-hide h-[72vh]">
                        {/* Your product cards go here */}
                
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