import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartStatistics = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [chartData, setChartData] = useState(null);

  const months = [
    { name: "January", value: "1" },
    { name: "February", value: "2" },
    { name: "March", value: "3" },
    { name: "April", value: "4" },
    { name: "May", value: "5" },
    { name: "June", value: "6" },
    { name: "July", value: "7" },
    { name: "August", value: "8" },
    { name: "September", value: "9" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ];

  const fetchChartData = async (month) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/bar-chart/${month}`
      );
      setChartData(response.data);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
    if (month) {
      fetchChartData(month);
    }
  };

  const data = {
    labels: chartData ? chartData.map((entry) => entry.range) : [],
    datasets: [
      {
        label: "Number of Items",
        data: chartData ? chartData.map((entry) => entry.count) : [],
        backgroundColor: "rgba(102, 51, 153, 0.6)", 
        borderColor: "rgba(102, 51, 153, 1)", 
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#4B5563" } }, 
      title: {
        display: true,
        text: `Price Range Distribution for ${
          months[selectedMonth - 1]?.name || ""
        }`,
        color: "#4B5563", 
      },
    },
    scales: {
      x: { ticks: { color: "#4B5563" }, grid: { color: "rgba(0, 0, 0, 0.1)" } },
      y: { ticks: { color: "#4B5563" }, grid: { color: "rgba(0, 0, 0, 0.1)" } },
    },
  };

  return (
    <div className="flex flex-col items-center bg-purple-50 min-h-screen py-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Bar Chart Statistics
      </h2>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-6">
        <label
          htmlFor="month-select"
          className="block text-gray-800 text-sm font-medium mb-2"
        >
          Select Month:
        </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-purple-100 text-gray-800 bg-white"
        >
          <option value="" className="text-gray-500">
            --Select Month--
          </option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.name}
            </option>
          ))}
        </select>
      </div>

      {chartData ? (
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <Bar data={data} options={options} />
        </div>
      ) : (
        <p className="text-gray-500">Select a month to view the chart.</p>
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

export default BarChartStatistics;
