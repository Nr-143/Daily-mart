import React from 'react';

const ShippingWarrantyPage = ({ formData, setFormData }) => {
    const handleNestedChange = (parent, e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [name]: type === 'checkbox' ? checked : value
            }
        }));
    };

    return (
        <>
            <h4 className="text-md font-medium mb-4">Shipping & Warranty</h4>
            <div className="space-y-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="freeDelivery"
                        name="freeDelivery"
                        checked={formData.shipping.freeDelivery}
                        onChange={(e) => handleNestedChange('shipping', e)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="freeDelivery" className="ml-2 block text-sm text-gray-700">
                        Free Delivery
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="cashOnDelivery"
                        name="cashOnDelivery"
                        checked={formData.shipping.cashOnDelivery}
                        onChange={(e) => handleNestedChange('shipping', e)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="cashOnDelivery" className="ml-2 block text-sm text-gray-700">
                        Cash on Delivery Available
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Replacement Policy</label>
                    <select
                        name="replacementPolicy"
                        value={formData.shipping.replacementPolicy}
                        onChange={(e) => handleNestedChange('shipping', e)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="none">No Replacement</option>
                        <option value="7-days">7 Days Replacement</option>
                        <option value="10-days">10 Days Replacement</option>
                        <option value="15-days">15 Days Replacement</option>
                    </select>
                </div>

                <div className="pt-4 border-t">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Warranty</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Type</label>
                            <select
                                name="type"
                                value={formData.warranty.type}
                                onChange={(e) => handleNestedChange('warranty', e)}
                                className="w-full border p-2 rounded"
                            >
                                <option value="none">No Warranty</option>
                                <option value="brand">Brand Warranty</option>
                                <option value="seller">Seller Warranty</option>
                            </select>
                        </div>
                        {formData.warranty.type !== 'none' && (
                            <>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Duration</label>
                                    <input
                                        type="number"
                                        name="duration"
                                        value={formData.warranty.duration}
                                        onChange={(e) => handleNestedChange('warranty', e)}
                                        className="w-full border p-2 rounded"
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Period</label>
                                    <select
                                        name="period"
                                        value={formData.warranty.period}
                                        onChange={(e) => handleNestedChange('warranty', e)}
                                        className="w-full border p-2 rounded"
                                    >
                                        <option value="days">Days</option>
                                        <option value="months">Months</option>
                                        <option value="years">Years</option>
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShippingWarrantyPage;