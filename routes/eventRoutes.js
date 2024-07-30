const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
} = require("../controllers/eventController");
const protect = require("../utils/authMiddleware");

// Create event route
router.post("/", protect, createEvent);

// Get all events route
router.get("/", getEvents);

// Get event by ID route
router.get("/:id", getEventById);

module.exports = router;
