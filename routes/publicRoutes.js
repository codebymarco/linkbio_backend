const express = require("express");
const router = express.Router();
const { getProject } = require("../controllers/publicController");

router.get("/:username", getProject);

module.exports = router;
