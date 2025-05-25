    import React from "react";
    import { useRef } from "react";
import {
    FaRedoAlt, FaShippingFast, FaShieldAlt, FaMoneyBillWave, FaAward, FaCreditCard,
    FaChevronLeft, FaChevronRight, FaTag, FaCheckCircle, FaTimesCircle, FaClipboardList
} from "react-icons/fa";

    import shield from "../../assets/verified-shield.svg"

    const ProductInfo = ({ name, description, price, brand, warranty, availability, deliveryDays, address, specifications, discount, offerEndTime, sellerInfo, highlights }) => {
        // Calculate expected delivery date
        console.log("highlights", highlights)
        const currentDate = new Date();
        const expectedDeliveryDate = new Date();
        expectedDeliveryDate.setDate(currentDate.getDate() + deliveryDays);

        const ICONS = {
            FaRedoAlt: <FaRedoAlt className="text-blue-600 text-xl" />,
            FaShippingFast: <FaShippingFast className="text-green-600 text-xl" />,
            FaShieldAlt: <FaShieldAlt className="text-yellow-600 text-xl" />,
            FaMoneyBillWave: <FaMoneyBillWave className="text-green-500 text-xl" />,
            FaAward: <FaAward className="text-purple-600 text-xl" />,
            FaCreditCard: <FaCreditCard className="text-orange-600 text-xl" />
        };
        const scrollRef = useRef(null);

        const scroll = (direction) => {
            if (scrollRef.current) {
                scrollRef.current.scrollBy({
                    left: direction === "left" ? -200 : 200,
                    behavior: "smooth"
                });
            }
        };

        return (
            <div className="w-full p-6 bg-white shadow-lg rounded-xl border border-gray-200 relative mt-[-10px]">

                {/* Offer End Time (Top-Right Corner) */}
                {offerEndTime && (
                    <div className="absolute top-1 right-3 text-right bg-red-100 text-red-600 text-sm px-3 py-1 rounded-md">
                        <p className="font-semibold">Offer Ends In:</p>
                        <p className="font-bold">{offerEndTime}</p>
                    </div>
                )}

                {/* Offer Badge */}
                {discount > 0 && (
                    <span className="bg-red-500 text-white text-sm  font-semibold px-3 py-1 rounded-md">
                        {discount}% OFF
                    </span>
                )}

                {/* Product Name */}
                <h1 className="text-3xl font-bold text-midnight-blue">{name}</h1>
                <p className="text-gray-700 mt-2 text-lg">{description}</p>
                <p className="text-lg text-gray-600 mt-1">
                    <span className="font-semibold "><span className="text-[black]">Brand :</span></span> {brand || "N/A"}
                </p>

                {/* Pricing & Availability */}
                <div className="mt-4 flex items-center gap-6">
                    <p className="text-4xl font-bold text-green-500 flex items-center gap-2">
                        <FaTag className="text-xl text-pink-600" />
                        <span className="text-green-900 font-bold text-[40px]">{price}</span>
                        <span className="text-gray-600 text-sm ml-1">.INR</span>
                    </p>


                    <p className={`text-lg font-semibold flex items-center gap-2 px-3 py-1 rounded-lg 
                                    ${availability === "in-stock" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                        {availability === "in-stock" ? <FaCheckCircle /> : <FaTimesCircle />}
                        {availability === "in-stock" ? "In Stock" : "Out of Stock"}
                    </p>
                </div>


                <p className="text-gray-800 text-sm md:text-base mt-3 font-medium p-1 flex items-center">
                    <img src={shield} alt="Verified Seller" className="w-5 h-5 mr-2" />
                    <span className="text-[#6A0DAD] font-semibold">Seller Info:</span>
                    <span className="text-gray-700"> Nirmal, DailyMart Pvt Ltd, Coimbatore</span>
                </p>

                <div className="relative w-full flex items-center mt-4">
                    {/* Left Scroll Button */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 z-10 bg-white p-2 rounded-full shadow-md hidden md:flex"
                    >
                        <FaChevronLeft className="text-xl text-gray-700" />
                    </button>

                    {/* Scrollable Container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-6 py-2 w-full max-w-[600px] mx-auto"
                        style={{ scrollBehavior: "smooth" }}
                    >
                        {Array.isArray(highlights) &&
                            highlights.map((h, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center text-center p-2 bg-gray-50 rounded-lg border border-gray-200 min-w-[8rem]"
                                >
                                    {ICONS[h.icon] || <FaRedoAlt className="text-orange-600 text-xl" />}
                                    <p className="text-gray-700 text-xs font-semibold">{h.feature}</p>
                                </div>
                            ))}
                    </div>

                    {/* Right Scroll Button */}
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md hidden md:flex"
                    >
                        <FaChevronRight className="text-xl text-gray-700" />
                    </button>
                </div>

                {/* Specifications Section */}
                {specifications && (
                    <div className="mt-5 p-4 border rounded-lg bg-white shadow-sm">
                        <h2 className="text-xl font-semibold text-orange-700 flex items-center gap-2">
                            <FaClipboardList className="text-xl text-red-600" />
                            Specifications
                        </h2>

                        {/* Scrollable container for table */}
                        <div className="max-h-80 overflow-y-auto custom-scrollbar">
                            <table className="w-full mt-3 border-collapse">
                                <tbody>
                                    {Object.entries(specifications).map(([key, value]) => (
                                        <tr key={key} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                            <td className="p-3 text-gray-800 font-semibold capitalize">{key.replace(/_/g, " ")}</td>
                                            <td className="p-3 text-gray-600">{value || "N/A"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    export default ProductInfo;
