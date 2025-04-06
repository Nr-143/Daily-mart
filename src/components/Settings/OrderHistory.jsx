import React, { useState, useEffect } from "react";
import OrderTable from "../ordersHistory/OrderTable";
import LoaderWithMessage from "../Loader/LoaderWithMessage";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate fetching data with a delay
        setTimeout(() => {
            try {
                const exampleOrders = [
                    // 1. Standard order in transit
                    {
                        id: "ORD-12345",
                        date: "2023-05-15T10:30:00Z",
                        status: "In Transit",
                        subtotal: 89.97,
                        shippingCost: 5.99,
                        discount: 10.00,
                        tax: 7.50,
                        total: 93.46,
                        estimatedDelivery: "2023-05-20T00:00:00Z",
                        estimatedDates: {
                            Processing: "2023-05-16T00:00:00Z",
                            Shipped: "2023-05-17T00:00:00Z",
                            "In Transit": "2023-05-19T00:00:00Z",
                            "Out for Delivery": "2023-05-20T00:00:00Z",
                            Delivered: "2023-05-20T00:00:00Z"
                        },
                        processedDate: "2023-05-15T14:45:00Z",
                        shippedDate: "2023-05-16T09:30:00Z",
                        transitDate: "2023-05-17T12:00:00Z",
                        carrier: "FedEx",
                        trackingNumber: "FX123456789",
                        items: [
                            {
                                name: "Wireless Headphones",
                                sku: "WH-2023-BLK",
                                price: 59.99,
                                quantity: 1,
                                image: "/images/headphones.jpg"
                            },
                            {
                                name: "Phone Case",
                                sku: "PC-2023-RED",
                                price: 14.99,
                                quantity: 2,
                                image: "/images/phone-case.jpg"
                            }
                        ],
                        shippingAddress: {
                            name: "John Doe",
                            street: "123 Main St",
                            city: "New York",
                            state: "NY",
                            zip: "10001",
                            country: "United States",
                            phone: "+1 (555) 123-4567"
                        },
                        billingAddress: {
                            name: "John Doe",
                            street: "123 Main St",
                            city: "New York",
                            state: "NY",
                            zip: "10001",
                            country: "United States"
                        },
                        paymentMethod: {
                            type: "Visa",
                            last4: "4242",
                            status: "Paid",
                            date: "2023-05-15T10:30:00Z"
                        }
                    },

                    // 2. Recently placed order (processing)
                    {
                        id: "ORD-67890",
                        date: "2023-05-18T08:15:00Z",
                        status: "Processing",
                        subtotal: 149.95,
                        shippingCost: 0.00, // Free shipping
                        discount: 0.00,
                        tax: 12.50,
                        total: 162.45,
                        estimatedDelivery: "2023-05-25T00:00:00Z",
                        estimatedDates: {
                            Processing: "2023-05-19T00:00:00Z",
                            Shipped: "2023-05-21T00:00:00Z",
                            "In Transit": "2023-05-23T00:00:00Z",
                            "Out for Delivery": "2023-05-25T00:00:00Z",
                            Delivered: "2023-05-25T00:00:00Z"
                        },
                        processedDate: null,
                        shippedDate: null,
                        transitDate: null,
                        carrier: null,
                        trackingNumber: null,
                        items: [
                            {
                                name: "Smart Watch Pro",
                                sku: "SW-2023-BLK",
                                price: 149.95,
                                quantity: 1,
                                image: "/images/smartwatch.jpg"
                            }
                        ],
                        shippingAddress: {
                            name: "Jane Smith",
                            street: "456 Oak Ave",
                            city: "Los Angeles",
                            state: "CA",
                            zip: "90001",
                            country: "United States",
                            phone: "+1 (555) 987-6543"
                        },
                        billingAddress: {
                            name: "Jane Smith",
                            street: "456 Oak Ave",
                            city: "Los Angeles",
                            state: "CA",
                            zip: "90001",
                            country: "United States"
                        },
                        paymentMethod: {
                            type: "MasterCard",
                            last4: "5555",
                            status: "Paid",
                            date: "2023-05-18T08:15:00Z"
                        }
                    },

                    // 3. Delivered order
                    {
                        id: "ORD-11223",
                        date: "2023-05-10T14:20:00Z",
                        status: "Delivered",
                        subtotal: 199.98,
                        shippingCost: 8.99,
                        discount: 20.00,
                        tax: 15.50,
                        total: 204.47,
                        estimatedDelivery: "2023-05-15T00:00:00Z",
                        estimatedDates: {
                            Processing: "2023-05-11T00:00:00Z",
                            Shipped: "2023-05-12T00:00:00Z",
                            "In Transit": "2023-05-14T00:00:00Z",
                            "Out for Delivery": "2023-05-15T00:00:00Z",
                            Delivered: "2023-05-15T00:00:00Z"
                        },
                        processedDate: "2023-05-10T16:45:00Z",
                        shippedDate: "2023-05-12T10:15:00Z",
                        transitDate: "2023-05-13T08:30:00Z",
                        outForDeliveryDate: "2023-05-15T07:45:00Z",
                        deliveredDate: "2023-05-15T14:20:00Z",
                        carrier: "UPS",
                        trackingNumber: "1Z999AA1012345678",
                        deliveryNotes: "Left at front door",
                        items: [
                            {
                                name: "Bluetooth Speaker",
                                sku: "BS-2023-SLV",
                                price: 79.99,
                                quantity: 2,
                                image: "/images/speaker.jpg"
                            },
                            {
                                name: "Screen Protector",
                                sku: "SP-2023-UNI",
                                price: 9.99,
                                quantity: 4,
                                image: "/images/protector.jpg"
                            }
                        ],
                        shippingAddress: {
                            name: "Robert Johnson",
                            street: "789 Pine Rd",
                            apartment: "Apt 302",
                            city: "Chicago",
                            state: "IL",
                            zip: "60601",
                            country: "United States",
                            phone: "+1 (555) 456-7890"
                        },
                        billingAddress: {
                            name: "Robert Johnson",
                            street: "789 Pine Rd",
                            apartment: "Apt 302",
                            city: "Chicago",
                            state: "IL",
                            zip: "60601",
                            country: "United States"
                        },
                        paymentMethod: {
                            type: "American Express",
                            last4: "1001",
                            status: "Paid",
                            date: "2023-05-10T14:20:00Z"
                        }
                    },

                    // 4. Cancelled order
                    {
                        id: "ORD-33445",
                        date: "2023-05-14T11:45:00Z",
                        status: "Cancelled",
                        subtotal: 59.99,
                        shippingCost: 4.99,
                        discount: 0.00,
                        tax: 5.20,
                        total: 70.18,
                        estimatedDelivery: "2023-05-19T00:00:00Z",
                        estimatedDates: {
                            Processing: "2023-05-15T00:00:00Z",
                            Shipped: "2023-05-17T00:00:00Z",
                            "In Transit": "2023-05-18T00:00:00Z",
                            "Out for Delivery": "2023-05-19T00:00:00Z",
                            Delivered: "2023-05-19T00:00:00Z"
                        },
                        processedDate: "2023-05-14T13:30:00Z",
                        cancellationDate: "2023-05-15T09:15:00Z",
                        cancellationReason: "Changed my mind",
                        items: [
                            {
                                name: "Wireless Earbuds",
                                sku: "WE-2023-WHT",
                                price: 59.99,
                                quantity: 1,
                                image: "/images/earbuds.jpg"
                            }
                        ],
                        shippingAddress: {
                            name: "Emily Davis",
                            street: "321 Elm St",
                            city: "Houston",
                            state: "TX",
                            zip: "77001",
                            country: "United States",
                            phone: "+1 (555) 789-0123"
                        },
                        billingAddress: {
                            name: "Emily Davis",
                            street: "321 Elm St",
                            city: "Houston",
                            state: "TX",
                            zip: "77001",
                            country: "United States"
                        },
                        paymentMethod: {
                            type: "PayPal",
                            status: "Refunded",
                            date: "2023-05-14T11:45:00Z",
                            refundDate: "2023-05-16T10:00:00Z"
                        }
                    },

                    // 5. Delayed order
                    {
                        id: "ORD-55667",
                        date: "2023-05-05T09:30:00Z",
                        status: "Shipped",
                        subtotal: 249.95,
                        shippingCost: 12.99,
                        discount: 25.00,
                        tax: 19.50,
                        total: 257.44,
                        estimatedDelivery: "2023-05-12T00:00:00Z",
                        estimatedDates: {
                            Processing: "2023-05-06T00:00:00Z",
                            Shipped: "2023-05-08T00:00:00Z",
                            "In Transit": "2023-05-10T00:00:00Z",
                            "Out for Delivery": "2023-05-12T00:00:00Z",
                            Delivered: "2023-05-12T00:00:00Z"
                        },
                        processedDate: "2023-05-05T14:20:00Z",
                        shippedDate: "2023-05-09T11:45:00Z", // Delayed shipment
                        transitDate: null,
                        carrier: "USPS",
                        trackingNumber: "9400100000000000000000",
                        delayReason: "Inventory shortage",
                        items: [
                            {
                                name: "Fitness Tracker",
                                sku: "FT-2023-BLU",
                                price: 99.99,
                                quantity: 1,
                                image: "/images/tracker.jpg"
                            },
                            {
                                name: "Yoga Mat",
                                sku: "YM-2023-PUR",
                                price: 29.99,
                                quantity: 1,
                                image: "/images/mat.jpg"
                            },
                            {
                                name: "Resistance Bands Set",
                                sku: "RB-2023-SET",
                                price: 39.99,
                                quantity: 3,
                                image: "/images/bands.jpg"
                            }
                        ],
                        shippingAddress: {
                            name: "Michael Brown",
                            street: "159 Maple Dr",
                            city: "Phoenix",
                            state: "AZ",
                            zip: "85001",
                            country: "United States",
                            phone: "+1 (555) 234-5678"
                        },
                        billingAddress: {
                            name: "Michael Brown",
                            street: "159 Maple Dr",
                            city: "Phoenix",
                            state: "AZ",
                            zip: "85001",
                            country: "United States"
                        },
                        paymentMethod: {
                            type: "Discover",
                            last4: "2020",
                            status: "Paid",
                            date: "2023-05-05T09:30:00Z"
                        }
                    },

                    // 6. International order
                    {
                        id: "ORD-77889",
                        date: "2023-05-12T16:45:00Z",
                        status: "In Transit",
                        subtotal: 179.97,
                        shippingCost: 24.99,
                        discount: 0.00,
                        tax: 0.00, // No tax for international
                        total: 204.96,
                        estimatedDelivery: "2023-05-25T00:00:00Z",
                        estimatedDates: {
                            Processing: "2023-05-13T00:00:00Z",
                            Shipped: "2023-05-15T00:00:00Z",
                            "In Transit": "2023-05-20T00:00:00Z",
                            "Out for Delivery": "2023-05-25T00:00:00Z",
                            Delivered: "2023-05-25T00:00:00Z"
                        },
                        processedDate: "2023-05-12T18:30:00Z",
                        shippedDate: "2023-05-15T14:15:00Z",
                        transitDate: "2023-05-16T09:00:00Z",
                        carrier: "DHL",
                        trackingNumber: "1234567890",
                        customsInfo: {
                            trackingNumber: "CZ1234567890",
                            status: "Cleared",
                            date: "2023-05-18T11:30:00Z"
                        },
                        items: [
                            {
                                name: "Noise Cancelling Headphones",
                                sku: "NC-2023-BLK",
                                price: 179.97,
                                quantity: 1,
                                image: "/images/nc-headphones.jpg"
                            }
                        ],
                        shippingAddress: {
                            name: "David Wilson",
                            street: "10 Downing Street",
                            city: "London",
                            postalCode: "SW1A 2AA",
                            country: "United Kingdom",
                            phone: "+44 20 1234 5678"
                        },
                        billingAddress: {
                            name: "David Wilson",
                            street: "10 Downing Street",
                            city: "London",
                            postalCode: "SW1A 2AA",
                            country: "United Kingdom"
                        },
                        paymentMethod: {
                            type: "Visa",
                            last4: "4242",
                            status: "Paid",
                            date: "2023-05-12T16:45:00Z"
                        }
                    },

                    // 7. Digital order (no shipping)
                    {
                        id: "ORD-99001",
                        date: "2023-05-17T20:15:00Z",
                        status: "Delivered",
                        subtotal: 49.99,
                        shippingCost: 0.00,
                        discount: 0.00,
                        tax: 4.25,
                        total: 54.24,
                        isDigital: true,
                        deliveryMethod: "Email",
                        deliveredDate: "2023-05-17T20:20:00Z",
                        downloadLink: "https://example.com/download/99001",
                        licenseKey: "ABCD-EFGH-IJKL-MNOP",
                        items: [
                            {
                                name: "Premium Software License",
                                sku: "SW-2023-PRM",
                                price: 49.99,
                                quantity: 1,
                                image: "/images/software.jpg",
                                isDigital: true
                            }
                        ],
                        shippingAddress: null,
                        billingAddress: {
                            name: "Sarah Miller",
                            street: "246 Cedar Ln",
                            city: "San Francisco",
                            state: "CA",
                            zip: "94101",
                            country: "United States"
                        },
                        paymentMethod: {
                            type: "Apple Pay",
                            status: "Paid",
                            date: "2023-05-17T20:15:00Z"
                        }
                    },

                    // 8. Returned order
                    {
                        id: "ORD-22334",
                        date: "2023-04-28T13:20:00Z",
                        status: "Returned",
                        subtotal: 129.99,
                        shippingCost: 7.99,
                        discount: 0.00,
                        tax: 10.50,
                        total: 148.48,
                        estimatedDelivery: "2023-05-03T00:00:00Z",
                        estimatedDates: {
                            Processing: "2023-04-29T00:00:00Z",
                            Shipped: "2023-04-30T00:00:00Z",
                            "In Transit": "2023-05-02T00:00:00Z",
                            "Out for Delivery": "2023-05-03T00:00:00Z",
                            Delivered: "2023-05-03T00:00:00Z"
                        },
                        processedDate: "2023-04-28T15:45:00Z",
                        shippedDate: "2023-04-30T10:30:00Z",
                        deliveredDate: "2023-05-03T11:15:00Z",
                        returnRequestDate: "2023-05-05T09:30:00Z",
                        returnReason: "Product not as described",
                        returnStatus: "Completed",
                        returnCompletedDate: "2023-05-10T14:00:00Z",
                        refundAmount: 148.48,
                        refundMethod: "Original Payment",
                        carrier: "UPS",
                        trackingNumber: "1Z999AA1023456789",
                        items: [
                            {
                                name: "Wireless Keyboard",
                                sku: "WK-2023-BLK",
                                price: 129.99,
                                quantity: 1,
                                image: "/images/keyboard.jpg",
                                returnReason: "Not compatible with my device"
                            }
                        ],
                        shippingAddress: {
                            name: "Thomas Anderson",
                            street: "135 Birch Blvd",
                            city: "Seattle",
                            state: "WA",
                            zip: "98101",
                            country: "United States",
                            phone: "+1 (555) 345-6789"
                        },
                        billingAddress: {
                            name: "Thomas Anderson",
                            street: "135 Birch Blvd",
                            city: "Seattle",
                            state: "WA",
                            zip: "98101",
                            country: "United States"
                        },
                        paymentMethod: {
                            type: "Visa",
                            last4: "4242",
                            status: "Refunded",
                            date: "2023-04-28T13:20:00Z",
                            refundDate: "2023-05-10T14:00:00Z"
                        }
                    }
                ];

                setOrders(exampleOrders);
                setLoading(false);
            } catch (err) {
                setError("Failed to load order history.");
                setLoading(false);
            }
        }, 1500); // Simulating a delay of 1.5 seconds
    }, []);

    return (
        <div className="min-h-[90vh] max-h-[110vh] bg-gray-100 p-1">
            {loading ? (
                <LoaderWithMessage message="Fetching your orders..." />
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <OrderTable orders={orders} />
            )}
        </div>
    );
};

export default OrderHistory;
