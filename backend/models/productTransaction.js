const mongoose = require('mongoose');

const productTransactionSchema = new mongoose.Schema({
  productId: String,
  title: String,
  description: String,
  price: Number,
  category: String,
  dateOfSale: Date,
  sold: Boolean,
});

module.exports = mongoose.model('productTransaction', productTransactionSchema);
