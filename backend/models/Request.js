const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AppUser"
  },
  userName: String,
  type: String,
  requestedValue: String,
  status: String,
  createdAt: Number
});

module.exports = mongoose.model("Request", requestSchema);