const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactionController');
const { getTransactions } = require('../controllers/transactionController');



router.get('/transactions/:month', getTransactions);
router.get('/statistics/:month', transactionController.getStatistics);
router.get('/bar-chart/:month', transactionController.getBarChartData);
router.get('/pie-chart/:month', transactionController.getPieChartData);
router.get('/combined-data/:month', transactionController.getCombinedData);

module.exports = router;
