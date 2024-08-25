const express = require("express");
const router = express.Router();
const {
  deleteUser,
  changePassword,
  checkPassword,
  getUser,
  updateUsername
} = require("../controllers/userController");
const Auth = require("../middlewear/requireAuth");
router.use(Auth);

// Get User Details
router.get("/details/:id", getUser);

// Update UserName
router.post("/username/:id", updateUsername); 

// Delete User
router.delete("/:id", deleteUser);

// Change User Password
router.post("/passwordchange/:id", changePassword);

// Check User Password
router.post("/password/check/:id", checkPassword);

module.exports = router;
