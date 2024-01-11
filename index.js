require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
const path = require('path');

// MongoDB Connection
const mongoDB = 'mongodb://127.0.0.1/RaceRegistrationApp';
mongoose.connect(mongoDB)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Race Registration Application!');
});

// Define more routes, middleware, etc.
app.use(express.json()); // for parsing application/json

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/profile/uploads', express.static(path.join(__dirname, './uploads')));

const PORT = process.env.PORT || 5000; //change so front end and back run on diff ports
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
