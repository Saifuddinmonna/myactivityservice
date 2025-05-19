import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Fitness Enthusiast",
            image: "https://randomuser.me/api/portraits/women/1.jpg",
            text: "The variety of activities and professional trainers have helped me achieve my fitness goals faster than I expected!"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Yoga Practitioner",
            image: "https://randomuser.me/api/portraits/men/2.jpg",
            text: "The meditation and yoga sessions have transformed not just my physical health, but my mental wellbeing too."
        },
        {
            id: 3,
            name: "Emma Davis",
            role: "CrossFit Athlete",
            image: "https://randomuser.me/api/portraits/women/3.jpg",
            text: "The CrossFit program is challenging but incredibly rewarding. The community here is amazing!"
        }
    ];

    return (
        <section className="testimonials-section">
            <h2 className="section-title">What Our Members Say</h2>
            <div className="testimonials-container">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="testimonial-card">
                        <div className="testimonial-image">
                            <img src={testimonial.image} alt={testimonial.name} />
                        </div>
                        <div className="testimonial-content">
                            <p className="testimonial-text">{testimonial.text}</p>
                            <div className="testimonial-author">
                                <h4>{testimonial.name}</h4>
                                <p>{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials; 