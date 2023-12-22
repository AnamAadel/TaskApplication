import React from 'react';
import { Link } from 'react-router-dom';
// Import Swiper React components

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

// import required modules



function Hero() {
  return (
    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1668605335560-b0786d21fd85?q=80&w=1457&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-5xl font-bold">Boost Productivity with Our Task Management Solution</h1>
          <p className="mb-5">Take control of your to-do list and achieve your goals faster than ever.</p>
          <Link to="/dashboard" className="btn btn-white">Let’s Explore”</Link>
        </div>
      </div>
    </div>
  )
}

export default Hero