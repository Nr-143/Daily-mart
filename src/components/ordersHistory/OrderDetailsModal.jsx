import React from "react";

const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;

    // Calculate progress percentage based on status
    const getProgressPercentage = () => {
        const statusOrder = ["Processing", "Shipped", "In Transit", "Out for Delivery", "Delivered"];
        const currentIndex = statusOrder.indexOf(order.status);
        return ((currentIndex + 1) / statusOrder.length) * 100;
    };

    // Check if any step is delayed
    const isStepDelayed = (step) => {
        if (!order.estimatedDates || !order.estimatedDates[step]) return false;
        const estimatedDate = new Date(order.estimatedDates[step]);
        const today = new Date();
        return today > estimatedDate;
    };

    // Format date with delay warning if needed
    const formatDate = (dateString, step) => {
        if (!dateString) return "Pending";
        const date = new Date(dateString);
        const isDelayed = isStepDelayed(step);

        return (
            <span className={isDelayed ? "text-red-500" : ""}>
                {date.toLocaleDateString()}
                {isDelayed && " (Delayed)"}
            </span>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[95vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Order #{order.id}</h2>
                        <p className="text-xs sm:text-sm text-gray-600">
                            Placed on: {new Date(order.date).toLocaleDateString()}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>

                {/* Main Content */}
                <div className="p-4 sm:p-6">
                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="flex justify-between mb-1 text-xs sm:text-sm">
                            <span className="font-medium text-gray-700">
                                Order Progress: {order.status}
                            </span>
                            <span className="font-medium text-gray-700">
                                {Math.round(getProgressPercentage())}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
                            <div
                                className="bg-blue-600 h-full rounded-full"
                                style={{ width: `${getProgressPercentage()}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Tracking Timeline */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-base sm:text-lg mb-3">Order Tracking</h3>
                        <div className="space-y-3">
                            {/* Processing */}
                            <div className={`flex items-start ${order.status === "Processing" ? "text-blue-600" : ""}`}>
                                <div className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center 
                                    ${order.status === "Processing" ? "bg-blue-600 text-white" :
                                        order.status === "Cancelled" ? "bg-gray-300" : "bg-green-500 text-white"}`}>
                                    {order.status === "Processing" ? "1" : "✓"}
                                </div>
                                <div className="ml-3">
                                    <p className="font-medium text-sm sm:text-base">Order Processing</p>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        {order.processedDate ?
                                            `Processed on ${formatDate(order.processedDate, "Processing")}` :
                                            "Your order is being prepared"}
                                    </p>
                                    {isStepDelayed("Processing") && (
                                        <p className="text-xs sm:text-sm text-red-500 mt-1">
                                            ⚠️ Processing is taking longer than expected
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Shipped */}
                            {order.status !== "Cancelled" && (
                                <div className={`flex items-start ${order.status === "Shipped" ? "text-blue-600" : ""}`}>
                                    <div className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center 
                                        ${order.status === "Processing" ? "bg-gray-300" :
                                            order.status === "Shipped" ? "bg-blue-600 text-white" :
                                                "bg-green-500 text-white"}`}>
                                        {["Processing", "Cancelled"].includes(order.status) ? "2" : "✓"}
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-medium text-sm sm:text-base">Shipped</p>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            {order.shippedDate ?
                                                `Shipped on ${formatDate(order.shippedDate, "Shipped")}` :
                                                "Will be shipped soon"}
                                        </p>
                                        {isStepDelayed("Shipped") && (
                                            <p className="text-xs sm:text-sm text-red-500 mt-1">
                                                ⚠️ Shipment is delayed. Carrier: {order.carrier || "Standard Shipping"}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* In Transit */}
                            {["In Transit", "Out for Delivery", "Delivered"].includes(order.status) && (
                                <div className={`flex items-start ${order.status === "In Transit" ? "text-blue-600" : ""}`}>
                                    <div className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center 
                                        ${order.status === "In Transit" ? "bg-blue-600 text-white" : "bg-green-500 text-white"}`}>
                                        ✓
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-medium text-sm sm:text-base">In Transit</p>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            {order.transitDate ?
                                                `In transit since ${formatDate(order.transitDate, "In Transit")}` :
                                                "On its way"}
                                        </p>
                                        {order.trackingNumber && (
                                            <p className="text-xs sm:text-sm text-blue-500 mt-1">
                                                Tracking #: {order.trackingNumber}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Out for Delivery */}
                            {["Out for Delivery", "Delivered"].includes(order.status) && (
                                <div className={`flex items-start ${order.status === "Out for Delivery" ? "text-blue-600" : ""}`}>
                                    <div className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center 
                                        ${order.status === "Out for Delivery" ? "bg-blue-600 text-white" : "bg-green-500 text-white"}`}>
                                        ✓
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-medium text-sm sm:text-base">Out for Delivery</p>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            {order.outForDeliveryDate ?
                                                `Out for delivery on ${formatDate(order.outForDeliveryDate, "Out for Delivery")}` :
                                                "Being delivered today"}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Delivered */}
                            {order.status === "Delivered" && (
                                <div className="flex items-start text-green-600">
                                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                                        ✓
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-medium text-sm sm:text-base">Delivered</p>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Delivered on {formatDate(order.deliveredDate, "Delivered")}
                                        </p>
                                        {order.deliveryNotes && (
                                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                                Note: {order.deliveryNotes}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Cancelled */}
                            {order.status === "Cancelled" && (
                                <div className="flex items-start text-red-600">
                                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500 text-white flex items-center justify-center">
                                        ✕
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-medium text-sm sm:text-base">Order Cancelled</p>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            {order.cancellationDate ?
                                                `Cancelled on ${formatDate(order.cancellationDate, "Cancelled")}` :
                                                "Order was cancelled"}
                                        </p>
                                        {order.cancellationReason && (
                                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                                Reason: {order.cancellationReason}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Items - Simplified for mobile */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-base sm:text-lg mb-3">Order Items</h3>
                        <div className="space-y-3">
                            {order.items.map((item, index) => (
                                <div key={index} className="border rounded-lg p-3">
                                    <div className="flex">
                                        {item.image && (
                                            <div className="flex-shrink-0 h-12 w-12 mr-3">
                                                <img className="h-12 w-12 rounded" src={item.image} alt={item.name} />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                            {item.sku && <p className="text-xs text-gray-500">SKU: {item.sku}</p>}
                                            <div className="grid grid-cols-2 gap-2 mt-1 text-xs sm:text-sm">
                                                <div>
                                                    <span className="text-gray-500">Price:</span> ${item.price.toFixed(2)}
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Qty:</span> {item.quantity}
                                                </div>
                                                <div className="col-span-2">
                                                    <span className="text-gray-500">Total:</span> ${(item.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-base sm:text-lg mb-3">Order Summary</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span>${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span>${order.shippingCost.toFixed(2)}</span>
                            </div>
                            {order.discount > 0 && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Discount</span>
                                    <span className="text-green-600">-${order.discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax</span>
                                <span>${order.tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
                                <span className="text-gray-800">Total</span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping & Billing - Stacked on mobile */}
                    {(order.shippingAddress || order.billingAddress) && (
                        <div className="mb-6">
                            <h3 className="font-semibold text-base sm:text-lg mb-3">Address Information</h3>
                            <div className="space-y-4">
                                {order.shippingAddress && (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-sm sm:text-base mb-2">Shipping Address</h4>
                                        <address className="not-italic text-xs sm:text-sm text-gray-600 space-y-1">
                                            {order.shippingAddress.name && <p>{order.shippingAddress.name}</p>}
                                            <p>{order.shippingAddress.street}</p>
                                            {order.shippingAddress.street2 && <p>{order.shippingAddress.street2}</p>}
                                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                                            <p>{order.shippingAddress.country}</p>
                                            {order.shippingAddress.phone && <p className="mt-1">Phone: {order.shippingAddress.phone}</p>}
                                        </address>
                                    </div>
                                )}
                                {order.billingAddress && (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-sm sm:text-base mb-2">Billing Address</h4>
                                        <address className="not-italic text-xs sm:text-sm text-gray-600 space-y-1">
                                            {order.billingAddress.name && <p>{order.billingAddress.name}</p>}
                                            <p>{order.billingAddress.street}</p>
                                            {order.billingAddress.street2 && <p>{order.billingAddress.street2}</p>}
                                            <p>{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}</p>
                                            <p>{order.billingAddress.country}</p>
                                        </address>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Payment Information */}
                    {order.paymentMethod && (
                        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-base sm:text-lg mb-2">Payment Information</h3>
                            <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                                <p>
                                    <span className="font-medium">Method:</span> {order.paymentMethod.type}
                                    {order.paymentMethod.last4 ? ` (•••• ${order.paymentMethod.last4})` : ''}
                                </p>
                                <p>
                                    <span className="font-medium">Status:</span>
                                    <span className={`ml-1 font-semibold ${order.paymentMethod.status === 'Paid' ? 'text-green-600' :
                                            order.paymentMethod.status === 'Pending' ? 'text-yellow-600' :
                                                'text-red-600'
                                        }`}>
                                        {order.paymentMethod.status}
                                    </span>
                                </p>
                                {order.paymentMethod.date && (
                                    <p>
                                        <span className="font-medium">Paid on:</span> {new Date(order.paymentMethod.date).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sticky Footer with Action Buttons */}
                <div className="sticky bottom-0 bg-white border-t p-4">
                    <div className="flex justify-end space-x-3">
                        {order.status === "Processing" && (
                            <button
                                className="px-3 py-2 sm:px-4 sm:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm sm:text-base"
                            >
                                Cancel Order
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-300 rounded-md hover:bg-gray-400 text-sm sm:text-base"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;