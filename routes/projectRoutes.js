const express = require("express");
const router = express.Router();
const {
  deleteProject,
  getProject,
  getProjects,
  updateProject,
  deleteAllProjects,
} = require("../controllers/projectController");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const Project = require("../models/projectModel");
const Portfolio = require("../models/portfolioModel");
const Auth = require("../middlewear/requireAuth");
router.use(Auth);

// todo: this is the photo upload logic
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({ storage });

// todo: create the portoflio with a photo
router.post("/photo", upload.single("photo"), async (req, res) => {
  const user_id = req.user._id;
  const url = req.protocol + "://" + req.get("host");
  const { name, arr, description, repo, demo, type, technologies } = req.body;
  console.log(req.body);
  const photo = url + "/files/" + req.file.filename;
  try {
    const project = await Project.create({
      user_id,
      photo,
      name,
      description,
      repo,
      demo,
      type,
      technologies,
      views: 0,
    });
    res.status(200).json(project);
    console.log(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
});

// todo: create the portoflio without a photo
// we wont use this now unless we want user to create multiple portoflios
router.post("/", async (req, res) => {
  const user_id = req.user._id;
  const { name, arr, description, repo, demo, type, technologies } = req.body;
  try {
    const project = await Project.create({
      user_id,
      name,
      description,
      repo,
      demo,
      type,
      technologies,
      views: 0,
    });
    res.status(200).json(project);
    console.log(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
});

// todo: get portfolio
router.get("/:user_id", getProject);

// todo: increment views

// todo: edit portfolio
router.put("/:id", updateProject);

// todo: edit portfolio with photo
router.put("/photo/:id", upload.single("photo"), async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const photo = url + "/files/" + req.file.filename;
  const { id } = req.params;
  try {
    const project = await Portfolio.findByIdAndUpdate(id, {
      photo: photo,
      ...req.body,
    });
    res.status(200).json(project);
    console.log(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
});

module.exports = router;
