const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', userController.signup, (req, res) => {
  return res.status(200).json();
});

router.post('/login', userController.login, (req, res) => {
  req.session.save();
  return res.status(200).json(res.locals.validate);
});

router.post('/getProject', userController.getProject, (req, res) => {
  res.status(200).json();
});

router.get('/', userController.getUsers, (req, res) => {
  return res.status(200).json(res.locals.users);
});

module.exports = router;