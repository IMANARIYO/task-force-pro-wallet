import React from "react";

// src/pages/About.jsx

const About = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">About TaskForce Wallet</h2>
        <p className="text-xl mb-4">
          TaskForce Wallet is a web application designed to help users efficiently track their expenses and income.
          You can manage multiple accounts, set budgets, and receive notifications when you exceed your budget limits.
        </p>
        <h3 className="text-2xl font-semibold mb-2">Key Features:</h3>
        <ul className="list-disc list-inside">
          <li>Track transactions from different accounts (bank, mobile money, cash, etc.)</li>
          <li>Generate reports based on time gaps</li>
          <li>Set and track your budget</li>
          <li>Link expenses to categories and subcategories</li>
          <li>Visualize transaction summaries</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
