const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login_name: { type: String, require: true},
  first_name: { type: String,require: true },
  last_name: { type: String,require: true },
  password: {type: String, require: true},
  location: { type: String },
  description: { type: String },
  occupation: { type: String },
});

module.exports = mongoose.model.Users || mongoose.model("Users", userSchema);
