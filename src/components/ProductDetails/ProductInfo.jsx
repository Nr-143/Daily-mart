import React from "react";
import { FaShippingFast, FaBox, FaShieldAlt, FaCheckCircle, FaTimesCircle, FaClipboardList } from "react-icons/fa";

const ProductInfo = ({ name, description, price, brand, warranty, availability, deliveryDays, address, specifications }) => {
    // Calculate expected delivery date
    const currentDate = new Date();
    const expectedDeliveryDate = new Date();
    expectedDeliveryDate.setDate(currentDate.getDate() + deliveryDays);

    return (
        <div className="md:w p-4 bg-white shadow-md rounded-lg">
            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
            <p className="text-gray-700 mt-2 text-lg">{description}</p>
            <p className="text-lg text-gray-600 mt-1">
                <span className="font-semibold">Brand:</span> {brand || "N/A"}
            </p>

            {/* Pricing & Availability */}
            <div className="mt-4 flex items-center gap-4">
                <p className="text-3xl font-bold text-electric-purple">₹{price}</p>
                <p className={`text-lg font-semibold flex items-center gap-2 ${availability === "in-stock" ? "text-green-500" : "text-red-500"}`}>
                    {availability === "in-stock" ? <FaCheckCircle /> : <FaTimesCircle />}
                    {availability === "in-stock" ? "In Stock" : "Out of Stock"}
                </p>
            </div>

            {/* Warranty Details */}
            <div className="mt-4 p-4 border rounded-lg bg-gray-50 flex items-center gap-3">
                <FaShieldAlt className="text-xl text-gray-600" />
                <div>
                    <h2 className="font-semibold text-gray-800">Warranty</h2>
                    <p className="text-gray-600">{warranty ? `${warranty} months` : "No warranty provided"}</p>
                </div>
            </div>



            {/* Specifications Section */}
            {specifications && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                    <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                        <FaClipboardList className="text-xl text-purple-600" />
                        Specifications
                    </h2>
                    <table className="w-full mt-2 border-collapse">
                        <tbody>
                            {Object.entries(specifications).map(([key, value]) => (
                                <tr key={key} className="border-b">
                                    <td className="p-2 text-gray-700 font-semibold capitalize">{key.replace(/_/g, " ")}</td>
                                    <td className="p-2 text-gray-600">{value || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductInfo;
