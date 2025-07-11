import React from "react";

const Testimonial = () => {
  return (
    <div id="testimonials" className="py-12 bg-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-200 font-semibold tracking-wide uppercase">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Trusted by thousands of creators
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                  alt="Sarah Johnson"
                />
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Sarah Johnson
                  </h3>
                  <p className="text-indigo-600">E-commerce Store Owner</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-base text-gray-500">
                  "This tool has saved me countless hours of editing product
                  photos. The results are perfect every time and my conversion
                  rates have improved significantly."
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                  alt="Michael Chen"
                />
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Michael Chen
                  </h3>
                  <p className="text-indigo-600">Marketing Director</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-base text-gray-500">
                  "We use BG Remover Pro for all our marketing materials. The
                  batch processing feature is a game-changer when we need to
                  prepare hundreds of images for campaigns."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
