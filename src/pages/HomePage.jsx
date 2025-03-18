import React, { lazy, Suspense } from 'react';
import HeroBanner from '../components/HeroBanner/HeroBanner.jsx';
import CategoryCards from '../components/CategoryCards/CategoryCards.jsx';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts.jsx';
import SpecialOffers from '../components/SpecialOffers/SpecialOffers.jsx';
import Footer from '../components/Footer/Footer.jsx';
import NewArrivals from '../components/NewArrivals/NewArrivals.jsx';
import TrendingProducts from '../components/TrendingProducts/TrendingProducts.jsx';

// Lazy Load Components
const Testimonials = lazy(() => import('../components/Testimonials/Testimonials.jsx'));
const AboutUs = lazy(() => import('../components/AboutUs/AboutUs.jsx'));

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
                {/* Wrap lazy-loaded components inside Suspense */}
                <Suspense fallback={<div className="text-center py-4">Loading...</div>}>
                    <AboutUs />
                    <Testimonials />
                </Suspense>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
