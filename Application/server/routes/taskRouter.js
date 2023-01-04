const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

//route for creating a new task for a specific project
router.post('/:task', userController.createTask, (req, res) => {
  return res.status(200).json(res.locals.currTask);
});

//route for updating the stage info for a specific task
router.patch('/', userController.changeStage, (req, res) => {
  return res.status(200).json(res.locals.updatedTask);
});

//route for deleting a specific task
router.delete('/', userController.deleteTask, (req, res) => {
  return res.status(200).json(res.locals.deletedTask);
});

//route for getting all task info to display at the frontend
router.get('/', userController.getTasks, (req, res) => {
  return res.status(200).json(res.locals.card);
});

module.exports = router;