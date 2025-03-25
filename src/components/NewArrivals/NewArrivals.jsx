import React from 'react';
import { FaStar, FaShoppingCart, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

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

const NextArrow = ({ onClick }) => (
    <div
        className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 z-10"
        onClick={onClick}
        aria-label="Next"
    >
        <FaArrowRight className="text-gray-600" />
    </div>
);

const PrevArrow = ({ onClick }) => (
    <div
        className="absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 z-10"
        onClick={onClick}
        aria-label="Previous"
    >
        <FaArrowLeft className="text-gray-600" />
    </div>
);

const NewArrivals = () => {
    const navigate = useNavigate();

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    const handleAddToCart = (e, product) => {
        e.stopPropagation(); // Prevent triggering the product click
        // Add to cart logic here
        console.log('Added to cart:', product);
    };

    const settings = {
        dots: true,
        infinite: true, // Changed to true for better UX
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    arrows: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    arrows: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    arrows: true
                }
            }
        ]
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-midnight-blue mb-6">New Arrivals</h2>
            <div className="relative">
                <Slider {...settings}>
                    {newArrivals.map((product) => (
                        <div key={product.id} className="px-2 outline-none">
                            <div
                                className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between h-full mx-auto cursor-pointer hover:shadow-xl transition-shadow duration-300"
                                onClick={() => handleProductClick(product.id)}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => e.key === 'Enter' && handleProductClick(product.id)}
                            >
                                <div>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-40 object-contain rounded-lg mb-3"
                                        loading="lazy"
                                    />
                                    <h3 className="text-lg font-semibold text-midnight-blue mb-1 line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                        {product.description}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-electric-purple font-bold mb-2">{product.price}</p>
                                    <div className="flex items-center text-yellow-500 mb-3">
                                        <FaStar />
                                        <span className="ml-1 text-gray-700 text-sm">
                                            {product.rating} ({product.reviews} reviews)
                                        </span>
                                    </div>
                                    <button
                                        className="mt-auto bg-sunset-orange text-white py-2 px-4 rounded-lg w-full flex items-center justify-center hover:bg-opacity-80 transition-colors duration-300"
                                        onClick={(e) => handleAddToCart(e, product)}
                                    >
                                        <FaShoppingCart className="mr-2" /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default NewArrivals;