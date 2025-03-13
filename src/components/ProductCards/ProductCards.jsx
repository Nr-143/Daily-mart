import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl transition duration-300">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-midnight-blue">{product.name}</h3>
            <p className="text-electric-purple font-bold text-lg">{product.price}</p>
            <button className="mt-3 bg-sunset-orange text-white py-2 px-4 rounded-lg w-full hover:bg-opacity-80">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;