import About from "./pages/About";
import Budget from "./components/Budget";
import Contact from "./pages/Contact";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import Reports from "./components/Report";
import Transactions from "./components/Transactions";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="transactions" element={<Transactions />} />
          <Route path="budget" element={<Budget />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
