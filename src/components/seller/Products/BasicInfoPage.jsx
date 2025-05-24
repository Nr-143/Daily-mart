import React from 'react';
import { FiPlus, FiMinus, FiCalendar, FiX } from 'react-icons/fi';
import { categories } from './productConfig';

const BasicInfoPage = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const addHighlight = () => {
        setFormData(prev => ({
            ...prev,
            highlights: [...prev.highlights, '']
        }));
    };

    const updateHighlight = (index, value) => {
        setFormData(prev => {
            const newHighlights = [...prev.highlights];
            newHighlights[index] = value;
            return {
                ...prev,
                highlights: newHighlights
            };
        });
    };

    const removeHighlight = (index) => {
        setFormData(prev => ({
            ...prev,
            highlights: prev.highlights.filter((_, i) => i !== index)
        }));
    };

    return (
        <>
            <h4 className="text-md font-medium mb-4">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    >
                        {Object.keys(categories).map(cat => (
                            <option key={cat} value={cat}>{categories[cat].label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)*</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        min="0"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock*</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        min="0"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Offer (%)</label>
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, offer: Math.max(0, prev.offer - 5) }))}
                            className="bg-gray-200 px-2 rounded-l"
                        >
                            <FiMinus />
                        </button>
                        <input
                            type="number"
                            name="offer"
                            value={formData.offer}
                            onChange={handleChange}
                            className="w-full border-y p-2 text-center"
                            min="0"
                            max="100"
                        />
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, offer: Math.min(100, prev.offer + 5) }))}
                            className="bg-gray-200 px-2 rounded-r"
                        >
                            <FiPlus />
                        </button>
                    </div>
                </div>
            </div>

            {formData.offer > 0 && (
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Offer End Date</label>
                    <div className="flex items-center">
                        <input
                            type="datetime-local"
                            name="offerEndDate"
                            value={formData.offerEndDate}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                        <FiCalendar className="ml-2 text-gray-500" />
                    </div>
                </div>
            )}

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    rows="3"
                    required
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Key Highlights</label>
                <div className="space-y-2">
                    {formData.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center">
                            <input
                                type="text"
                                value={highlight}
                                onChange={(e) => updateHighlight(index, e.target.value)}
                                className="flex-1 border p-2 rounded"
                                placeholder="Enter highlight"
                            />
                            <button
                                type="button"
                                onClick={() => removeHighlight(index)}
                                className="ml-2 text-red-500 hover:text-red-700"
                            >
                                <FiX />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addHighlight}
                        className="flex items-center text-blue-600 hover:text-blue-800 mt-2"
                    >
                        <FiPlus className="mr-1" /> Add Highlight
                    </button>
                </div>
            </div>
        </>
    );
};

export default BasicInfoPage;