const Registration = require('../models/Registration');
const Event = require('../models/Event');

exports.registerForEvent = async (req, res) => {
  try {
    // Additional logic to check event capacity, user eligibility, etc., can be added here
    const newRegistration = new Registration({
      ...req.body,
      userID: req.user._id  // Assuming you have user information in the request
    });
    await newRegistration.save();
    res.status(201).json(newRegistration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.registrationId);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRegistration = async (req, res) => {
  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(
      req.params.registrationId,
      req.body,
      { new: true }
    );
    if (!updatedRegistration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.status(200).json(updatedRegistration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.registrationId);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.status(200).json({ message: 'Registration cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
