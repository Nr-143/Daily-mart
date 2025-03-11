import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaShoppingCart, FaGift, FaTag } from 'react-icons/fa';
import shoppingDiscuss from '../../assets/shoppingDiscuss.png';
import exchange from '../../assets/exchange.png';
import personWithProduct from '../../assets/personWithProduct.png';
import personwithProduct2 from '../../assets/personwithProduct2.png';

const HeroBanner = () => {
    const slides = [
        {
            title: 'Seamless Online Shopping Experience',
            subtitle: 'Shop everything you need at DailyMart!',
            buttonText: 'Start Shopping',
            image: shoppingDiscuss,
            textColor: 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500',
            buttonColor: 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600',
            glowColor: 'shadow-[0_0_30px_rgba(255,102,178,0.6)]',
        },
        {
            title: 'Easy Product Exchange',
            subtitle: 'Hassle-free returns and quick refunds!',
            buttonText: 'Exchange Now',
            image: exchange,
            textColor: 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500',
            buttonColor: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600',
            glowColor: 'shadow-[0_0_30px_rgba(255,215,0,0.6)]',
        },
        {
            title: 'Doorstep Delivery',
            subtitle: 'Receive your products in just a few days!',
            buttonText: 'Track Order',
            image: personWithProduct,
            textColor: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500',
            buttonColor: 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600',
            glowColor: 'shadow-[0_0_30px_rgba(51,153,255,0.6)]',
        },
        {
            title: 'Wide Range of Products',
            subtitle: 'From electronics to groceries, we have it all!',
            buttonText: 'Explore Products',
            image: personwithProduct2,
            textColor: 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500',
            buttonColor: 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600',
            glowColor: 'shadow-[0_0_30px_rgba(76,175,80,0.6)]',
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        cssEase: 'linear',
        arrows: false, // Remove default arrows for a cleaner look
    };

    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-[#fdf6fd] to-[#f9f9f9] min-h-[500px]">

            {/* Floating Icons with Modern Animations */}
            <div className="absolute top-10 left-10 text-3xl animate-float">
                <FaShoppingCart className="text-[#FF0080] hover:text-[#e60073] transition-colors" />
            </div>
            <div className="absolute top-10 left-10 text-3xl animate-float">
                <FaShoppingCart className="text-[#FF0080] hover:text-[#e60073] transition-colors" />
            </div>
            <div className="absolute top-10 left-10 text-3xl animate-float">
                <FaShoppingCart className="text-[#FF0080] hover:text-[#e60073] transition-colors" />
            </div>
            <div className="absolute bottom-10 right-10 text-3xl animate-float">
                <FaGift className="text-[#FFD700] hover:text-[#e6b800] transition-colors" />
            </div>
            <div className="absolute bottom-20 left-20 text-3xl animate-float">
                <FaTag className="text-[#007AFF] hover:text-[#0056D2] transition-colors" />
            </div>

            {/* Slider */}
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative text-center h-[500px] overflow-hidden">

                        {/* Product Image with 3D Tilt Effect */}
                        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={2.05} glareEnable={true} glareMaxOpacity={0.1}>
                            <motion.img
                                src={slide.image}
                                alt={slide.title}
                                className="w-[600px] h-[700px] object-cover rounded-lg mx-auto"
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.5 }}
                            />
                        </Tilt>

                        {/* Text Overlay with Glass Morphism Effect */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm">
                            <motion.h1
                                className={`${slide.textColor} text-5xl font-bold mb-4 drop-shadow-2xl`}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                {slide.title}
                            </motion.h1>

                            <motion.p
                                className="text-lg text-white mb-6"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 1 }}
                            >
                                {slide.subtitle}
                            </motion.p>

                            {/* Button with Glowing Effect */}
                            <motion.button
                                className={`${slide.buttonColor} text-white px-8 py-3 rounded-lg ${slide.glowColor} transition-all transform hover:scale-105`}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.5, type: 'spring', stiffness: 120 }}
                                onClick={() => new Audio('/click.mp3').play()}
                            >
                                {slide.buttonText}
                            </motion.button>
                        </div>
                    </div>
                ))}
            </Slider>

            {/* Smooth Divider */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#f9f9f9] to-transparent"></div>
        </div>
    );
};

export default HeroBanner;