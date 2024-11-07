import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center py-10">
      <h1 className="text-center text-3xl font-extrabold text-gray-200 mb-6">
        Welcome Roxiler Systems
      </h1>
      
      <div className="flex justify-evenly w-full max-w-4xl my-6 space-x-4">
        <Link
          to={"/transactions"}
          className="bg-gray-800 text-gray-200 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
        >
          Transactions
        </Link>

        <Link
          to={"/statistics"}
          className="bg-gray-800 text-gray-200 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
        >
          Statistics
        </Link>

        <Link
          to={"/pieChartStatistics"}
          className="bg-gray-800 text-gray-200 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
        >
          Pie Chart
        </Link>

        <Link
          to={"/barChartStatistics"}
          className="bg-gray-800 text-gray-200 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
        >
          Bar Chart
        </Link>
      </div>
    </div>
  );
};
