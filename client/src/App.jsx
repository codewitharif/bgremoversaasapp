import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
            <Route path="/buy-credit" element={<BuyCredit />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
