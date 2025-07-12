import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Result = () => {
  const { resultImage, image, isLoading, isProcessing } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleDownload = () => {
    if (!resultImage) return;

    const link = document.createElement("a");
    link.href = resultImage;
    link.download = "background-removed.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTryAnother = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your <span className="text-indigo-600">Background-Free</span> Image
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Compare the original and processed images below
          </p>
        </div>

        {/* Image Comparison Section */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* Original Image */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Original Image
                </h3>
                <span className="px-2 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full">
                  Before
                </span>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Original"
                    className="w-full h-auto object-contain max-h-96 mx-auto"
                  />
                ) : (
                  <div className="h-96 flex items-center justify-center text-gray-500">
                    No original image found
                  </div>
                )}
              </div>
            </div>

            {/* Result Image */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Processed Image
                </h3>
                <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                  After
                </span>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-checkerboard">
                {isProcessing ? (
                  <Loader />
                ) : resultImage ? (
                  <img
                    src={resultImage}
                    alt="Background Removed"
                    className="w-full h-auto object-contain max-h-96 mx-auto"
                  />
                ) : (
                  <div className="h-96 flex items-center justify-center text-gray-500">
                    {image ? "Processing failed" : "No image to process"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {resultImage && (
            <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={handleTryAnother}
                className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="-ml-1 mr-3 h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Try Another Image
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="-ml-1 mr-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Result
              </button>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-indigo-50 rounded-lg p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-indigo-800">Pro Tip</h3>
              <div className="mt-2 text-sm text-indigo-700">
                <p>
                  For best results with transparent PNGs, use the image on a
                  light background. Need to edit further?
                  <a
                    href="#"
                    className="font-medium underline text-indigo-600 hover:text-indigo-500 ml-1"
                  >
                    Try our advanced editor
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkerboard background pattern for transparent images */}
      <style jsx>{`
        .bg-checkerboard {
          background-image: linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
            linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
            linear-gradient(-45deg, transparent 75%, #e5e7eb 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
      `}</style>
    </div>
  );
};

export default Result;
