const mongoose = require('mongoose');

const Product = mongoose.model(
  'Product',
  new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }),
);

module.exports = Product;
