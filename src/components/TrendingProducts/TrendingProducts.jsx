import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { FaShoppingCart, FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TrendingProducts = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Organic Apples', price: '$5.99', image: '/images/apple.jpg', rating: 4.5, reviews: 120 },
        { id: 2, name: 'Fresh Bananas', price: '$2.49', image: '/images/banana.jpg', rating: 4.7, reviews: 80 },
        { id: 3, name: 'Almond Milk', price: '$3.99', image: '/images/milk.jpg', rating: 4.6, reviews: 95 },
        { id: 4, name: 'Whole Wheat Bread', price: '$2.99', image: '/images/bread.jpg', rating: 4.3, reviews: 60 },
        { id: 5, name: 'Olive Oil', price: '$7.99', image: '/images/oil.jpg', rating: 4.8, reviews: 140 },
        { id: 6, name: 'Brown Rice', price: '$4.49', image: '/images/rice.jpg', rating: 4.4, reviews: 75 },
        { id: 7, name: 'Peanut Butter', price: '$6.99', image: '/images/peanut_butter.jpg', rating: 4.9, reviews: 200 },
        { id: 8, name: 'Greek Yogurt', price: '$1.99', image: '/images/yogurt.jpg', rating: 4.2, reviews: 50 }
    ]);

    // Custom arrows
    const NextArrow = ({ onClick }) => (
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer bg-white p-2 rounded-full shadow-lg hover:bg-gray-100" onClick={onClick}>
            <FaArrowRight className="text-gray-600" />
        </div>
    );

    const PrevArrow = ({ onClick }) => (
        <div className="absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer bg-white p-2 rounded-full shadow-lg hover:bg-gray-100" onClick={onClick}>
            <FaArrowLeft className="text-gray-600" />
        </div>
    );

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true, // Stops autoplay when hovered
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
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
            <h2 className="text-2xl font-bold text-midnight-blue mb-4">Trending Products</h2>
            <div className="relative">
                <Slider {...settings}>
                    {products.map((product) => (
                        <div key={product.id} className="px-2"> {/* Adds spacing between slides */}
                            <div className="bg-white shadow-lg rounded-lg p-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                                <h3 className="text-lg font-semibold text-midnight-blue mt-2 truncate">
                                    {product.name}
                                </h3>
                                <p className="text-electric-purple font-bold">{product.price}</p>
                                <div className="flex items-center text-yellow-500">
                                    <FaStar />
                                    <span className="ml-1 text-gray-700">{product.rating} ({product.reviews} reviews)</span>
                                </div>
                                <button className="mt-3 bg-sunset-orange text-white py-2 px-4 rounded-lg w-full flex items-center justify-center hover:bg-opacity-80">
                                    <FaShoppingCart className="mr-2" /> Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </Slider>

            </div>
        </div>
    );
};

export default TrendingProducts;
