import React, { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";

const OrderTable = ({ orders }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedOrder, setSelectedOrder] = useState(null);

    const ordersPerPage = 5;
    const filteredOrders =
        statusFilter === "All"
            ? orders
            : orders.filter((order) => order.status === statusFilter);

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const startIndex = (currentPage - 1) * ordersPerPage;
    const displayedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-green-100 text-green-800";
            case "Processing":
                return "bg-blue-100 text-blue-800";
            case "Shipped":
                return "bg-purple-100 text-purple-800";
            case "In Transit":
                return "bg-yellow-100 text-yellow-800";
            case "Out for Delivery":
                return "bg-orange-100 text-orange-800";
            case "Cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusProgress = (order) => {
        const statusOrder = ["Processing", "Shipped", "In Transit", "Out for Delivery", "Delivered"];
        const currentIndex = statusOrder.indexOf(order.status);
        return currentIndex >= 0 ? ((currentIndex + 1) / statusOrder.length) * 100 : 0;
    };

    return (
        <div className="mt-4 bg-white shadow-lg rounded-lg p-4 overflow-x-auto">
            {/* Status Filter */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-midnightBlue">Order History</h2>
                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1); // Reset to first page when filter changes
                    }}
                    className="p-2 border rounded-md text-midnightBlue"
                >
                    <option value="All">All</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            {/* Order Table */}
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-midnightBlue text-white">
                        <th className="p-3 text-left">Order ID</th>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Progress</th>
                        <th className="p-3 text-left">Total</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">#{order.id}</td>
                            <td className="p-3">{new Date(order.date).toLocaleDateString()}</td>
                            <td className="p-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                                {order.estimatedDelivery && (
                                    <div className="text-xs text-gray-500 mt-1">
                                        Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                                    </div>
                                )}
                            </td>
                            <td className="p-3">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{ width: `${getStatusProgress(order)}%` }}
                                    ></div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1 text-center">
                                    {Math.round(getStatusProgress(order))}% complete
                                </div>
                            </td>
                            <td className="p-3">${order.total.toFixed(2)}</td>
                            <td className="p-3">
                                <button
                                    onClick={() => setSelectedOrder(order)}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 bg-midnightBlue text-white rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-electricPurple"}`}
                    >
                        Prev
                    </button>
                    <span className="text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 bg-midnightBlue text-white rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-electricPurple"}`}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Order Details Modal */}
            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </div>
    );
};

export default OrderTable;