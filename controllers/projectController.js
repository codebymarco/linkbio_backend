const Project = require("../models/projectModel");
const Portfolio = require("../models/portfolioModel");
const User = require("../models/userModel");

// todo : get portfolio
// tested: true
// status: worked
const getProject = async (req, res) => {
  const id = req.params.user_id;
  try {
    const project = await Portfolio.findOne({ user_id: id });
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// todo: delete project
// we only want to use this when a user delets an account
const deleteProject = async (req, res) => {
  const _id = req.params.id;
  try {
    const project = await Project.findOneAndDelete({ _id });
    if (project) {
      res.status(200).json(true);
    }
    if (!project) {
      res.status(200).json(false);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// todo: edit portfolio
// tested: true
// works: yes
const updateProject = async (req, res) => {
  const _id = req.params.id;
  try {
    const project = await Portfolio.findByIdAndUpdate(_id, {
      ...req.body,
    });
    res.status(200).json({ message: "edited sucessfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// todo: edit portfolio
// tested: true
// works: yes
const updateViews = async (req, res) => {
  const _id = req.params.id;
  try {
    const project = await Portfolio.findByIdAndUpdate(
      _id,
      { $inc: { views: 1 } }, // Increment the views field by 1
      { new: true } // Return the updated document
    );
    res.status(200).json({ message: "you hit me" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProject,
  deleteProject,
  updateProject,
};
