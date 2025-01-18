import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
 return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold">Welcome to TaskForce Wallet</h1>
      <p className="mt-4">Manage your finances easily.</p>
      <NavLink
        to="/dashboard"
        className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
      >
        Go to Dashboard
      </NavLink>
    </div>
  );
}

export default Home;
