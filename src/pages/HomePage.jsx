import React from 'react';
import HeroBanner from '../components/HeroBanner/HeroBanner.jsx';
import CategoryCards from '../components/CategoryCards/CategoryCards.jsx';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts.jsx';
import SpecialOffers from '../components/SpecialOffers/SpecialOffers.jsx';
import AboutUs from '../components/AboutUs/AboutUs.jsx';
import Testimonials from '../components/Testimonials/Testimonials.jsx';
import Footer from '../components/Footer/Footer.jsx';

const HomePage = () => {
    return (
        <div className="bg-cloud-white min-h-screen">
            <HeroBanner />
            <h1>h</h1>
            <div className="container mx-auto px-4 py-8">
                <CategoryCards />
                <FeaturedProducts />
                <SpecialOffers />
                <AboutUs />
                <Testimonials />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
