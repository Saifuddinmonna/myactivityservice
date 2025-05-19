import React from 'react';
import FitnessBlog from '../FitnessBlog/FitnessBlog';

const Blog = () => {
    return (
        <div className="blog-page">
            <div className="container py-5">
                <h1 className="text-center mb-5">Fitness Blog</h1>
                <FitnessBlog />
            </div>
        </div>
    );
};

export default Blog; 