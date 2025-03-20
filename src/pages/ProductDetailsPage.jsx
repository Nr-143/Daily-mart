import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    FaShippingFast,
    FaClipboardList
} from "react-icons/fa";

import ProductImage from "../components/ProductDetails/ProductImage";
import ProductInfo from "../components/ProductDetails/ProductInfo";
import ProductCard from "../components/ProductCards/ProductCards";
import ReviewCard from "../components/ProductDetails/ReviewCard";

import defaultImage1 from "../assets/toys1.jpg";
import defaultImage2 from "../assets/Appliances.jpg";
import defaultImage3 from "../assets/Books.jpg";
import defaultImage4 from "../assets/Shoes3.jpg";
import userAvatar from "../assets/toys1.jpg"; // Default user avatar

const exampleProducts = [
    {
        id: "1",
        name: "Apple iPhone 14",
        category: "electronics",
        price: 999,
        rating: 5,
        brand: "Apple",
        availability: "in-stock",
        discount: 10,
        reviews: 120,
        images: [defaultImage1, defaultImage2, defaultImage3, defaultImage4], // Array of images
        description: "A stunning 6.7-inch display with A16 Bionic chip.",
        comments: [
            {
                user: "John Doe",
                avatar: userAvatar,
                rating: 5,
                date: "2024-03-15",
                text: "Amazing phone!",
                images: [defaultImage1, defaultImage2],
            },
            {
                user: "Alice",
                avatar: userAvatar,
                rating: 4,
                date: "2024-03-10",
                text: "Great but expensive.",
                images: [],
            },
        ],
    },
    {
        id: "2",
        name: "Samsung Galaxy S23",
        category: "electronics",
        price: 799,
        rating: 4,
        brand: "Samsung",
        availability: "in-stock",
        discount: 20,
        reviews: 95,
        images: [defaultImage1, defaultImage2, defaultImage3, defaultImage4], // Array of images
        description: "Powerful performance with Snapdragon processor.",
        comments: [
            {
                user: "Mike",
                avatar: userAvatar,
                rating: 4,
                date: "2024-03-08",
                text: "Good phone with great battery life.",
                images: [defaultImage1],
            },
        ],
    },
    {
        id: "3",
        name: "Organic Bananas",
        category: "groceries",
        price: 2,
        rating: 5,
        brand: "",
        availability: "in-stock",
        discount: 5,
        reviews: 45,
        images: [defaultImage1, defaultImage2, defaultImage3, defaultImage4], // Array of images
        description: "Fresh and organic bananas for daily nutrition.",
        comments: [
            {
                user: "Sarah",
                avatar: userAvatar,
                rating: 5,
                date: "2024-02-20",
                text: "Very fresh and tasty!",
                images: [],
            },
        ],
    },
];

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API Delay
                const foundProduct = exampleProducts.find((item) => item.id === id);
                if (!foundProduct) throw new Error("Product not found");
                setProduct(foundProduct);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (loading) return <p className="text-gray-500">Loading product details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const relatedProducts = exampleProducts.filter(
        (item) => item.category === product.category && item.id !== product.id
    );

    // Estimated delivery (just a placeholder)
    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5);

    return (
        <div className="container mx-auto px-2 py-6 relative">
            {/* Product Details Layout */}
            <div className="flex flex-col md:flex-row mt-[60px]">
                {/* Left - Product Images */}
                <div className="w-full md:w-1/2">
                    <ProductImage images={product.images} name={product.name} />

                    {/* Buy Now & Add to Cart - Below Image */}
                    <div className="mt-4 ml-[130px] gap-2 flex flex-row items-center ">
                        <button className="w-[150px] bg-electric-purple text-white px-2 py-2 rounded-lg">
                            Buy Now
                        </button>
                        <button className="w-[150px] bg-gray-700 text-white px-2 py-2 rounded-lg">
                            Add to Cart
                        </button>
                    </div>

                    {/* Delivery Details - Below Buttons */}
                    <div className="mt-4 p-4 border rounded-lg bg-gray-50 w-[600px]">
                        <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                            <FaShippingFast className="text-xl text-blue-600" />
                            Delivery Details
                        </h2>
                        <p className="text-gray-600 mt-1">
                            <span className="font-semibold">Estimated Delivery:</span> {estimatedDeliveryDate.toDateString()}
                        </p>
                    </div>
                </div>

                {/* Right - Product Info */}
                <div className="flex-1">
                    <ProductInfo
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        brand={product.brand}
                        availability={product.availability}
                    />

                    {/* Specifications Section */}
                    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                        <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                            <FaClipboardList className="text-xl text-blue-600" />
                            Product Specifications
                        </h2>
                        <ul className="mt-2 text-gray-700">
                            {product.specifications
                                ? Object.entries(product.specifications).map(([key, value]) => (
                                    <li key={key} className="mt-1">
                                        <span className="font-semibold capitalize">{key}:</span> {value}
                                    </li>
                                ))
                                : "No specifications available."}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-6 p-4 border-t">
                <h2 className="text-xl font-semibold">Customer Reviews</h2>
                <p className="text-gray-600">
                    Overall Rating: ⭐ {product.rating} / 5 ({product.reviews} reviews)
                </p>

                <div className="mt-4 space-y-4">
                    {product.comments.map((comment, index) => (
                        <ReviewCard key={index} comment={comment} />
                    ))}
                </div>
            </div>

            {/* Related Products Section */}
            <div className="mt-6 p-4 border-t">
                <h2 className="text-xl font-semibold">Related Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {relatedProducts.map((related) => (
                        <ProductCard key={related.id} product={related} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;


