import React, { useState } from "react";
import { features } from "./constants/features";

 
const Login = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Sign in to your account</h2>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <input
              type="email"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email address"
            />
            <input
              type="password"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign in
          </button>
        </form>
        <button
          onClick={onBackToHome}
          className="mt-4 w-full text-center text-blue-600 hover:text-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

 
const Register = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Create your account</h2>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <input
              type="text"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full name"
            />
            <input
              type="email"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email address"
            />
            <input
              type="password"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Create Account
          </button>
        </form>
        <button
          onClick={onBackToHome}
          className="mt-4 w-full text-center text-blue-600 hover:text-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

 
const Navigation = ({ onNavigate, currentPage }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => onNavigate('home')} className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">SmartWallet</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('login')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

 
const Home = ({ onNavigate }) => {
  return (
    <>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
            Smart Wallet Management
          </h1>
          <p className="text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Manage your finances with ease, keeping track of all your spending
            and savings.
          </p>
          <button
            onClick={() => onNavigate('register')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 rounded-full bg-blue-100 text-blue-600 text-4xl">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-16 mt-16 rounded-tl-3xl rounded-tr-3xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances
            smarter and easier.
          </p>
          <button
            onClick={() => onNavigate('register')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition duration-300 hover:scale-105"
          >
            Create Free Account
          </button>
        </div>
      </div>
    </>
  );
};

 
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation onNavigate={handleNavigate} currentPage={currentPage} />
      {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
      {currentPage === 'login' && <Login onBackToHome={() => handleNavigate('home')} />}
      {currentPage === 'register' && <Register onBackToHome={() => handleNavigate('home')} />}
    </div>
  );
};

export default App;