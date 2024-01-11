const express = require('express');
const router = express.Router();
const User = require('../models/User');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer'); // Multer is a middleware for handling file uploads
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // The path to save uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/upload-profile-picture', verifyToken, upload.single('profilePicture'), async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you get the user's ID from the token
        const profilePictureUrl = req.file.path; // The path to the uploaded file

        const updatedUser = await User.findByIdAndUpdate(userId, { profilePicture: profilePictureUrl }, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Retrieve user profile
router.get('/:userId', userController.getUserProfile);

// retrive authenticated users own profile
router.get('/profile', verifyToken, userController.viewOwnProfile);

// Update user profile
router.put('/:userId', userController.updateUserProfile);

// Register a new user
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

module.exports = router;
