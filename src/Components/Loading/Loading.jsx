import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce animation-delay-400"></div>
          </div>
          <div className="text-lg font-semibold text-gray-700">Loading...</div>
        </div>
      </div>
    </>
  );
};

export default Loading;
