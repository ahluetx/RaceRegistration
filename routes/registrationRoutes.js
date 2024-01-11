const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

// Retrieve registration details
router.get('/:registrationId', registrationController.getRegistration);

// Update registration
router.put('/:registrationId', registrationController.updateRegistration);

// Cancel registration
router.delete('/:registrationId', registrationController.cancelRegistration);

// Register a user for an event
router.post('/', registrationController.registerForEvent);

module.exports = router;
