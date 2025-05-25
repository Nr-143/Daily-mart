import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const AddressForm = ({ onAddAddress, addressToEdit, onCancelEdit, selectedCoords, reverseGeocoding }) => {
    const [formData, setFormData] = useState({
        country: "",
        state: "",
        district: "",
        city: "",
        pincode: "",
        zipcode: "",
        county: "",
        street: "",
        coordinates: null,
        reverseGeocoding: null
    });

    // Set form data if editing an address or if coordinates are selected
    useEffect(() => {
        if (addressToEdit) {
            setFormData(addressToEdit);
        } else if (selectedCoords) {
            setFormData(prev => ({
                ...prev,
                coordinates: selectedCoords,
                reverseGeocoding: reverseGeocoding,
                ...(reverseGeocoding ? {
                    country: reverseGeocoding.country || "",
                    state: reverseGeocoding.state || "",
                    city: reverseGeocoding.city || reverseGeocoding.town || reverseGeocoding.village || "",
                    street: reverseGeocoding.road || ""
                } : {})
            }));
        }
    }, [addressToEdit, selectedCoords, reverseGeocoding]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddAddress(formData);
    };

    const countryLower = formData.country.toLowerCase();

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 md:p-6 rounded-lg border">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                    {addressToEdit ? "Edit Address" : "Add New Address"}
                </h2>
                <button
                    type="button"
                    onClick={onCancelEdit}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <FiX size={20} />
                </button>
            </div>

            {formData.coordinates && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">Location Selected:</p>
                    <p className="text-xs">
                        {formData.coordinates.latitude.toFixed(6)}, {formData.coordinates.longitude.toFixed(6)}
                    </p>
                    {formData.reverseGeocoding && (
                        <p className="text-xs mt-1">
                            {formData.reverseGeocoding.road && `${formData.reverseGeocoding.road}, `}
                            {formData.reverseGeocoding.city || formData.reverseGeocoding.town || formData.reverseGeocoding.village}
                        </p>
                    )}
                </div>
            )}

            <div className="space-y-4">
                {/* Country Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Country"
                        required
                    />
                </div>

                {/* Fields based on selected country */}
                {countryLower === "india" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter State"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                            <input
                                type="text"
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter District"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter City"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter Pincode"
                                required
                            />
                        </div>
                    </>
                )}

                {countryLower === "usa" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter State"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter City"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                            <input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter Street Address"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                            <input
                                type="text"
                                name="zipcode"
                                value={formData.zipcode}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter ZIP Code"
                                required
                            />
                        </div>
                    </>
                )}

                {(formData.country && !["india", "usa"].includes(countryLower)) && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter City"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                            <input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter Street Address"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter Postal Code"
                            />
                        </div>
                    </>
                )}
            </div>

            <button
                type="submit"
                className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                {addressToEdit ? "Update Address" : "Save Address"}
            </button>
        </form>
    );
};

export default AddressForm;