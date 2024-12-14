import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../components/user/Navbar";
import Testimonial from "../components/user/Testimonial";
import Footer from "../components/user/Fotter";
// Import the homepage image
import homepageImage from "../assets/heroImage.webp"; // Adjust the path based on your project structure

const Home = () => {
  const { user } = useSelector((state) => state.user); // Get user state from Redux

  return (
    <div
      className="bg-offWhite flex flex-col min-h-screen" // Flex container and full-height screen
    >
      <Navbar />
      <div className="flex-grow px-4 flex flex-col justify-center items-center bg-offWhite ">
        {/* Section with Image and Text */}
        <div className="relative w-full flex justify-center mt-6">
          <img
            src={homepageImage}
            alt="Homepage illustration"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
          {/* Text Overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-bold text-3xl md:text-4xl px-6 py-4 bg-black bg-opacity-50 rounded-lg shadow-lg">
            Welcome to Osm-Memory{user ? `, ${user.firstName}` : ""}! 😊
          </div>
        </div>

        <div className="w-screen overflow-x-auto bg-offWhite mt-5">
          <Testimonial />
        </div>
      </div>
      <Footer /> {/* Footer aligned at the bottom */}
    </div>
  );
};

export default Home;
