import FeatureCard from "./FeatureCard";
import React from "react";
import { Link } from "react-router-dom";
import { features } from "../constants/features";

const Home = () => {
  return (
    <>

      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            Empower Your Financial Journey
          </h1>
           
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl lg:max-w-3xl mx-auto">
            Unlock the power of smart wallet management to achieve your financial goals effortlessly.
          </p>
   <Link
            to="/login"
            className="bg-white text-blue-600 hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold shadow-lg transition-transform duration-300 hover:scale-105"
          >
            Get Started
          </Link>
        </div>
              

      </section>
      


      <section className="py-16 md:py-20 bg-gray-100">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>


      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          
            <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-lg">
              <p className="text-gray-600 text-base md:text-lg italic mb-6">
                "This app completely changed the way I manage my finances. Simple, intuitive, and powerful!"
              </p>
              <h3 className="text-gray-800 font-bold text-lg md:text-xl">- Alex Johnson</h3>
            </div>
     
          </div>
        </div>
      </section>


      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12 md:py-16 rounded-tl-3xl rounded-tr-3xl">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances smarter and easier.
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold shadow-lg transition-transform duration-300 hover:scale-105"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
