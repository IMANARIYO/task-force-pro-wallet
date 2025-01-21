import AccountManagement from "./dashboard/manageAccounts/AccountManagement.js";
import CategoryManagement from "./dashboard/manageCategories/CategoryManagement .js";
import DashBoardHome from "./dashboard/DashBoardHome.js";
import DashboardStructure from "./dashboard/DashboardStructure.js";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Navigation from "./components/Navigation.js";
import ProtectedRoute from "./ProtectedRouotes.js";
import React from "react";
import Register from "./components/Register.js";
import Reports from "./dashboard/Reports.js";
import TransactionManagement from "./dashboard/managetransactions/TransactionManagement.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
   
        <Route
          path="/"
          element={
            <>
              <Navigation />
              <Home />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navigation />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navigation />
              <Register />
            </>
          }
        />

    
        <Route
          path="/home/*"
          element={<ProtectedRoute element={<DashboardStructure />} />}
        >
          <Route index element={<DashBoardHome />} />
          <Route path="accounts" element={<AccountManagement />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="transactions" element={<TransactionManagement />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
