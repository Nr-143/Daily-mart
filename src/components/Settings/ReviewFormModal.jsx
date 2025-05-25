import React, { useState } from 'react';
import { FiX, FiStar, FiCamera } from 'react-icons/fi';

const ReviewFormModal = ({ order, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [images, setImages] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            orderId: order.id,
            rating,
            comment,
            images,
            date: new Date().toISOString()
        });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files.map(file => URL.createObjectURL(file))]);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Leave a Review</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FiX size={24} />
                    </button>
                </div>

                <div className="mb-4">
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">
                        Delivered on {order.deliveredDate ? new Date(order.deliveredDate).toLocaleDateString() : 'N/A'}
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Rating</label>
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="text-2xl mr-1"
                                >
                                    <FiStar
                                        className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Review</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            rows="4"
                            placeholder="Share your experience with this order..."
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Upload Photos</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {images.map((img, index) => (
                                <div key={index} className="relative">
                                    <img src={img} alt={`Review ${index}`} className="h-16 w-16 object-cover rounded" />
                                </div>
                            ))}
                        </div>
                        <label className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-md cursor-pointer">
                            <FiCamera className="mr-2" />
                            Add Photos
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={rating === 0}
                            className={`px-4 py-2 rounded-md text-white ${rating === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                        >
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewFormModal;