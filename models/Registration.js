const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Event'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  category: String,
  paymentStatus: {
    type: String,
    required: true,
    enum: ['paid', 'pending', 'waived']
  }
});

module.exports = mongoose.model('Registration', registrationSchema);
