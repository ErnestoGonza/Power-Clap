const express = require('express');
const userinfoController = require('../controllers/userinfoController');
const router = express.Router();

router.get('/projects', 
  (req, res, next) => {
    console.log('REQ.SESSION.USER', req.session.user);
    next();
  }, userinfoController.getProjects, 
  (req, res) => {
  //   console.log('PROJECT RESULTS: ', res.locals.projects);
    res.status(200).json(res.locals.projects);
  }
);

router.get('/', (req, res) => {
    // console.log('userInfoRouter request: ', req)
    if (req.session.user) {
      console.log('userInfoRouter user found! username: ', req.session.user);
      res.status(200).json(req.session.user);
    } else console.log('userInfoRouter user not found');
  });
  
  // (req, res, next) => {
  //   console.log('REQ.SESSION.USER', req.session.user);
  //   next();
  // },

module.exports = router;