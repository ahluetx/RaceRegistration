const Event = require('../models/Event');

exports.createRaceEvent = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const newRaceEvent = new RaceEvent(req.body);
    await newRaceEvent.save();
    res.status(201).json(newRaceEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1});//sort by date 
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.eventId, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRaceEvent = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const raceEvent = await RaceEvent.findByIdAndRemove(req.params.eventId);
    if (!raceEvent) {
      return res.status(404).json({ message: "Race event not found" });
    }
    res.status(200).json({ message: "Race event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.viewRaceEvent = async (req, res) => {
  try {
    const raceEvent = await RaceEvent.findById(req.params.eventId);
    if (!raceEvent) {
      return res.status(404).json({ message: "Race event not found" });
    }
    res.json(raceEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editRaceEvent = async (req, res) => {
  if (!req.user.isAdmin && req.user.role !== 'raceDirector') {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const updatedRaceEvent = await RaceEvent.findByIdAndUpdate(req.params.eventId, req.body, { new: true });
    if (!updatedRaceEvent) {
      return res.status(404).json({ message: "Race event not found" });
    }
    res.json(updatedRaceEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


