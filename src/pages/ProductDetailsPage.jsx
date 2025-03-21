import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    FaShippingFast,
    FaClipboardList
} from "react-icons/fa";
import LoaderWithMessage from "../components/Loader/LoaderWithMessage.jsx"; // Adjust the path based on your folder structure


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

    const currentDate = new Date();
    const expectedDeliveryDate = new Date();
    expectedDeliveryDate.setDate(currentDate.getDate() + 3);

    if (loading) return <LoaderWithMessage />;

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

                    <div className="hidden md:flex gap-4 mt-6 ml-[150px]">
                        <button className="w-[180px] bg-orange-500 text-white px-4 py-2 rounded-lg">
                            Add to Cart
                        </button>
                        <button className="w-[180px] bg-[#6A0DAD] text-white px-4 py-2 rounded-lg">
                            Buy Now
                        </button>
                    </div>
                    {/* Buy Now, Add to Cart, and Price - Fixed for Mobile */}
                    <div className="md:hidden fixed bottom-0 w-full bg-white shadow-lg p-4 flex items-center justify-between border-t mb-[40px]">
                        <div className="text-lg font-semibold text-gray-800">
                            ₹ {product.price}
                        </div>
                        <div className="flex gap-2">
                            <button className="w-[120px] bg-orange-500 text-white px-2 py-2 rounded-lg">
                                Add to Cart
                            </button>
                            <button className="w-[120px] bg-[#6A0DAD] text-white px-2 py-2 rounded-lg">
                                Buy Now
                            </button>
                        </div>
                    </div>
                    {/* Estimated Delivery & Delivery Details - Combined */}
                    <div className="hidden md:block mt-5 flex flex-col gap-3 bg-blue-50 p-4 rounded-lg border border-blue-200 w-[600px]">
                        <div className="flex items-center gap-3">
                            <FaShippingFast className="text-xl text-blue-600" />
                            <h2 className="text-lg font-semibold text-blue-800">Estimated Delivery</h2>
                        </div>
                        <p className="text-gray-700">
                            <span className="font-semibold">Delivery Date:</span> {expectedDeliveryDate.toDateString()} <br />
                            <span className="font-semibold">Delivery Address:</span> {"India"}
                        </p>
                    </div>


                </div>

                {/* Right - Product Info */}
                <div className="flex-1 mt-[10px]">
                    <ProductInfo
                        name="Sony WH-1000XM5 Wireless Noise Cancelling Headphones"
                        description="Industry-leading noise cancellation, 30-hour battery life, and Hi-Res audio support."
                        price={29999}
                        brand="Sony"
                        warranty={24}  // 24 months warranty
                        availability="in-stock"
                        deliveryDays={3}
                        address="Mumbai, Maharashtra, India"
                        specifications={{
                            "Color": "Matte Black",
                            "Battery Life": "Up to 30 hours",
                            "Charging Time": "3 hours (Full charge)",
                            "Driver Unit": "40mm",
                            "Frequency Response": "4 Hz - 40,000 Hz",
                            "Bluetooth Version": "5.2",
                            "Noise Cancellation": "Active Noise Cancellation (ANC)",
                            "Microphone": "Built-in with AI Noise Reduction",
                            "Connectivity": "Bluetooth, 3.5mm Jack, USB-C",
                            "Weight": "250 grams",
                            "Foldable": "Yes",
                            "Touch Controls": "Yes",
                            "Voice Assistant": "Google Assistant & Alexa",
                            "Water Resistance": "IPX4 (Splash Resistant)",
                            "Compatible Devices": "Android, iOS, Windows, Mac",
                            "Box Contents": "Headphones, Carry Case, USB-C Cable, Audio Cable, User Manual"
                        }}
                        discount={10}
                        offerEndTime="March 25, 2025 23:59:59" // Pass valid date & time
                        sellerInfo="Nirmal, dailyMart Pvt Ltd , Coimbatore"
                    />


                    {/* Delivery Details - Mobile (Below Specifications) */}
                    <div className="block md:hidden mt-5 flex flex-col gap-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-3">
                            <FaShippingFast className="text-xl text-blue-600" />
                            <h2 className="text-lg font-semibold text-blue-800">Estimated Delivery</h2>
                        </div>
                        <p className="text-gray-700">
                            <span className="font-semibold">Delivery Date:</span> {expectedDeliveryDate.toDateString()} <br />
                            <span className="font-semibold">Delivery Address:</span> {"India"}
                        </p>
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


