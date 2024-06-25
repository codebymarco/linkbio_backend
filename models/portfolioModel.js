const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const portfolioSchema = new Schema(
  {
    user_id: {
      type: String,
    },
    template: {
      type: String,
    },

    active: {
      type: Boolean,
    },
    views: {
      type: Number,
    },
    links: {
      type: Array,
    },
    photo: {
      type: String,
    },
    name: {
      type: String,
    },
    about: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("portfolio", portfolioSchema);
