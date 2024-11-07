import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Statistics = () => {
  const [month, setMonth] = useState("");
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const fetchStatistics = async () => {
    if (!month) return; 

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/statistics/${month}`
      );
      setStatistics(response?.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics(); 
  }, [month]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-purple-50 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Transaction Statistics
        </h1>
        <p className="text-gray-600">Select month name from dropdown</p>
      </header>

      <div className="mb-6">
        <select
          value={month}
          onChange={handleMonthChange}
          className="p-3 rounded-lg shadow-md text-gray-700 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
        >
          <option value="">Select Month</option>
          <option value="1">Jan</option>
          <option value="2">Feb</option>
          <option value="3">Mar</option>
          <option value="4">Apr</option>
          <option value="5">May</option>
          <option value="6">Jun</option>
          <option value="7">Jul</option>
          <option value="8">Aug</option>
          <option value="9">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        statistics && (
          <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
            <p className="text-xl font-semibold text-gray-700 mb-4">
              Statistics for {getMonthName(month)}
            </p>
            <div className="space-y-4">
              <p className="text-lg">
                <span className="font-medium text-gray-600">Total Sale:</span> $
                {statistics?.totalSales?.toLocaleString()}
              </p>
              <p className="text-lg">
                <span className="font-medium text-gray-600">
                  Total Sold Items:
                </span>{" "}
                {statistics?.soldItems}
              </p>
              <p className="text-lg">
                <span className="font-medium text-gray-600">
                  Total Unsold Items:
                </span>{" "}
                {statistics?.unsoldItems}
              </p>
            </div>
          </div>
        )
      )}
      <div className="flex justify-center mt-6 gap-4">
        <Link
          to={"/"}
          className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 disabled:opacity-50"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

const getMonthName = (monthNumber) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthNumber - 1] || "";
};

export default Statistics;
