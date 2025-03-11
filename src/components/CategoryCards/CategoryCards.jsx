import React from 'react';
import { Link } from 'react-router-dom';
import groceryImg from "../../assets/vegetables.png";
import clothesImg from "../../assets/dress.png";
import electronicsImg from "../../assets/electricity.png";
import footwearImg from "../../assets/shoes.png";
import beautyImg from "../../assets/cosmetics.png";
import homeImg from "../../assets/tableLamb.png";
import booksImg from "../../assets/06.jpg";
import toysImg from "../../assets/vegetables.png";

const categories = [
    { name: 'Groceries', image: groceryImg, path: '/groceries' },
    { name: 'Clothes', image: clothesImg, path: '/clothes' },
    { name: 'Electronics', image: electronicsImg, path: '/electronics' },
    { name: 'Footwear', image: footwearImg, path: '/footwear' },
    { name: 'Beauty', image: beautyImg, path: '/beauty' },
    { name: 'Home Appliances', image: homeImg, path: '/home-appliances' },
    { name: 'Books', image: booksImg, path: '/books' },
    { name: 'Toys', image: toysImg, path: '/toys' },
];

const CategoryCards = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
            {categories.map((category, index) => (
                <Link
                    key={index}
                    to={category.path}
                    className="relative bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                    {/* Image with Hover Zoom */}
                    <img
                        src={category.image}
                        alt={category.name}
                        className="rounded-t-lg h-40 w-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Category Name */}
                    <h3 className="text-lg font-bold text-center mt-2 text-graphite-gray group-hover:text-[#e41b70] group-hover:shadow-lg transition-all duration-300">
                        {category.name}
                    </h3>

                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-gradient-to-r from-[#e41b70] to-[#ff6b35] transition-all duration-300"></div>
                </Link>
            ))}
        </div>
    );
};

export default CategoryCards;
