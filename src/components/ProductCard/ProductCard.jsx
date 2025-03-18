import React from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between h-[320px] w-full">
            {/* Product Image */}
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg"
                loading="lazy"
            />

            {/* Product Name */}
            <h3 className="text-lg font-semibold text-midnight-blue mt-2 truncate">
                {product.name.length > 25 ? product.name.substring(0, 22) + "..." : product.name}
            </h3>

            {/* Price */}
            <p className="text-electric-purple font-bold">${product.price}</p>

            {/* Rating & Reviews */}
            <div className="flex items-center text-yellow-500">
                <FaStar />
                <span className="ml-1 text-gray-700 text-sm">
                    {product.rating} ({product.reviews} reviews)
                </span>
            </div>

            {/* Add to Cart Button */}
            <button className="mt-2 bg-sunset-orange text-white py-2 px-4 rounded-lg w-full flex items-center justify-center hover:bg-opacity-80">
                <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
