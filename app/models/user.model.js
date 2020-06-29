const mongoose = require('mongoose');

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    lastname: String,
    age: Number,
    role: String,
  }),
);

module.exports = User;
