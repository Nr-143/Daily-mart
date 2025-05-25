import React from 'react';
import { categories } from './productConfig';

const ReviewPage = ({ formData }) => {
    const getCategoryLabel = (categoryKey) => {
        return categories[categoryKey]?.label || categoryKey;
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Product Review</h3>

            <div className="grid gap-6">
                {/* Basic Information Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-3 pb-2 border-b">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Product Name</p>
                            <p className="font-medium">{formData.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Price</p>
                            <p className="font-medium">${formData.price}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Stock Quantity</p>
                            <p className="font-medium">{formData.stock}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Category</p>
                            <p className="font-medium">{getCategoryLabel(formData.category)}</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-sm text-gray-500">Description</p>
                            <p className="font-medium">{formData.description || '-'}</p>
                        </div>
                    </div>
                </div>

                {/* Images Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-3 pb-2 border-b">Images</h4>
                    <div className="flex flex-wrap gap-3">
                        {formData.images.length > 0 ? (
                            formData.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Preview ${index}`}
                                    className="h-24 w-24 object-cover rounded border"
                                />
                            ))
                        ) : (
                            <p className="text-gray-400">No images added</p>
                        )}
                    </div>
                </div>

                {/* Shipping & Warranty Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-3 pb-2 border-b">Shipping & Warranty</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Free Delivery</p>
                            <p className="font-medium">
                                {formData.shipping.freeDelivery ? (
                                    <span className="text-green-600">Yes</span>
                                ) : (
                                    <span className="text-red-600">No</span>
                                )}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Cash on Delivery</p>
                            <p className="font-medium">
                                {formData.shipping.cashOnDelivery ? (
                                    <span className="text-green-600">Yes</span>
                                ) : (
                                    <span className="text-red-600">No</span>
                                )}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Replacement Policy</p>
                            <p className="font-medium capitalize">
                                {formData.shipping.replacementPolicy.replace('-', ' ')}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Warranty</p>
                            <p className="font-medium">
                                {formData.warranty.type === 'none' ? (
                                    <span className="text-gray-500">No warranty</span>
                                ) : (
                                    `${formData.warranty.duration} ${formData.warranty.period}`
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Specifications Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-3 pb-2 border-b">Specifications</h4>
                    {Object.keys(formData.specifications).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(formData.specifications).map(([key, value]) => (
                                <div key={key}>
                                    <p className="text-sm text-gray-500 capitalize">
                                        {key.replace(/_/g, ' ')}
                                    </p>
                                    <p className="font-medium">
                                        {value === true ? 'Yes' : value === false ? 'No' : value.toString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No specifications added</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;