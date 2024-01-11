const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming the User model is in the models folder

const loginController = {
  async login(req, res) {
    try {
      // Find user by email
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send('User not found');

      // Check if password is correct
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) return res.status(400).send('Invalid password');

      // Create and assign a token
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
      res.json({ token, userId: user._id }); // send token as json object
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

module.exports = loginController;
