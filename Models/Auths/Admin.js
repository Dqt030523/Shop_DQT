const mongoose = require('mongoose')

const isAdmin = new mongoose.Schema({
  account: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  boss: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Admin", isAdmin);