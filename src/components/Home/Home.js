import React from 'react';
import Hero from '../Hero/Hero';
import Features from '../Features/Features';
import Testimonials from '../Testimonials/Testimonials';
import CartBody from '../CartBody/CartBody';

const Home = () => {
    return (
        <div>
            <Hero />
            <Features />
            <div className="main-container container">
                <div className="activityscarts-maindiv">
                    {/* CartBody components will be rendered here */}
                </div>
            </div>
            <Testimonials />
        </div>
    );
};

export default Home; 