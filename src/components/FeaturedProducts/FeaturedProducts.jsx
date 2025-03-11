import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const FeaturedProducts = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const products = [
        { name: 'Organic Apples', price: '₹150', image: '/images/apples.jpg', rating: 4 },
        { name: 'Men’s Jacket', price: '₹999', image: '/images/jacket.jpg', rating: 5 },
        { name: 'Wireless Earbuds', price: '₹1,299', image: '/images/earbuds.jpg', rating: 4.5 }
    ];

    const handleQuickView = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                >
                    {/* Product Image with Floating Price */}
                    <div className="relative">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-40 w-full object-cover rounded-t-lg transform hover:scale-110 transition-all duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-sunset-orange text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
                            {product.price}
                        </div>
                    </div>

                    {/* Product Details */}
                    <h3 className="text-lg font-bold mt-2 text-graphite-gray">{product.name}</h3>

                    {/* Rating Stars */}
                    <div className="flex mt-1">
                        {[...Array(5)].map((star, i) => (
                            <FaStar
                                key={i}
                                color={i < Math.floor(product.rating) ? "#FFD700" : "#E0E0E0"}
                                className="text-sm"
                            />
                        ))}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        className="bg-sunset-orange text-white mt-3 px-4 py-2 rounded-md hover:bg-orange-500 transition-all duration-300"
                    >
                        Add to Cart
                    </button>

                    {/* Quick View Button */}
                    <button
                        className="absolute bottom-3 right-3 bg-midnight-blue text-white px-4 py-2 text-sm rounded-md shadow-lg
                        hover:bg-blue-700 transition-all duration-300"
                        onClick={() => handleQuickView(product)}
                    >
                        Quick View
                    </button>
                </div>
            ))}

            {/* Quick View Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[400px] shadow-2xl">
                        <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            className="w-full h-40 object-cover rounded-lg mb-2"
                        />
                        <p className="text-graphite-gray mb-4">Price: {selectedProduct.price}</p>
                        <button
                            className="bg-sunset-orange text-white px-4 py-2 rounded-md"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeaturedProducts;
