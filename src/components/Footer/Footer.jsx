import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-midnight-blue text-white text-center p-4">
            <p>&copy; {new Date().getFullYear()} DailyMart. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;
