const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Your User model

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, cb) => {
    // Check if user already exists in your DB
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
      // User exists, proceed to log them in
      return cb(null, existingUser);
    }

    // If new user, save them in your DB
    const newUser = await new User({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value
      // Other fields you might want to save
    }).save();

    cb(null, newUser);
  }
));

// Serialize and deserialize user instances to and from the session.
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});
