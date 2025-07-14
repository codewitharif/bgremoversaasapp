import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import { ToastContainer } from "react-toastify";
import { SignIn } from "@clerk/clerk-react";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <ToastContainer />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/buy-credit" element={<BuyCredit />} />
          <Route
            className="flex justify-center items-center"
            path="/sign-in"
            element={<SignIn routing="path" path="/sign-in" />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
