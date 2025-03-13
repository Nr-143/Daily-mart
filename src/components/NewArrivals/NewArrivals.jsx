import React, { useEffect, useState } from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NewArrivals = () => {
    const [products, setProducts] = useState([]);

    const newArrivals = [
        {
            id: 1,
            name: "Organic Fresh Apples",
            description: "Crisp and juicy organic apples from local farms.",
            price: "$4.99",
            image: "https://via.placeholder.com/150",
            rating: 4.5,
            reviews: 120
        },
        {
            id: 2,
            name: "Men's Casual Sneakers",
            description: "Stylish and comfortable sneakers for everyday wear.",
            price: "$39.99",
            image: "https://via.placeholder.com/150",
            rating: 4.7,
            reviews: 95
        },
        {
            id: 3,
            name: "Wireless Bluetooth Headphones",
            description: "High-quality sound with noise cancellation.",
            price: "$89.99",
            image: "https://via.placeholder.com/150",
            rating: 4.3,
            reviews: 210
        },
        {
            id: 4,
            name: "Stainless Steel Water Bottle",
            description: "Keeps your drinks hot or cold for hours.",
            price: "$14.99",
            image: "https://via.placeholder.com/150",
            rating: 4.6,
            reviews: 65
        },
        {
            id: 5,
            name: "Cotton Printed T-Shirt",
            description: "Soft, breathable, and stylish t-shirt.",
            price: "$19.99",
            image: "https://via.placeholder.com/150",
            rating: 4.8,
            reviews: 150
        }
    ];

    useEffect(() => {
        setProducts(newArrivals);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true, // Stops autoplay when hovered
        arrows: true, // Enables left & right navigation
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-midnight-blue mb-4">New Arrivals</h2>
            <Slider {...settings}>
                {products.map((product) => (
                    <div key={product.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between h-[280px]">
                        <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg" />
                        <h3 className="text-lg font-semibold text-midnight-blue mt-2 truncate">
                            {product.name.length > 25 ? product.name.substring(0, 22) + "..." : product.name}
                        </h3>
                        <p className="text-gray-600 text-sm truncate">
                            {product.description.length > 40 ? product.description.substring(0, 37) + "..." : product.description}
                        </p>
                        <p className="text-electric-purple font-bold">{product.price}</p>
                        <div className="flex items-center text-yellow-500">
                            <FaStar />
                            <span className="ml-1 text-gray-700 text-sm">{product.rating} ({product.reviews} reviews)</span>
                        </div>
                        <button className="mt-2 bg-sunset-orange text-white py-2 px-4 rounded-lg w-full flex items-center justify-center hover:bg-opacity-80">
                            <FaShoppingCart className="mr-2" /> Add to Cart
                        </button>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default NewArrivals;
