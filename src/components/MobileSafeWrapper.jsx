// components/seller/Shared/MobileSafeWrapper.jsx
import React from 'react';

const MobileSafeWrapper = ({ children }) => {
    return (
        <div className="pt-[48px] pb-[48px] px-4 sm:px-6 md:px-8">
            {children}
        </div>
    );
};

export default MobileSafeWrapper;
