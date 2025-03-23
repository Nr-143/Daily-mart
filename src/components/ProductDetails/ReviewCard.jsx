import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ comment }) => {
    console.log("comment:", comment); // Debugging line
    return (
        <div className="border border-gray-200 shadow-md p-4 rounded-xl bg-white">
            {/* User Info */}
            <div className="flex items-center space-x-4">
                <img
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-12 h-12 rounded-full border border-gray-300"
                />
                <div>
                    <p className="font-semibold text-gray-900">{comment.user}</p>
                    <p className="text-xs text-gray-500">{comment.date}</p>
                </div>
            </div>

            {/* Rating and Review Text */}
            <div className="mt-3">
                <div className="flex items-center space-x-1 text-yellow-500">
                    {[...Array(comment.rating)].map((_, index) => (
                        <FaStar key={index} />
                    ))}
                </div>
                <p className="text-gray-700 mt-2 text-[15px] leading-relaxed">{comment.text}</p>
            </div>

            {/* Review Images */}
            {comment.images && comment.images.length > 0 && (
                <div className="mt-3 flex gap-2">
                    {comment.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="review"
                            className="w-16 h-16 object-cover rounded-lg border border-gray-300 hover:scale-105 transition-transform"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
const ReviewsSection = ({ reviews = [] }) => {
    console.log("reviews:", reviews); // Debugging line
    const [showAll, setShowAll] = useState(false);

    // Ensure reviews is always an array
    const safeReviews = Array.isArray(reviews) ? reviews : [];
    const displayedReviews = showAll ? safeReviews : safeReviews.slice(0, 4);

    return (
        <div className="w-full">
            <h2 className="text-lg font-bold mb-3">Customer Reviews</h2>
            <p className="text-gray-600 mb-4">
                Overall Rating: ⭐ 5 / 5 ({safeReviews.length} reviews)
            </p>

            {/* Grid Layout: 2 Columns on Desktop, 1 Column on Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedReviews.map((review, index) => (
                    <ReviewCard key={index} comment={review} />
                ))}
            </div>

            {/* Read More Button */}
            {safeReviews.length > 4 && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="mt-5 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e65c2a] transition-all"
                >
                    {showAll ? "Show Less" : "Read More Reviews"}
                </button>
            )}
        </div>
    );
};

export default ReviewsSection;