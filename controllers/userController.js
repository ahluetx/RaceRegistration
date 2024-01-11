const User = require('../models/User');
const bcrypt = require('bcryptjs');
// Add any other required modules, like JWT for authentication

exports.register = async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new User({
      ...req.body,
      password: hashedPassword
    });

    // Save the user in the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Create and assign a token (JWT) - This part depends on your JWT setup
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // res.json({ token });

    // For simplicity, returning a success message
    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    // Assuming the user's ID is passed as a URL parameter
    //const mongoose = require('mongoose');
    //const objectId = new mongoose.Types.ObjectId(req.params.userId);
    //const user = await User.findById(objectId);
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    // Update user details
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.viewOwnProfile = async (req, res) => {
  try {
    const userId = req.user._id; 

    // Find the user by the extracted ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send back the user profile data
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
