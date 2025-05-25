import React from 'react';
import { FaShieldAlt, FaExchangeAlt, FaClock, FaCreditCard, FaQuestionCircle } from 'react-icons/fa';

const PaymentDetailsPage = () => {
    // Example data from API
    const paymentData = {
        acceptedMethods: ['Visa', 'Mastercard', 'American Express', 'PayPal', 'Apple Pay', 'Google Pay', 'Bank Transfer'],
        processingTimes: {
            cards: '1-2 business days',
            paypal: 'Instant',
            bankTransfer: '3-5 business days'
        },
        refundPolicy: {
            timeframe: '30 days',
            processing: '3-5 business days after return receipt',
            exceptions: [
                'Original shipping fees non-refundable',
                'Digital products within 14 days only',
                'Custom items non-refundable'
            ]
        },
        faqs: [
            {
                question: "Is my payment information secure?",
                answer: "Yes, we use 256-bit SSL encryption and never store your full payment details."
            },
            {
                question: "Can I change my payment method after ordering?",
                answer: "Payment methods can't be changed after order confirmation, but you can cancel and reorder."
            },
            {
                question: "Why is there a pending charge on my card?",
                answer: "This is a temporary authorization to verify funds and will disappear within 3-5 business days."
            }
        ]
    };

    return (
        <div className="max-w-4xl mx-auto px-2 py-6 sm:px-3 lg:px-1 sm-mt-[10px]">
            <div className="text-left mb-2">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Payment & Refund Details</h1>
                <p className="text-lg text-gray-600">Transparent information about our payment processes</p>
            </div>

            {/* Container with fixed height and custom scrollbar */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-[calc(100vh-180px)] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] overflow-y-auto custom-scrollbar p-4 sm:p-6 md:p-8">                    {/* Payment Process Section */}
                    <section className="mb-12">
                        <div className="flex items-start mb-6">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                                <FaCreditCard className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Process</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-medium text-gray-900">Authorization</h3>
                                            <p className="mt-1 text-gray-600">
                                                Your payment method is authorized for the order amount immediately upon checkout. This temporary hold ensures funds are available.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">2</div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-medium text-gray-900">Processing</h3>
                                            <p className="mt-1 text-gray-600">
                                                Payment is processed when your order ships. Typical processing times:
                                            </p>
                                            <ul className="mt-2 space-y-1 text-gray-600">
                                                {Object.entries(paymentData.processingTimes).map(([method, time]) => (
                                                    <li key={method} className="flex">
                                                        <span className="font-medium w-32 capitalize">{method}:</span>
                                                        <span>{time}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">3</div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-medium text-gray-900">Security</h3>
                                            <p className="mt-1 text-gray-600 flex items-start">
                                                <FaShieldAlt className="flex-shrink-0 mt-1 mr-2 text-blue-500" />
                                                All transactions are encrypted with 256-bit SSL and processed through PCI-DSS compliant systems.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 mt-6">
                            <h3 className="font-medium text-blue-800 mb-3">Accepted Payment Methods</h3>
                            <div className="flex flex-wrap gap-3">
                                {paymentData.acceptedMethods.map(method => (
                                    <div key={method} className="bg-white px-4 py-2 rounded-md border border-gray-200 text-sm font-medium">
                                        {method}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Refund Process Section */}
                    <section className="mb-12">
                        <div className="flex items-start mb-6">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                                <FaExchangeAlt className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Refund Policy</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">1</div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-medium text-gray-900">Eligibility</h3>
                                            <p className="mt-1 text-gray-600">
                                                Most items can be returned within {paymentData.refundPolicy.timeframe} of delivery for a full refund. Some exclusions apply:
                                            </p>
                                            <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
                                                {paymentData.refundPolicy.exceptions.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">2</div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-medium text-gray-900">Processing</h3>
                                            <p className="mt-1 text-gray-600">
                                                Refunds are processed within {paymentData.refundPolicy.processing}. The funds will return to your original payment method.
                                            </p>
                                            <div className="mt-3 flex items-center text-sm text-gray-500">
                                                <FaClock className="mr-2 text-amber-500" />
                                                Bank transfers may take 5-10 additional business days to appear in your account
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">3</div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-medium text-gray-900">Returns</h3>
                                            <p className="mt-1 text-gray-600">
                                                To initiate a return, visit our Returns Center with your order number. You'll receive a prepaid shipping label for eligible returns.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
                                <FaQuestionCircle className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                                <div className="space-y-6">
                                    {paymentData.faqs.map((faq, index) => (
                                        <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                            <h3 className="font-medium text-gray-900">{faq.question}</h3>
                                            <p className="mt-2 text-gray-600">{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>


        </div>
    );
};

export default PaymentDetailsPage;