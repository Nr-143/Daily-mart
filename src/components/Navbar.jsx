import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaShoppingCart, FaHeart, FaSignInAlt,
    FaHome, FaClipboardList
} from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="bg-white text-black fixed w-full z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-3xl font-extrabold tracking-wide"
                    style={{ color: "#000", textShadow: '0px 0px 1px rgba(0,0,0,0.1)' }}
                >
                    DailyMart
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 items-center">
                    {["Home", "Orders", "Wishlist", "Cart", "Login"].map((item, index) => (
                        <Link
                            key={index}
                            to={`/${item.toLowerCase()}`}
                            className="hover:text-sunset-orange transition-all duration-300 transform hover:scale-105"
                            style={{ color: "#000", fontWeight: "500" }}
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex space-x-4 items-center">
                    {[FaShoppingCart, FaHeart, FaSignInAlt].map((Icon, index) => (
                        <Link key={index} to="/">
                            <Icon
                                size={24}
                                className="text-black transition-transform duration-300 hover:scale-110 hover:text-sunset-orange"
                            />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bottom Mobile Navbar */}
            <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-2 shadow-md">
                {[
                    { icon: FaHome, label: "Home", path: "/" },
                    { icon: FaClipboardList, label: "Orders", path: "/orders" },
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
