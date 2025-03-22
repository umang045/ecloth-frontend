import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold">E-Cloth Store</h2>
            <p className="mt-2 text-gray-400">
              Elevate your style with the best fashion trends.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="text-gray-200 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-200 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/aboutUs" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/ContactUs"
                  className="text-gray-300 hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <p className="text-gray-400">📍 Kargil , Ahmedabad</p>
            <p className="text-gray-400">📞 +91 9099769988</p>
            <p className="text-gray-400">✉ support@eclothstore.com</p>
          </div>
        </div>

        {/* Social Icons & Copyright */}
        <div className="mt-10 flex justify-between items-center border-t border-gray-700 pt-5">
          <p className="text-gray-400">
            © 2025 eCloth Store. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 bg-gray-700 rounded-full hover:bg-red-500"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-700 rounded-full hover:bg-red-500"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-700 rounded-full hover:bg-red-500"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-700 rounded-full hover:bg-red-500"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
