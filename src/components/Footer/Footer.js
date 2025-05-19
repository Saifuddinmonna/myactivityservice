import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>My Activities Services</h3>
                    <p>Your one-stop solution for fitness and wellness activities. We help you stay fit and healthy with our curated exercise programs.</p>
                </div>
                
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#activities">Activities</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Info</h4>
                    <ul className="contact-info">
                        <li><i className="fas fa-map-marker-alt"></i> Mymensingh, Bangladesh</li>
                        <li><i className="fas fa-phone"></i> +880 1234-567890</li>
                        <li><i className="fas fa-envelope"></i> info@myactivities.com</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <a href="#" className="social-link"><i className="fab fa-facebook"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} My Activities Services. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer; 