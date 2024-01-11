const mongoose = require('mongoose');

const raceEventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  distances: [{ 
    distance: String, 
    description: String 
  }],
  raceLogo: String, // URL to the image
  participantsVisibility: { type: Boolean, default: true },
  description: { type: String, required: true },
  raceDirector: {
    name: String,
    email: String,
    phone: String
  },
  socialMediaLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
    // other social platforms
  },
  // Include other fields as necessary
});

module.exports = mongoose.model('RaceEvent', raceEventSchema);
