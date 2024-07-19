const express = require('express');
const userinfoController = require('../controllers/userinfoController');
const router = express.Router();

/* This is a get request to the userInfoRouter. It is checking to see if there is a user in the
session. If there is, it will send back the user's information. If there is not, it will send back
a status of 200. */
router.get(
  '/projects',
  (req, res, next) => {
    // console.log('REQ.SESSION.USER', req.session.user);
    next();
  },
  userinfoController.getProjects,
  (req, res) => {
    // console.log('PROJECT RESULTS: ', res.locals.projects);
    res.status(200).json(res.locals.projects);
  }
);

/* This is a get request to the userInfoRouter. It is checking to see if there is a user in the
session. If there is, it will send back the user's information. If there is not, it will send back a
status of 200. */
router.get('/', (req, res) => {
  if (req.session.user) {
    // console.log('userInfoRouter user found! username: ', req.session.user);
    res.status(200).json(req.session.user);
  } else {
    // console.log('userInfoRouter user not found');
    res.sendStatus(200);
  }
});

module.exports = router;
