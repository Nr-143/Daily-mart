import React, { useState, useEffect } from 'react';
import { FiFilter, FiShoppingCart, FiSearch } from 'react-icons/fi';
import ProductCard from '../components/MultiItemSelection/ProductCard';
import FiltersSidebar from '../components/MultiItemSelection/FiltersSidebar';
import SelectedItemsPanel from '../components/MultiItemSelection/SelectedItemsPanel';

const MultiItemSelectionPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [filters, setFilters] = useState({
        price: [0, 100],
        category: '',
        dietary: []
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [mobileCartOpen, setMobileCartOpen] = useState(false);

    const exampleProducts = [
        { id: 1, name: 'Organic Apples', category: 'fruits', price: 3.99, originalPrice: 4.99, discount: 20, image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb', dietary: ['organic'] },
        { id: 2, name: 'Whole Grain Bread', category: 'bakery', price: 4.50, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff', dietary: ['gluten-free'] },
        { id: 3, name: 'Free Range Eggs (Dozen)', category: 'dairy', price: 5.99, image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc', dietary: [] },
        { id: 4, name: 'Almond Milk', category: 'beverages', price: 2.99, originalPrice: 3.49, discount: 15, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150', dietary: ['vegan'] },
        { id: 5, name: 'Organic Spinach', category: 'vegetables', price: 2.49, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb', dietary: ['organic'] },
        { id: 6, name: 'Grass-Fed Ground Beef (1lb)', category: 'meat', price: 8.99, image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7', dietary: [] },
        { id: 7, name: 'Greek Yogurt', category: 'dairy', price: 3.79, image: 'https://images.unsplash.com/photo-1550583724-8e48a8a9b6b2', dietary: [] },
        { id: 8, name: 'Avocados', category: 'fruits', price: 1.99, originalPrice: 2.49, discount: 20, image: 'https://images.unsplash.com/photo-1519098901909-b1553a1190af', dietary: [] },
    ];

    const fetchProducts = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 300));
            setProducts(exampleProducts);
            setFilteredProducts(exampleProducts);
        } catch (err) {
            console.error('Failed to fetch products', err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [filters, searchQuery, products]);

    const filterProducts = () => {
        const filtered = products.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const priceMatch = product.price >= filters.price[0] && product.price <= filters.price[1];
            const categoryMatch = !filters.category || product.category === filters.category;
            const dietaryMatch = filters.dietary.length === 0 ||
                filters.dietary.some(pref => product.dietary.includes(pref));

            return nameMatch && priceMatch && categoryMatch && dietaryMatch;
        });
        setFilteredProducts(filtered);
    };

    const handleAddToSelection = (product) => {
        setSelectedItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const handleRemoveFromSelection = (productId) => {
        setSelectedItems(prev => prev.filter(item => item.id !== productId));
    };

    const handleQuantityChange = (productId, quantity) => {
        setSelectedItems(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            ).filter(item => item.quantity > 0)
        );
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50 relative">
            {/* Floating action buttons for mobile */}
            <div className="md:hidden fixed bottom-12 left-4 right-4 flex justify-between z-10">
                <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg"
                >
                    <FiFilter size={24} />
                </button>

                <button
                    onClick={() => setMobileCartOpen(true)}
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg relative"
                >
                    <FiShoppingCart size={24} />
                    {selectedItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {selectedItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                        </span>
                    )}
                </button>
            </div>

            {/* Mobile filters overlay */}
            {mobileFiltersOpen && (
                <div className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-50">
                    <div className="absolute bottom-3 left-0 right-0 h-4/5 bg-white rounded-t-3xl shadow-xl overflow-y-auto">
                        <FiltersSidebar
                            filters={filters}
                            setFilters={setFilters}
                            onClose={() => setMobileFiltersOpen(false)}
                        />
                    </div>
                </div>
            )}

            {/* Mobile cart overlay */}
            {mobileCartOpen && (
                <div className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-50">
                    <div className="absolute bottom-2 left-0 right-0 h-4/5 bg-white rounded-t-3xl shadow-xl overflow-y-auto">
                        <SelectedItemsPanel
                            selectedItems={selectedItems}
                            onRemove={handleRemoveFromSelection}
                            onQuantityChange={handleQuantityChange}
                            onClose={() => setMobileCartOpen(false)}
                        />
                    </div>
                </div>
            )}

            {/* Desktop filters sidebar */}
            <div className="hidden md:block w-72 bg-white border-r shadow-sm">
                <FiltersSidebar filters={filters} setFilters={setFilters} />
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
                <div className="px-4 md:px-6">
                    <h1 className="hidden md:block text-2xl font-bold text-gray-800 ">Grocery Items</h1>

                    {/* Fixed Search bar */}
                    <div className="fixed top-11  md:mt-[50px] left-0 right-0 z-20 bg-gray-50 py-3 md:top-0 md:left-72 md:right-80 ">
                        <div className="px-4 mx-auto max-w-7xl md:px-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiSearch className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content area with padding to account for fixed search bar */}
                    <div className="pt-24 md:pt-22">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                                {filteredProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToSelection={handleAddToSelection}
                                        isSelected={selectedItems.some(item => item.id === product.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="mx-auto  rounded-full p-4 w-max mb-4">
                                    <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-gray-500 font-medium">No products found</p>
                                <button
                                    onClick={() => {
                                        setFilters({ price: [0, 100], category: '', dietary: [] });
                                        setSearchQuery('');
                                    }}
                                    className="mt-2 text-indigo-600 hover:underline text-sm"
                                >
                                    Reset filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Desktop cart sidebar */}
            <div className="hidden md:block w-80 bg-white border-l shadow-sm">
                <SelectedItemsPanel
                    selectedItems={selectedItems}
                    onRemove={handleRemoveFromSelection}
                    onQuantityChange={handleQuantityChange}
                />
            </div>
        </div>
    );
};

export default MultiItemSelectionPage;