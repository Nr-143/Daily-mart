import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import WishlistPage from './pages/WishlistPage';
import CartPage from "./pages/CartPage"
import { WishlistProvider } from "./context/WishlistContext";
import Settings from "./components/Settings/Settings";


const App = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
     <WishlistProvider>
        <Router>

            <Navbar setSearchQuery={setSearchQuery} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListingPage searchQuery={searchQuery} />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/category/:category" element={<ProductListingPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/settings" element={<Settings />} />
                {/* <Route path="/login" element={<Login />} />           */}
              </Routes>
        </Router>
    </WishlistProvider>

    );
};

export default App;