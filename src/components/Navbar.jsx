import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaShoppingCart, FaHeart, FaSignInAlt,
    FaHome, FaClipboardList, FaSearch
} from 'react-icons/fa';

const Navbar = ({ setSearchQuery }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim() !== "") {
            console.log("query", query)
            setSearchQuery(query);
            navigate("/products"); // Redirect to the product listing page
        }
    };

    return (
        <nav className="bg-white text-black fixed w-full z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-extrabold tracking-wide ml-[-11px]"
                    style={{ color: "#ab1a1f", textShadow: '0px 0px 1px rgba(0,0,0,0.1)' }}
                >
                    DailyMart
                </Link>

                {/* Search Box (Visible in Desktop) */}
                <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 px-11 py-2 rounded-full">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="bg-transparent outline-none text-black w-84"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="text-gray-600 hover:text-black transition">
                        <FaSearch size={23} />
                    </button>
                </form>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-12 items-center">
                    {["Home", "products", "Wishlist", "Cart", "Login"].map((item, index) => (
                        <Link
                            key={index}
                            to={`/${item.toLowerCase() === 'home' ? "" : item.toLowerCase() }`}
                            className="hover:text-sunset-orange transition-all duration-300 transform hover:scale-105"
                            style={{ color: "#000", fontWeight: "500" }}
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex space-x-1  items-center mr-[-5px] h-50">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-gray-200 text-black px-2 py-1 rounded-full w-60"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit" className="absolute right-3 top-2 text-gray-600 hover:text-black">
                            <FaSearch size={16} />
                        </button>
                    </form>
{/* 
                    {[].map((Icon, index) => (
                        <Link key={index} to="/">
                            <Icon
                                size={24}
                                className="text-black transition-transform duration-300 hover:scale-110 hover:text-sunset-orange"
                            />
                        </Link>
                    ))} */}
                </div>
            </div>

            {/* Bottom Mobile Navbar */}
            <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-2 shadow-md">
                {[
                    { icon: FaHome, label: "Home", path: "/" },
                    { icon: FaClipboardList, label: "products", path: "/products" },
                    { icon: FaShoppingCart, label: "Cart", path: "/cart" },
                    { icon: FaHeart, label: "Wishlist", path: "/wishlist" },
                    { icon: FaSignInAlt, label: "Login", path: "/login" }
                ].map(({ icon: Icon, label, path }, index) => (
                    <Link
                        key={index}
                        to={path}
                        className="text-black flex flex-col items-center hover:text-sunset-orange transition-transform duration-300"
                    >
                        <Icon size={20} />
                        <span className="text-xs font-semibold">{label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
