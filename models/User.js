const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function() { return this.authMethod === 'local'; }
  },
  authMethod: {
    type: String,
    required: true,
    enum: ['local', 'google']
  },
  contactInfo: {
    phone: String,
    address: String
  },
  role: {
    type: String,
    required: true,
    enum: ['participant', 'raceDirector', 'admin', 'superuser']
  },
  isSuperuser: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  profilePicture: {
    type: String, // URL to the image file
    default: '' // Default can be an empty string or a default image URL
  },
  dateOfBirth: {
    type: Date,
    required: true 
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'] // TODO other cannot be scored 
  },
  mailingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to handle the 'updatedAt' field on document updates
userSchema.pre('save', function(next) {
  if (!this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
