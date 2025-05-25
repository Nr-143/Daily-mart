import React, { useState } from "react";

const ProductImage = ({ images, name }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]); // Default to first image

    return (
        <div className="flex flex-col md:flex-row items-center md:items-start gap- relative">

            {/* Desktop: Thumbnails on the Left */}
            <div className="hidden md:flex md:flex-col space-y-3
                            md:max-h-[500px] overflow-y-auto scrollbar-hide " >
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`${name} ${index + 1}`}
                        className={`w-14 h-14 md:w-16 md:h-16 object-cover cursor-pointer border-2 
                                    transition-all duration-200 rounded-md shadow-sm
                                    ${selectedImage === img ? "border-[#6A0DAD] scale-105" : "border-gray-300 hover:border-[#FF6B35]"}`}
                        onClick={() => setSelectedImage(img)} // Change main image on click
                    />
                ))}
            </div>

            {/* Main Product Image */}
            <div className="flex flex-col items-center md:flex-1 h-[400px]">
                <img
                    src={selectedImage}
                    alt={name}
                    className="w-[96vw] h-[45vh] sm:h-[68vh] md:h-[60vh] md:w-[80vh]  
                               object-cover rounded-lg shadow-md transition-opacity duration-300"
                />

                {/* Mobile: Thumbnails Below - Only Shown in Mobile View */}
                <div className="flex md:hidden mt-2 space-x-2 overflow-x-auto scrollbar-hide">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`${name} ${index + 1}`}
                            className={`w-12 h-16 object-cover cursor-pointer border-2 rounded-md 
                                        ${selectedImage === img ? "border-[#6A0DAD] scale-105" : "border-gray-300 hover:border-[#FF6B35]"}`}
                            onClick={() => setSelectedImage(img)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductImage;
