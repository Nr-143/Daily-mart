import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

const App = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <Router>
            <Navbar setSearchQuery={setSearchQuery} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListingPage searchQuery={searchQuery} />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/wishlist" element={<div>Wishlist Page</div>} />
                <Route path="/cart" element={<div>Cart Page</div>} />
                <Route path="/login" element={<div>Login Page</div>} />
            </Routes>
        </Router>
    );
};

export default App;