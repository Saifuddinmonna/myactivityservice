import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">Transform Your Life Through Fitness</h1>
                <p className="hero-subtitle">Join our community of fitness enthusiasts and start your journey to a healthier lifestyle</p>
                <div className="hero-stats">
                    <div className="stat-item">
                        <i className="fas fa-users"></i>
                        <h3>10K+</h3>
                        <p>Active Members</p>
                    </div>
                    <div className="stat-item">
                        <i className="fas fa-dumbbell"></i>
                        <h3>50+</h3>
                        <p>Workout Programs</p>
                    </div>
                    <div className="stat-item">
                        <i className="fas fa-star"></i>
                        <h3>4.8</h3>
                        <p>User Rating</p>
                    </div>
                </div>
                <button className="hero-cta">Get Started Today</button>
            </div>
        </div>
    );
};

export default Hero; 