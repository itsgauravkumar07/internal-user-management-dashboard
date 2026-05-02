const mongoose = require("mongoose");

const appUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "member"],
    required: true
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("AppUser", appUserSchema);