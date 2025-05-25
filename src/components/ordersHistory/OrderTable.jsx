import React, { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import ReviewModal from "../Settings/ReviewFormModal";

const OrderTable = ({ orders }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderToReview, setOrderToReview] = useState(null);

    const ordersPerPage = 5;
    const filteredOrders =
        statusFilter === "All"
            ? orders
            : orders.filter((order) => order.status === statusFilter);

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const startIndex = (currentPage - 1) * ordersPerPage;
    const displayedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

    // Unique status visualization with animated icons
    const getStatusVisual = (status) => {
        const statusMap = {
            "Delivered": {
                icon: "🚀",
                color: "text-emerald-600",
                bg: "bg-emerald-100",
                animation: "animate-bounce"
            },
            "Processing": {
                icon: "⚙️",
                color: "text-blue-600",
                bg: "bg-blue-100",
                animation: "animate-spin"
            },
            "Shipped": {
                icon: "✈️",
                color: "text-purple-600",
                bg: "bg-purple-100",
                animation: ""
            },
            "In Transit": {
                icon: "🚚",
                color: "text-amber-600",
                bg: "bg-amber-100",
                animation: "animate-pulse"
            },
            "Out for Delivery": {
                icon: "🛵",
                color: "text-orange-600",
                bg: "bg-orange-100",
                animation: ""
            },
            "Cancelled": {
                icon: "❌",
                color: "text-red-600",
                bg: "bg-red-100",
                animation: ""
            },
        };

        return statusMap[status] || {
            icon: "❓",
            color: "text-gray-600",
            bg: "bg-gray-100",
            animation: ""
        };
    };

    const getStatusProgress = (order) => {
        const statusOrder = ["Processing", "Shipped", "In Transit", "Out for Delivery", "Delivered"];
        const currentIndex = statusOrder.indexOf(order.status);
        return currentIndex >= 0 ? ((currentIndex + 1) / statusOrder.length) * 100 : 0;
    };

    const handleReviewSubmit = (reviewData) => {
        console.log("Review submitted:", reviewData);
        setOrderToReview(null);
    };

    // Responsive date formatting
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return window.innerWidth < 768
            ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
    };

    return (
        <div className="mt-4 bg-white rounded-2xl p-4 md:p-6 shadow-xl border border-gray-100">
            {/* Header with futuristic gradient */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600">
                    Order Nexus
                </h2>
                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full md:w-auto px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3NzY4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-right-2"
                >
                    <option value="All">All Channels</option>
                    <option value="Delivered">Completed</option>
                    <option value="Processing">In Process</option>
                    <option value="Shipped">En Route</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Out for Delivery">Final Mile</option>
                    <option value="Cancelled">Aborted</option>
                </select>
            </div>

            {/* Responsive order cards */}
            <div className="space-y-4">
                {displayedOrders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-200 hover:border-purple-300 transition-all duration-200 hover:shadow-md group"
                    >
                        {/* Grid layout that changes on mobile */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center">
                            {/* Order ID - full width on mobile */}
                            <div className="md:col-span-2">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Order</div>
                                <div className="font-mono text-lg font-bold text-gray-800">#{order.id}</div>
                            </div>

                            {/* Date - full width on mobile */}
                            <div className="md:col-span-2">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</div>
                                <div className="text-sm font-medium text-gray-700">{formatDate(order.date)}</div>
                                {order.estimatedDelivery && (
                                    <div className="text-xs text-gray-500 mt-1">
                                        <span className="md:hidden">ETA: </span>
                                        {formatDate(order.estimatedDelivery)}
                                    </div>
                                )}
                            </div>

                            {/* Status - full width on mobile with different layout */}
                            <div className="md:col-span-3">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</div>
                                <div className="flex items-center mt-1 gap-2">
                                    <span className={`text-2xl ${getStatusVisual(order.status).animation}`}>
                                        {getStatusVisual(order.status).icon}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusVisual(order.status).bg} ${getStatusVisual(order.status).color}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            {/* Progress bar - full width on mobile */}
                            <div className="md:col-span-3">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                                            style={{ width: `${getStatusProgress(order)}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-bold text-gray-700 w-8">
                                        {Math.round(getStatusProgress(order))}%
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400 mt-1 truncate">
                                    Phase {Math.floor(getStatusProgress(order) / 25) + 1} of 5
                                </div>
                            </div>

                            {/* Total - appears after status on mobile */}
                            <div className="md:col-span-1 order-last md:order-none">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</div>
                                <div className="text-sm font-bold text-gray-800">
                                    ${order.total.toFixed(2)}
                                </div>
                            </div>

                            {/* Actions - right-aligned on desktop, full width on mobile */}
                            <div className="md:col-span-1 flex justify-end">
                                <div className="flex gap-2 w-full md:w-auto">
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors flex items-center justify-center md:w-auto w-full"
                                        title="View Details"
                                    >
                                        <span className="md:hidden mr-2">Details</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        </svg>
                                    </button>
                                    {order.status === "Delivered" && (
                                        <button
                                            onClick={() => setOrderToReview(order)}
                                            className="p-2 bg-green-100 hover:bg-green-200 rounded-lg text-green-700 transition-colors flex items-center justify-center md:w-auto w-full"
                                            title="Leave Review"
                                        >
                                            <span className="md:hidden mr-2">Review</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 20h9"></path>
                                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Responsive pagination */}
            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
                    <div className="text-sm text-gray-600">
                        Showing {startIndex + 1}-{Math.min(startIndex + ordersPerPage, filteredOrders.length)} of {filteredOrders.length} orders
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                        >
                            Previous
                        </button>
                        <div className="flex overflow-x-auto gap-1">
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`min-w-[40px] px-3 py-2 rounded-lg border ${currentPage === pageNum ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            {totalPages > 5 && currentPage < totalPages - 2 && (
                                <span className="px-2 py-2 flex items-center">...</span>
                            )}
                            {totalPages > 5 && currentPage < totalPages - 2 && (
                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    className={`min-w-[40px] px-3 py-2 rounded-lg border ${currentPage === totalPages ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                                >
                                    {totalPages}
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Modals */}
            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}

            {orderToReview && (
                <ReviewModal
                    order={orderToReview}
                    onSubmit={handleReviewSubmit}
                    onClose={() => setOrderToReview(null)}
                />
            )}
        </div>
    );
};

export default OrderTable;