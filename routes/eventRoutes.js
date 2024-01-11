const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin'); // Middleware to check if user is an admin


// Retrieve event details
router.get('/:eventId', eventController.getEvent);

// Update event details
router.put('/:eventId', eventController.editRaceEvent);

// Delete an event
router.delete('/:eventId', eventController.deleteRaceEvent);

// Create a new event
router.post('/', verifyToken, isAdmin, eventController.createRaceEvent);

// Optionally, if you want to list all events
router.get('/', eventController.listEvents);

module.exports = router;
