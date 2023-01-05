const User = require('../models/userModel.js');
const Project = require('../models/projectModel.js');


const projectController = {};


/* This is a controller function that creates a new project. It takes in the project name, description,
members, and creator from the request body. It then finds the user that created the project and
creates a new project with the project name, description, members, and creator. It then pushes the
project id to the user's projects array. */
projectController.createProject = (req, res, next) => {
  const { projectName, projectDescription, members, creator } = req.body;
  try {
    User.findOne({ username: creator })
      .then((user) => {
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