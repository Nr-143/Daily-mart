import React, { useState, useEffect } from "react";
import LoaderWithMessage from "./LoaderWithMessage"; // Import the loader component

const TestComponent = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a 1-minute loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 60000);

        return () => clearTimeout(timer); // Cleanup timeout when component unmounts
    }, []);

    if (loading) return <LoaderWithMessage />; // Show loader for 1 min

    return (
        <div className="text-center p-8">
            <h1 className="text-2xl font-bold">✅ Content Loaded Successfully!</h1>
            <p className="text-gray-600">This is the actual content after the loader.</p>
        </div>
    );
};

export default TestComponent;
