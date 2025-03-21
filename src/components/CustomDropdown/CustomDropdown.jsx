import React, { useState, useRef, useEffect } from "react";

const CustomDropdown = ({ label, options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOptionClick = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className="relative mb-4" ref={dropdownRef}>
            <label className="block text-gray-800 font-semibold mb-1">{label}</label>
            <div
                className="w-full p-3 border rounded-md cursor-pointer flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-gray-700">{options.find(opt => opt.value === value)?.label || "All"}</span>
                <span className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>▼</span>
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1 transition-all duration-200 origin-top scale-y-100">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="p-3 text-gray-700 hover:bg-gray-200 transition cursor-pointer"
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
