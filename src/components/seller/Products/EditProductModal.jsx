// components/seller/Products/EditProductModal.jsx
import React, { useState } from 'react';
import { FiX, FiImage, FiPlus, FiMinus } from 'react-icons/fi';

const EditProductModal = ({ product, onClose, onSave, mode = 'edit' }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        price: product?.price || '',
        stock: product?.stock || '',
        offer: product?.offer || 0,
        category: product?.category || 'fruits',
        description: product?.description || '',
        image: product?.image || ''
    });

    const categories = ['fruits', 'vegetables', 'dairy', 'bakery', 'beverages', 'meat'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                        {mode === 'add' ? 'Add New Product' : `Edit ${product.name}`}
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FiX size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            rows="3"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                        <div className="flex items-center space-x-4">
                            {formData.image ? (
                                <div className="relative">
                                    <img src={formData.image} alt="Preview" className="h-20 w-20 object-cover rounded" />
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <FiX size={12} />
                                    </button>
                                </div>
                            ) : (
                                <div className="border-2 border-dashed rounded p-4 text-center">
                                    <FiImage className="mx-auto text-gray-400" size={24} />
                                    <p className="text-xs text-gray-500 mt-1">No image selected</p>
                                </div>
                            )}
                            <label className="cursor-pointer">
                                <span className="bg-blue-500 text-white px-4 py-2 rounded">Upload Image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {mode === 'add' ? 'Add Product' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;