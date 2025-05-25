import React from 'react';
import { FiImage, FiX, FiChevronUp, FiChevronDown } from 'react-icons/fi';

const ImagesPage = ({ formData, setFormData }) => {
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newImages = [];
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImages.push(reader.result);
                    if (newImages.length === files.length) {
                        setFormData(prev => ({
                            ...prev,
                            images: [...prev.images, ...newImages]
                        }));
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const moveImage = (fromIndex, toIndex) => {
        const newImages = [...formData.images];
        const [removed] = newImages.splice(fromIndex, 1);
        newImages.splice(toIndex, 0, removed);
        setFormData(prev => ({
            ...prev,
            images: newImages
        }));
    };

    return (
        <>
            <h4 className="text-md font-medium mb-4">Product Images</h4>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Images (Max 10, first image will be featured)
                </label>
                <div className="flex flex-wrap gap-4">
                    {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={image}
                                alt={`Product ${index + 1}`}
                                className="h-24 w-24 object-cover rounded border"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="text-white bg-red-500 rounded-full p-1 m-1"
                                >
                                    <FiX size={16} />
                                </button>
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => moveImage(index, index - 1)}
                                        className="text-white bg-blue-500 rounded-full p-1 m-1"
                                    >
                                        <FiChevronUp size={16} />
                                    </button>
                                )}
                                {index < formData.images.length - 1 && (
                                    <button
                                        type="button"
                                        onClick={() => moveImage(index, index + 1)}
                                        className="text-white bg-blue-500 rounded-full p-1 m-1"
                                    >
                                        <FiChevronDown size={16} />
                                    </button>
                                )}
                            </div>
                            {index === 0 && (
                                <span className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-1 rounded-br">
                                    Featured
                                </span>
                            )}
                        </div>
                    ))}
                    {formData.images.length < 10 && (
                        <label className="cursor-pointer flex flex-col items-center justify-center h-24 w-24 border-2 border-dashed rounded p-4 text-center">
                            <FiImage className="mx-auto text-gray-400" size={24} />
                            <span className="text-xs text-gray-500 mt-1">Add Image</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                multiple
                            />
                        </label>
                    )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {formData.images.length} of 10 images uploaded
                </p>
            </div>
        </>
    );
};

export default ImagesPage;