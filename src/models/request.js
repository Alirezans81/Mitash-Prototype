const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, uinque: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
});
requestSchema.plugin(timestamp);

module.exports = mongoose.model("Request", requestSchema);
