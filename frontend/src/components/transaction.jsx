import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/transactions/${month}`,
        {
          params: {
            search: search,
            page: page,
            perPage: 10, // Adjust per page items as needed
          },
        }
      );

      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if (month) {
      fetchTransactions();
    }
  }, [search, month, page]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setPage(1); // Reset to first page on new month selection
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-purple-50 p-10">
      {/* Page Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Transactions
        </h1>
      </header>

      {/* Search Section */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mb-8 gap-4">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="🔍 Search by Title, Description, or Price"
          className="w-full md:w-1/2 p-3 rounded-lg shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
        />
        <select
          value={month}
          onChange={handleMonthChange}
          className="w-full md:w-1/4 p-3 rounded-lg shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
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

      {/* Transactions Table */}
      <div className="w-full max-w-4xl overflow-hidden rounded-lg shadow-lg bg-white">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-purple-600 text-white text-left text-lg font-semibold">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Sold</th>
              <th className="px-6 py-4">Image</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-purple-100 transition duration-300"
                >
                  <td className="px-6 py-4 border-b border-gray-200">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {transaction.title}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    ${transaction.price}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {transaction.sold ? (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 font-semibold text-xs">
                        Yes
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-semibold text-xs">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {transaction.image ? (
                      <img
                        src={transaction.image}
                        alt={transaction.title}
                        className="h-12 w-12 object-cover rounded-full border border-gray-300 shadow-md"
                        onError={(e) => (e.target.style.display = "none")} // Hide image if it fails to load
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
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

export default TransactionsTable;
