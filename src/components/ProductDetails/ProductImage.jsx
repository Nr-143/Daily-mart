import React, { useState } from "react";

const ProductImage = ({ images, name, price }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]); // Default to first image

    return (
        <span className="flex flex-col md:flex-row items-center md:items-start gap-4 relative">
            {/* Thumbnails - Below on Mobile, Left on Desktop */}
            <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 
                        mt-2 md:mt-0 max-w-[90vw] md:max-w-none md:max-h-[370px] 
                        overflow-x-auto md:overflow-y-auto scrollbar-hide">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`${name} ${index + 1}`}
                        className={`w-16 h-16 md:w-20 md:h-20 object-cover cursor-pointer border-2 
                            ${selectedImage === img ? "border-blue-500" : "border-gray-300"} rounded-md`}
                        onClick={() => setSelectedImage(img)} // Update main image on click
                    />
                ))}
            </div>

            {/* Big Main Image */}
            <div className="flex-1">
                <img
                    src={selectedImage}
                    alt={name}
                    className="w-[97vw] h-[40vh] sm:h-[50vh] md:h-[60vh] max-w-md object-cover rounded-lg shadow-md"
                />
            </div>

    
        </span>
    );
};

export default ProductImage;
