import React, { useState } from "react";

const CustomDropdown = ({ label, options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className="relative mb-4">
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <div
                className="w-full p-2 border rounded-md cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{value || "All"}</span>
                <span>{isOpen ? "▲" : "▼"}</span>
            </div>
            {isOpen && (
                <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;