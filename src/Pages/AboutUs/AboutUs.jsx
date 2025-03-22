import React from "react";
import { FaLeaf, FaShippingFast, FaUsers } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-white text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1623446713256-599eecb668ac?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-xl">
          <h1 className="text-4xl font-bold">About E-Cloth Store</h1>
          <p className="mt-2 text-lg">Where Style Meets Sustainability</p>
        </div>
      </div>

      {/* Company Story */}
      <div className="container mx-auto px-6 py-12 text-center max-w-4xl">
        <h2 className="text-3xl font-semibold">Our Story</h2>
        <p className="mt-4 text-lg text-gray-600">
          eCloth Store was founded with the mission to bring high-quality,
          sustainable, and stylish fashion to everyone. Our journey started in a
          small studio, and today, we are proud to serve thousands of customers
          worldwide with eco-friendly fashion choices.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold">Our Mission</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-6">
          <div className="w-80 p-6 bg-gray-100 rounded-lg shadow-md">
            <FaLeaf className="text-green-600 text-4xl mx-auto" />
            <h3 className="mt-4 text-xl font-semibold">Sustainability</h3>
            <p className="mt-2 text-gray-600">
              We prioritize eco-friendly materials and ethical production.
            </p>
          </div>
          <div className="w-80 p-6 bg-gray-100 rounded-lg shadow-md">
            <FaShippingFast className="text-blue-600 text-4xl mx-auto" />
            <h3 className="mt-4 text-xl font-semibold">Fast Delivery</h3>
            <p className="mt-2 text-gray-600">
              We ensure quick and reliable shipping worldwide.
            </p>
          </div>
          <div className="w-80 p-6 bg-gray-100 rounded-lg shadow-md">
            <FaUsers className="text-purple-600 text-4xl mx-auto" />
            <h3 className="mt-4 text-xl font-semibold">Community</h3>
            <p className="mt-2 text-gray-600">
              Building a strong and inclusive fashion-loving community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
