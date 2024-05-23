const express = require("express");
const router = express.Router();
const { registerValidator } = require("../helper/validator");
const {
  getAllCases,
  createCase,
  getCaseById,
  deleteCase,
  updateCase,
  updateProcessCase,
  updateIsHoldCase,
} = require("../controllers/CaseController");

// Get All Cases
router.get("/", getAllCases);
// Get Single Case
router.get("/:id", getCaseById);

// Create a new Case
router.post("/", createCase);
// Delete Case
router.delete("/:id", deleteCase);
router.patch("/:id", updateCase);
router.put("/:id/:section", updateProcessCase);
router.put("/:id/hold/:isHold", updateIsHoldCase);
module.exports = router;
