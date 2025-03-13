import React from 'react';
import HeroBanner from '../components/HeroBanner/HeroBanner.jsx';
import CategoryCards from '../components/CategoryCards/CategoryCards.jsx';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts.jsx';
import SpecialOffers from '../components/SpecialOffers/SpecialOffers.jsx';
import AboutUs from '../components/AboutUs/AboutUs.jsx';
import Testimonials from '../components/Testimonials/Testimonials.jsx';
import Footer from '../components/Footer/Footer.jsx';
import NewArrivals from '../components/NewArrivals/NewArrivals.jsx';
import TrendingProducts from '../components/TrendingProducts/TrendingProducts.jsx';

const HomePage = () => {
    return (
        <div className="bg-cloud-white min-h-screen">
            <HeroBanner />
            <div className="container mx-auto px-4 py-8">
                <CategoryCards />
                <FeaturedProducts />
                <TrendingProducts />
                <NewArrivals />
                <SpecialOffers />
                <AboutUs />
                <Testimonials />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
