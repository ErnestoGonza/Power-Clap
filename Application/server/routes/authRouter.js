const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const passport = require('passport');
const googlePassport = require('../authenticate');

router.use(passport.initialize());
router.use(passport.session());

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

// Google will redirect the user to after they have granted or denied consent.
// This route is also handled by the passport.authenticate('google') middleware,
// which will either redirect the user to the '/dashboard' route on success
// or the '/auth/failure' route on failure.
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  function (res, req) {
    res.redirect('/dashboard');
  }
);

router.get('/failure', (req, res) => {
  res.send('something went wrong..');
});

module.exports = router;