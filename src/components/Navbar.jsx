import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaShoppingCart, FaHeart, FaSignInAlt, FaUserCog,
    FaHome, FaClipboardList, FaSearch, FaStore
} from "react-icons/fa";

const Navbar = ({ setSearchQuery, isLoggedIn }) => {
    const [query, setQuery] = useState("");
    const [showHint, setShowHint] = useState(false);
    const navigate = useNavigate();
    isLoggedIn=true
    // Blinking animation effect for the Login button
    useEffect(() => {
        if (!isLoggedIn) {
            const hintInterval = setInterval(() => {
                // Show hint for 3 seconds, then hide for 10 seconds
                setShowHint(true);
                const hideTimer = setTimeout(() => {
                    setShowHint(false);
                }, 3000);

                return () => clearTimeout(hideTimer);
            }, 13000); // Repeat every 13 seconds (3 shown + 10 hidden)

            return () => clearInterval(hintInterval);
        }
    }, [isLoggedIn]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() !== "") {
            setSearchQuery(query);
            navigate("/products"); // Redirect to the product listing page
        }
    };

    return (
        <nav className="bg-white text-black fixed w-full z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center py-2 px-6">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-extrabold tracking-wide ml-[-11px]"
                    style={{ color: "#ab1a1f", textShadow: '0px 0px 1px rgba(0,0,0,0.1)' }}
                >
                    DailyMart
                </Link>

                {/* Search Box (Desktop) */}
                <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="bg-transparent outline-none text-black w-80 px-3"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="text-gray-600 hover:text-black transition">
                        <FaSearch size={20} />
                    </button>
                </form>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-10 items-center">
                    {["Home", "Products", "Wishlist", "Cart","seller"].map((item, index) => (
                        <Link
                            key={index}
                            to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                            className="hover:text-sunset-orange transition-all duration-300 transform hover:scale-105"
                            style={{ color: "#000", fontWeight: "500" }}
                        >
                            {item}
                        </Link>
                    ))}

                    {/* Show Settings if logged in, otherwise show Login */}
                    {isLoggedIn ? (
                        <Link
                            to="/settings"
                            className="hover:text-electric-purple transition-all duration-300 transform hover:scale-105"
                            style={{ color: "#000", fontWeight: "500" }}
                        >
                            <FaUserCog size={20} className="inline-block mr-2" />
                            Settings
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className={`relative hover:text-sunset-orange transition-all duration-300 transform hover:scale-105 ${showHint ? "animate-pulse" : ""}`}
                            style={{ color: "red", fontWeight: "500" }}
                        >
                            <FaSignInAlt size={20} className="inline-block mr-2 "  />
                            Login
                            { (
                                <span className="absolute -right-12 text-sm bg-white text-black px-2 py-1 rounded-md shadow-md  mt-[30px] ">
                                        {/* Click to login → */}
                                </span>
                            )}
                        </Link>
                    )}
                </div>

                {/* Mobile Search Box */}
                <div className="md:hidden flex items-center">
                    <form onSubmit={handleSearch} className="relative w-52">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-gray-200 text-black px-3 py-1 rounded-full w-full"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit" className="absolute right-3 top-2 text-gray-600 hover:text-black">
                            <FaSearch size={16} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Mobile Navbar */}
            <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-2 shadow-md">
                {[
                    { icon: FaHome, label: "Home", path: "/" },
                    { icon: FaClipboardList, label: "Products", path: "/products" },
                    { icon: FaShoppingCart, label: "Cart", path: "/cart" },
                    { icon: FaHeart, label: "Wishlist", path: "/wishlist" },
                    { icon: FaStore, label: "Seller", path: "/seller" }

                ].map(({ icon: Icon, label, path }, index) => (
                    <Link
                        key={index}
                        to={path}
                        className="text-black flex flex-col items-center hover:text-sunset-orange transition-transform duration-30000"
                    >
                        <Icon size={20} />
                        <span className="text-xs font-semibold">{label}</span>
                    </Link>
                ))}

                {/* Show Settings if logged in, otherwise show Login */}
                {isLoggedIn ? (
                    <Link
                        to="/settings"
                        className="text-black flex flex-col items-center hover:text-electric-purple transition-transform duration-300"
                    >
                        <FaUserCog size={20} />
                        <span className="text-xs font-semibold">Settings</span>
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        className={`relative text-red-500 flex flex-col items-center hover:text-sunset-orange transition-transform duration-300 ${showHint ? "animate-pulse" : ""}`}
                    >
                        <FaSignInAlt size={20} />
                        <span className="text-xs font-semibold">Login</span>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
