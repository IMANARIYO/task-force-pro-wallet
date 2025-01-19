import AccountManagement from "./dashboard/manageAccounts/AccountManagement.js";
import CategoryManagement from "./dashboard/manageCategories/CategoryManagement .js";
import DashBoardHome from "./dashboard/DashBoardHome.js";
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
      <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white'>
        {/* Navigation is always visible */}
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/home'
            element={<ProtectedRoute element={<DashBoardHome />} />}
          />
          <Route
            path='/accounts'
            element={<ProtectedRoute element={<AccountManagement />} />}
          />
          <Route
            path='/categories'
            element={<ProtectedRoute element={<CategoryManagement />} />}
          />
          <Route
            path='/transactions'
            element={<ProtectedRoute element={<TransactionManagement />} />}
          />
          <Route
            path='/reports'
            element={<ProtectedRoute element={<Reports />} />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
