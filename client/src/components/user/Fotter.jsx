import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-bgPrimary text-white w-screen py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Left Section */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-xl font-bold">OSM Memory</h3>
            <p className="text-sm mb-4">Make your memory awesome!!!</p>
            {/* Social Media Links */}
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition"
              >
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <h4 className="font-semibold mb-2">Contact Us</h4>
            <p>(515)-271-1400 or (800)-240-2767</p>
            <p>
              <a href="mailto:info@dmu.edu" className="underline">
                info@dmu.edu
              </a>
            </p>
            <p>
              <a href="mailto:dmuadmit@dmu.edu" className="underline">
                dmuadmit@dmu.edu
              </a>
            </p>
          </div>

          {/* Address */}
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <h4 className="font-semibold mb-2">Address</h4>
            <p>3200 Grand Avenue</p>
            <p>Des Moines, IA 50312</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white pt-4 flex flex-col md:flex-row justify-between items-center text-center">
          {/* Copyright */}
          <p className="text-sm">
            Copyright © 2024 Osm Memory|{" "}
            <a href="#" className="underline">
              Title IX
            </a>{" "}
            |{" "}
            <a href="#" className="underline">
              Legal Information
            </a>{" "}
            |{" "}
            <a href="#" className="underline">
              Consumer Information
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
