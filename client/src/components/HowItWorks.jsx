import React from "react";

const HowItWorks = () => {
  return (
    <div id="how-it-works" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            How It Works
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Remove backgrounds in 3 simple steps
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <span className="text-lg font-bold">1</span>
              </div>
              <div className="mt-5 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Upload Your Image
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Drag and drop your image or click to browse files from your
                  device.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <span className="text-lg font-bold">2</span>
              </div>
              <div className="mt-5 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  AI Processing
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Our AI automatically removes the background in seconds with
                  perfect precision.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <span className="text-lg font-bold">3</span>
              </div>
              <div className="mt-5 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Download Result
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Preview, make adjustments if needed, and download your image
                  with transparent background.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="rounded-lg shadow-xl overflow-hidden">
            <img
              className="w-full"
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              alt="Before and after background removal"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
