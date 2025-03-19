import React, { useState } from "react";
import { FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";
import "./ProductCard.css"; // Import the CSS file

const ProductCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    const truncateText = (text, limit) => {
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    };
    return (
        <div className="product-card">

            <div className="wishlist-icon" onClick={toggleWishlist}>
                <FaHeart className={isWishlisted ? "heart-icon wishlisted" : "heart-icon"} />
            </div>
            {/* Product Image */}
            <div className="product-image">
                <img
                    src={product.image || "https://via.placeholder.com/150"}
                    alt={product.name}
                    loading="lazy"
                />
            </div>

            {/* Product Name */}
            <h3 className="product-name">
                {product.name.length > 40 ? product.name.substring(0, 40) + "..." : product.name}
            </h3>
            <p className="product-description">
                {truncateText(product.description, 40)}
            </p>
            {/* Price */}
            <p className="product-price">
                {product.offerPrice ? (
                    <>
                        <span className="strike-price">${product.originalPrice}</span>
                        <span className="offer-price"> ${product.offerPrice}</span>
                    </>
                ) : (
                    `$${product.price}`
                )}
            </p>
            {/* Rating & Reviews */}
            <div className="product-rating">
                <FaStar />
                <span>
                    {product.rating} ({product.reviews} reviews)
                </span>
            </div>

            {/* Add to Cart Button */}
            <button className="add-to-cart-button">
                <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;