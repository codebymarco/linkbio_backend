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

// todo: get details
router.get("/details/:id", getUser);

// todo: edit username here
 router.post("/username/:id", updateUsername); 

// todo : delete user
router.delete("/:id", deleteUser);

// todo: change password
router.post("/passwordchange/:id", changePassword);

// todo: check current pwd
router.post("/password/check/:id", checkPassword);

module.exports = router;
