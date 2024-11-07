const axios = require("axios");

exports.getTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = "" } = req.query;
  const { month } = req.params;

  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    let transactions = response.data;

    if (month) {
      const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.dateOfSale);
        return transactionDate.getMonth() === parseInt(month) - 1;
      });
      transactions = filteredTransactions;
    }

    if (search) {
      transactions = transactions.filter((transaction) => {
        return (
          (transaction.title &&
            transaction.title.toLowerCase().includes(search.toLowerCase())) ||
          (transaction.description &&
            transaction.description
              .toLowerCase()
              .includes(search.toLowerCase())) ||
          (transaction.price && transaction.price.toString().includes(search))
        );
      });
    }

    const totalTransactions = transactions.length;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedTransactions = transactions.slice(startIndex, endIndex);

    res.status(200).json({
      totalPages: Math.ceil(totalTransactions / perPage),
      totalRecords: totalTransactions,
      currentPage: page,
      perPage,
      transactions: paginatedTransactions,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching transactions from third-party API" });
  }
};

exports.getStatistics = async (req, res) => {
  const { month } = req.params;

  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;

    if (month < 1 || month > 12) {
      return res
        .status(400)
        .json({
          error: "Invalid month. Please provide a month between 1 and 12.",
        });
    }

    let totalSales = 0;
    let soldItems = 0;
    let unsoldItems = 0;

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.dateOfSale);
      const transactionMonth = transactionDate.getMonth() + 1;

      if (transactionMonth === parseInt(month)) {
        if (transaction.sold) {
          totalSales += transaction.price || 0;
          soldItems++;
        } else {
          unsoldItems++;
        }
      }
    });

    res.status(200).json({
      totalSales,
      soldItems,
      unsoldItems,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res
      .status(500)
      .json({ error: "Error fetching statistics from the third-party API" });
  }
};

exports.getBarChartData = async (req, res) => {
  const { month } = req.params;

  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;

    const selectedMonth = parseInt(month, 10);

    const priceRanges = [
      { min: 0, max: 100, label: "0-100", count: 0 },
      { min: 101, max: 200, label: "101-200", count: 0 },
      { min: 201, max: 300, label: "201-300", count: 0 },
      { min: 301, max: 400, label: "301-400", count: 0 },
      { min: 401, max: 500, label: "401-500", count: 0 },
      { min: 501, max: 600, label: "501-600", count: 0 },
      { min: 601, max: 700, label: "601-700", count: 0 },
      { min: 701, max: 800, label: "701-800", count: 0 },
      { min: 801, max: 900, label: "801-900", count: 0 },
      { min: 901, max: Infinity, label: "901-above", count: 0 },
    ];

    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.dateOfSale);
      return transactionDate.getMonth() + 1 === selectedMonth;
    });

    filteredTransactions.forEach((transaction) => {
      const transactionPrice = transaction.price;
      for (const range of priceRanges) {
        if (transactionPrice >= range.min && transactionPrice <= range.max) {
          range.count += 1;
          break;
        }
      }
    });

    const barData = priceRanges.map((range) => ({
      range: range.label,
      count: range.count,
    }));

    res.status(200).json(barData);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res
      .status(500)
      .json({ error: "Error fetching bar chart data from third-party API" });
  }
};

exports.getPieChartData = async (req, res) => {
  const { month } = req.params;

  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;

    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, month - 1, 1);
    const endDate = new Date(currentYear, month, 0);

    const categories = transactions.reduce((acc, transaction) => {
      const transactionDate = new Date(transaction.dateOfSale);

      if (transactionDate.getMonth() === startDate.getMonth()) {
        const category = transaction.category || "Uncategorized";

        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += 1;
      }
      return acc;
    }, {});

    const pieData = Object.keys(categories).map((category) => ({
      category,
      count: categories[category],
    }));

    res.status(200).json(pieData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching pie chart data from third-party API" });
  }
};

exports.getCombinedData = async (req, res) => {
  const { month } = req.params;

  try {
    const statisticsPromise = axios.get(
      `http://localhost:5000/api/statistics/${month}`,
      { timeout: 5000 }
    );
    const barChartDataPromise = axios.get(
      `http://localhost:5000/api/bar-chart/${month}`,
      { timeout: 5000 }
    );
    const pieChartDataPromise = axios.get(
      `http://localhost:5000/api/pie-chart/${month}`,
      { timeout: 5000 }
    );

    const [statistics, barChartData, pieChartData] = await Promise.all([
      statisticsPromise,
      barChartDataPromise,
      pieChartDataPromise,
    ]);

    res.status(200).json({
      statistics: statistics.data,
      barChartData: barChartData.data,
      pieChartData: pieChartData.data,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error fetching combined data from third-party APIs" });
  }
};
