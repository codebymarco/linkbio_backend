const express = require("express");
const router = express.Router();
const {
  deleteProject,
  getProject,
  updateProject
} = require("../controllers/projectController");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const Project = require("../models/projectModel");
const Portfolio = require("../models/portfolioModel");
const Auth = require("../middlewear/requireAuth");
router.use(Auth);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({ storage });

// Create LinkBio With Photo
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

// Create LinkBio Without Photo
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

// Get LinkBio
router.get("/:user_id", getProject);

// Edit LinkBio
router.put("/:id", updateProject);

// Edit LinkBio With Photo
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
