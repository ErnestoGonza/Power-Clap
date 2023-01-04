const express = require('express');
const projectController = require('../controllers/projectController');
const router = express.Router();

router.post('/', projectController.createProject, (req, res) => {
    return res.status(200).json(res.locals.currProject);
  });

module.exports = router;