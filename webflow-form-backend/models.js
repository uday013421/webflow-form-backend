const mongoose = require("mongoose");

const FormDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
}, { timestamps: true });

module.exports = mongoose.model("FormData", FormDataSchema);
