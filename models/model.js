const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = new Schema({
  key: { type: String, required: true, trim: true },
  value: { type: String, required: true },
});
const User = mongoose.model("User", userModel);
module.exports = User;
