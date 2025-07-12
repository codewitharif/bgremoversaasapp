import React from "react";

const Loader = () => {
  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    //   <div className="bg-white p-6 rounded-lg shadow-xl text-center">
    //     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
    //     <p className="mt-4 text-gray-700">Removing background...</p>
    //     <p className="text-sm text-gray-500">This may take a few seconds</p>
    //   </div>
    // </div>

    <div className="w-full h-96 flex flex-col items-center justify-center bg-white bg-opacity-70">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      <p className="mt-4 text-gray-700">Removing background...</p>
      <p className="text-sm text-gray-500">This may take a few seconds</p>
    </div>
  );
};

export default Loader;
