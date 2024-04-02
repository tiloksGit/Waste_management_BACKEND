const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    bin_id: { type: String, required: true },
    fill: {
      type: Number,
      required: true,
      default: 0,
    },
    location: {
      type: String,
    },
    latitude: {
      type: String,
      required: false,
    },
    longitude: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("bin_data", Schema);
