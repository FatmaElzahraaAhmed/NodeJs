const mongoose = require("mongoose");

let usersSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  address: String,
  password: String,
});

module.exports = mongoose.model("users", usersSchema);
