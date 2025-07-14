import React, { useContext, useEffect } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useClerk,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";
import coin from "../assets/coin.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();

  const { credit, loadcreditsData, currentPlan } = useContext(AppContext);

  //   useEffect(() => {
  //     loadcreditsData();
  //   }, []);

  useEffect(() => {
    if (isSignedIn) {
      loadcreditsData();
    }
  }, [isSignedIn]);
  return (
    <>
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center">
                  <svg
                    className="h-8 w-8 text-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="ml-2 text-xl font-bold text-gray-900">
                    BG Remover Pro
                  </span>
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <a
                href="#features"
                className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Testimonials
              </a>
            </div>
            <div className="flex items-center">
              {isSignedIn ? (
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
                    <img
                      src={coin}
                      alt="Credits"
                      className="h-4 w-4 object-contain" // Adjusted size to be smaller
                    />
                    <span className="text-gray-500 hidden sm:inline">
                      Credits
                    </span>
                    <span className="font-bold text-blue-600">: {credit}</span>
                  </button>
                  <UserButton />
                </div>
              ) : (
                <button
                  onClick={() => openSignIn({})}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
