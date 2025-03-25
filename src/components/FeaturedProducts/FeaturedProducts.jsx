import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    const products = [
        { id: 1, name: 'Organic Apples', price: '₹150', image: '/images/apples.jpg', rating: 4 },
        { id: 2, name: 'Men’s Jacket', price: '₹999', image: '/images/jacket.jpg', rating: 5 },
        { id: 3, name: 'Wireless Earbuds', price: '₹1,299', image: '/images/earbuds.jpg', rating: 4.5 }
    ];

    const handleQuickView = (product) => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                    onClick={() => handleQuickView(product)}
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
                        {[...Array(5)].map((_, i) => (
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
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log("Add to Cart Clicked");
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
};

export default FeaturedProducts;
