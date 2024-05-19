const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");
const { registerValidator } = require("../helper/validator");
const {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
} = require("../controllers/userController");
// Get All Users
router.get("/", getUsers);
 
// Get Single User
router.get("/:id", getUserById);

// Create a new User
router.post("/", registerValidator, createUser);
// login  a  User
// Delete User
router.delete("/:id", deleteUser);
// Update User
router.patch("/:id", updateUser);
module.exports = router;
