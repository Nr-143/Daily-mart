import React, { useState } from "react";
import { FiPhone, FiMail, FiMessageSquare, FiChevronDown, FiChevronUp } from "react-icons/fi";

const HelpSupport = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqData = [
        { question: "How can I track my order?", answer: "You can track your order from 'My Orders' in your profile." },
        { question: "What payment methods do you accept?", answer: "We accept Credit/Debit Cards, UPI, Net Banking, and COD." },
        { question: "How do I return an item?", answer: "Initiate returns from 'My Orders' within 7 days of delivery." },
        { question: "What are your delivery timings?", answer: "We deliver daily from 8 AM to 10 PM." },
        { question: "Can I modify my order after placing it?", answer: "You can modify your order within 30 minutes of placement." },
        { question: "How do I apply a discount coupon?", answer: "Enter the coupon code at checkout before payment." },
    ];

    const toggleFAQ = (index) => setActiveIndex(activeIndex === index ? null : index);

    const handleContactClick = (method) => {
        // This would open your chat popup/page in a real implementation
        console.log(`Initiate ${method} contact`);
        // window.openChatPopup() or similar function would go here
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-20 md:pb-8">
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* FAQ Section - Takes 2/3 width on desktop, full on mobile */}
                <div className="lg:col-span-2 bg-white shadow-lg rounded-xl p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                        {faqData.map((item, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200"
                            >
                                <button
                                    className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className="font-medium text-gray-800">{item.question}</span>
                                    {activeIndex === index ? (
                                        <FiChevronUp className="text-blue-500" />
                                    ) : (
                                        <FiChevronDown className="text-gray-500" />
                                    )}
                                </button>
                                {activeIndex === index && (
                                    <div className="p-4 text-gray-600 bg-gray-50">{item.answer}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section - Takes 1/3 width on desktop, full on mobile */}
                <div className="space-y-6">
                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Options</h3>
                        <div className="space-y-4">
                            {/* Phone Option */}
                            <button
                                onClick={() => handleContactClick('phone')}
                                className="w-full flex items-start p-4 border border-gray-200 rounded-lg hover:border-blue-400 transition text-left"
                            >
                                <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                                    <FiPhone className="text-blue-600 text-xl" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800">Call Support</h4>
                                    <p className="text-gray-600">+91 98765 43210</p>
                                    <p className="text-sm text-gray-500">24/7 available</p>
                                </div>
                            </button>

                            {/* Email Option */}
                            <button
                                onClick={() => handleContactClick('email')}
                                className="w-full flex items-start p-4 border border-gray-200 rounded-lg hover:border-green-400 transition text-left"
                            >
                                <div className="bg-green-100 p-1 rounded-full mr-4 flex-shrink-0">
                                    <FiMail className="text-green-600 text-xl" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800">Email Us</h4>
                                    <p className="text-gray-600">support@dailymart.com</p>
                                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                                </div>
                            </button>

                            {/* Live Chat Option */}
                            <button
                                onClick={() => handleContactClick('chat')}
                                className="w-full flex items-start p-4 border border-gray-200 rounded-lg hover:border-purple-400 transition text-left"
                            >
                                <div className="bg-purple-100 p-3 rounded-full mr-4 flex-shrink-0">
                                    <FiMessageSquare className="text-purple-600 text-xl" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800">Live Chat</h4>
                                    <p className="text-sm text-gray-500">9 AM - 9 PM daily</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpSupport;