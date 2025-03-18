import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import shoppingDiscuss from "../../assets/shoppingDiscuss.png";
import exchange from "../../assets/exchange.png";
import personWithProduct from "../../assets/personwithProduct2.png";

const HeroBanner = () => {
    const slides = [
        {
            title: "Seamless Online Shopping Experience",
            subtitle: "Shop everything you need at DailyMart!",
            buttonText: "Start Shopping",
            image: shoppingDiscuss,
            overlayColor: "bg-[#6A0DAD]/80",
            buttonColor: "bg-[#6A0DAD] hover:bg-[#5C0DA1]",
        },
        {
            title: "Easy Product Exchange",
            subtitle: "Hassle-free returns and quick refunds!",
            buttonText: "Exchange Now",
            image: exchange,
            overlayColor: "bg-[#FF6B35]/80",
            buttonColor: "bg-[#FF6B35] hover:bg-[#E65B28]",
        },
        {
            title: "Doorstep Delivery",
            subtitle: "Receive your products in just a few days!",
            buttonText: "Track Order",
            image: personWithProduct,
            overlayColor: "bg-[#3A3A3A]/80",
            buttonColor: "bg-[#3A3A3A] hover:bg-[#292929]",
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: false,
        arrows: false,
    };

    return (
        <div className="relative bg-white min-h-[400px] overflow-hidden">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative h-[450px] w-full flex justify-center items-center">
                        {/* Image with Overlay */}
                        <motion.img
                            src={slide.image}
                            alt={slide.title}
                            className="w-[900px] h-[350px] rounded-lg object-cover shadow-lg"
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            loading="lazy"
                            whileHover={{
                                rotateX: 5,
                                rotateY: 5,
                                scale: 1.02,
                                transition: { duration: 0.5 },
                            }}
                        />

                        {/* Overlay for Text Readability */}
                        <div className={`absolute inset-0 flex flex-col items-center justify-center text-center p-6 ${slide.overlayColor}`}>
                            <motion.h1
                                className="text-white text-3xl md:text-5xl font-bold mb-4"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                {slide.title}
                            </motion.h1>

                            <motion.p
                                className="text-lg text-white mb-6 max-w-lg"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 1 }}
                            >
                                {slide.subtitle}
                            </motion.p>

                            {/* Button */}
                            <motion.button
                                className={`${slide.buttonColor} text-white px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-110`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.1, rotate: 2 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{
                                    delay: 0.5,
                                    duration: 0.5,
                                    type: "spring",
                                    stiffness: 120,
                                }}
                            >
                                {slide.buttonText}
                            </motion.button>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeroBanner;
