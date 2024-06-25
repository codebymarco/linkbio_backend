const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    user_id: {
      type: String,
    },
    photo: {
      type: String,
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    occupation: {
      type: String,
    },
    skills: {
      type: Array,
    },
    softSkills: {
      type: Array,
    },
    hobbies: {
      type: Array,
    },
    workExperience: {
      type: Array,
    },
    education: {
      type: Array,
    },
    views: {
      type: Number,
    },
    template: {
      type: String,
    },
    scroll: {
      type: Boolean,
    },
    email: {
      type: String,
    },
    cell: {
      type: String,
    },
    links: {
      type: Array,
    },
    footer: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("project", projectSchema);
