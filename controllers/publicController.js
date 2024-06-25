const Project = require("../models/portfolioModel");
const User = require("../models/userModel");

const getProject = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username });
    console.log(`user`, user);
    if (!user) {
      throw Error("no portfolio");
    }
    const projects = await Project.findOne({ user_id: user._id });
    if (!projects) {
      throw Error("no portfolio");
    }
    let views = parseInt(projects.views) + 1;
    const views2 = await Project.findByIdAndUpdate(projects._id, { views });
    console.log(views2)
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProject,
};
