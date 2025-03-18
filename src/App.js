import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import ProductListingPage from "../src/pages/ProductListingPage";

const App = () => (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/wishlist" element={<div>Wishlist Page</div>} />
            <Route path="/cart" element={<div>Cart Page</div>} />
            <Route path="/login" element={<div>Login Page</div>} />
            <Route path="/products" element={<ProductListingPage />} />

        </Routes>
    </Router>
);

export default App;
