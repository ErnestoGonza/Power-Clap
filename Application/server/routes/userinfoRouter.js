const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user) {
      console.log('user found! username: ', req.session.user);
      res.status(200).json(req.session.user);
    } else console.log('user not found');
  });
  
  router.get('/projects', userController.getProjects, (req, res) => {
    //   console.log('PROJECT RESULTS: ', res.locals.projects);
      res.status(200).json(res.locals.projects);
    }
  );
//   (req, res, next) => {
//     console.log('REQ.SESSION.USER', req.session.user);
//     next();
//   },

module.exports = router;