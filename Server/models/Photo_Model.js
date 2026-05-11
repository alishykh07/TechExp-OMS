const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    imageUrl: String,
    title: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Photo", photoSchema);