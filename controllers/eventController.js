const Event = require("../models/eventModel");

// Create a new event
exports.createEvent = async (req, res) => {
  const { title, description, date } = req.body;
  console.log("Organizer ID:", req.user?._id);
  try {
    const event = await Event.create({
      title,
      description,
      date,
      organizer: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    //console.log(organizer);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organizer", "name email");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "organizer",
      "name email"
    );

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
