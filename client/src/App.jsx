import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import { ToastContainer } from "react-toastify";
import { SignIn } from "@clerk/clerk-react";
import Pricing from "./components/Pricing";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <ToastContainer />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/buy-credit" element={<Pricing />} />
          <Route
            path="/sign-in"
            element={
              <div className="flex justify-center items-center min-h-screen">
                <SignIn routing="path" path="/sign-in" />
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
