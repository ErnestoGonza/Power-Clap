const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const mongoose = require('mongoose');
const googleUser = require('./models/googleModel.js');
const dotenv = require('dotenv');
// require('dotenv').config()
// dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID:
        /*process.env.GOOGLE_CLIENT_ID*/ '420343936370-qqafu353om02erpsii3lgujgoousm1iq.apps.googleusercontent.com',
      clientSecret:
        /*process.env.GOOGLE_CLIENT_SECRET*/ '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',
      callbackURL: 'http://localhost:5173/auth/google/callback',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });

      // Register user here
      console.log('OAUTH HERE', profile);
      done(null, profile);
    }
  )
);

// these functions are used to to generate jwt token containing
// user data
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((id, done) => {
  done(null, user);
});

const googlePassport = passport;
module.exports = googlePassport;