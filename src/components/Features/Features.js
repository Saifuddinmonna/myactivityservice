import React from 'react';
import './Features.css';

const Features = () => {
    const features = [
        {
            id: 1,
            title: "Personalized Workout Plans",
            description: "Get customized workout routines based on your fitness level, goals, and preferences.",
            icon: "fas fa-dumbbell",
            color: "#0d6efd"
        },
        {
            id: 2,
            title: "Progress Tracking",
            description: "Monitor your fitness journey with detailed progress reports and analytics.",
            icon: "fas fa-chart-line",
            color: "#198754"
        },
        {
            id: 3,
            title: "Nutrition Guidance",
            description: "Access personalized meal plans and nutrition advice to complement your workouts.",
            icon: "fas fa-apple-alt",
            color: "#dc3545"
        },
        {
            id: 4,
            title: "Live Classes",
            description: "Join live workout sessions with professional trainers from anywhere.",
            icon: "fas fa-video",
            color: "#6f42c1"
        },
        {
            id: 5,
            title: "Community Support",
            description: "Connect with like-minded fitness enthusiasts and share your journey.",
            icon: "fas fa-users",
            color: "#fd7e14"
        },
        {
            id: 6,
            title: "Expert Trainers",
            description: "Get guidance from certified fitness professionals and nutritionists.",
            icon: "fas fa-user-tie",
            color: "#20c997"
        }
    ];

    return (
        <section className="features-section">
            <div className="features-header">
                <h2>Our Premium Features</h2>
                <p>Everything you need to achieve your fitness goals</p>
            </div>
            <div className="features-grid">
                {features.map((feature) => (
                    <div key={feature.id} className="feature-card" style={{'--feature-color': feature.color}}>
                        <div className="feature-icon">
                            <i className={feature.icon}></i>
                        </div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                        <button className="feature-btn">Learn More</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features; 