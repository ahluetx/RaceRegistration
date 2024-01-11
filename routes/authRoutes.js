const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');
const loginController = require('../controllers/loginController'); // Import loginController
const router = require('express').Router();
const saltRounds = 10;

// Google OAuth Routes
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect or handle as needed.
    res.redirect('/dashboard'); // or wherever you want to redirect
  }
);

// Custom Login System Routes
router.post('/register', async (req, res) => {
    try {
        //console.log("Request Body:", req.body); // Add this line

        //hash the pw
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = new User({
            ...req.body,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).send("User registered successfully");
  } catch (error) {
        console.error("Detailed Error:", error);
        res.status(500).send(error.message);
  }
});

router.post('/login', loginController.login); // Use loginController for login logic

module.exports = router;
