const User = require('../models/userModel.js');
const Project = require('../models/projectModel.js');
const Card = require('../models/cardModel.js');

const projectController = {};

projectController.createProject = (req, res, next) => {
  // console.log('should get project info', req.body)
  const { projectName, projectDescription, members, creator } = req.body;
  try {
    User.findOne({ username: creator })
      .then((user) => {
        console.log('USER: ', user);
        console.log('CREATOR: ', creator);
        Project.create({ projectName, projectDescription, members, creator: user.id }, (err, currProject) => {
          if (err) {
            return next({
              log: 'Mongoose Project.create handler error',
              status: 400,
              message: { err: `${err}` }
            });
          } else {
            res.locals.currProject = currProject;
            User.findOneAndUpdate(
              { username: creator },
              { $push: { projects: currProject.id } },
              (err, success) => {
                if (err) console.log(err);
                if (success) console.log(success);
              })
            next();
          }
        })
      })
  } catch (err) {
    return next({
      log: 'Express error handler caught userController.createProject middleware error',
      status: 400,
      message: { err: `${err}` }
    })
  }
}

module.exports = projectController;