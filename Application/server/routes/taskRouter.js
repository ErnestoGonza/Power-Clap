const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();


// Route for creating a new task for a specific project
router.post('/:task', taskController.createTask, (req, res) => {
  return res.status(200).json(res.locals.currTask);
});


// Route for updating the stage info for a specific task
router.patch('/', taskController.changeStage, (req, res) => {
  return res.status(200).json(res.locals.updatedTask);
});


// Route for deleting a specific task
router.delete('/', taskController.deleteTask, (req, res) => {
  return res.status(200).json(res.locals.deletedTask);
});


// Route for getting all task info to display at the frontend
router.get('/', taskController.getTasks, (req, res) => {
  return res.status(200).json(res.locals.card);
});


module.exports = router;