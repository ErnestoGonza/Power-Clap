const User = require('../models/userModel.js');
const Project = require('../models/projectModel.js');
const Card = require('../models/cardModel.js');


const taskController = {};


taskController.createTask = (req, res, next) => {
  const { project,description, responsibleBy, startDate, deadline, stage } = req.query

  try {
    Card.create({ project, description, responsibleBy, startDate, deadline, stage }, (err, currTask) => {
      if (err) {
        return next({
          log: 'Mongoose creatTask error',
          status: 400,
          message: { err: `${err}` }
        })
      } else {
        res.locals.currTask = currTask;
        return next()
      }
    })
  } catch (err) {
    return next({
      log: 'Express error handler caught userController.createTask middleware error',
      status: 400,
      message: { err: `${err}` }
    })
  }
}

taskController.deleteTask = (req, res, next) => {
  try {
    Card.findOneAndDelete({ _id: req.body.id }, (err, deletedTask) => {
      if (err) console.log(err);
      else {
        res.locals.deletedTask = deletedTask;
        return next();
      }
    })
  } catch (err) {
    return next({
      log: 'Express error handler caught userController.deleteTask middleware error',
      status: 400,
      message: { err: `${err}` }
    })
  }
}

taskController.getTasks = (req, res, next) => {
    Card.find({}, (error, card) => {
      // todo: better error handling
      if (error) return next(error);
      res.locals.card = card;
      return next();
    });
  }


taskController.changeStage = (req, res, next) => {

  const dataArr = req.body.data.split(',');
  try {
    Card.findOneAndUpdate({ _id: dataArr[0] }, { stage: parseInt(dataArr[1]) + 1 }, { new: true }, (err, updatedTask) => {
      if (err) console.log(err);
      else {
        res.locals.updatedTask = updatedTask;
        return next();
      }
    })
  } catch (err) {
    return next({
      log: 'Express error handler caught userController.changeState middleware error',
      status: 400,
      message: { err: `${err}` }
    });
  }
}
module.exports = taskController;