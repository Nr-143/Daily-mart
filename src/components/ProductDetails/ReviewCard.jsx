import React from "react";

const ReviewCard = ({ comment }) => {
    return (
        <div className="border p-3 rounded-lg">
            {/* User Info */}
            <div className="flex items-center space-x-3">
                <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full" />
                <div>
                    <p className="font-semibold">{comment.user}</p>
                    <p className="text-sm text-gray-500">{comment.date}</p>
                </div>
            </div>

            {/* Rating and Review */}
            <p className="text-yellow-500 mt-2">⭐ {comment.rating} / 5</p>
            <p className="text-gray-700">{comment.text}</p>

            {/* Review Images */}
            {comment.images.length > 0 && (
                <div className="mt-2 flex space-x-2">
                    {comment.images.map((img, index) => (
                        <img key={index} src={img} alt="review" className="w-16 h-16 object-cover rounded" />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewCard;
