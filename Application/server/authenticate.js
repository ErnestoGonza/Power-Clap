import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import mongoose from 'mongoose';
import googleUser from './models/googleModel.js';
import dotenv from 'dotenv'

dotenv.config();

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  "http://localhost:5173/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });

    // Register user here
    console.log('OAUTH HERE', profile);
    done(null, profile);
  }
));

// these functions are used to to generate jwt token containing
// user data
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((id, done) => {
  done(null, user);
});
