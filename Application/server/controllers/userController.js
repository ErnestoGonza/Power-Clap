const User = require('../models/userModel.js');
const Project = require('../models/projectModel.js');
const Card = require('../models/cardModel.js');
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');
const session = require('express-session');
const userController = {};

/* This is a controller function that is called when a user signs up. It takes in the username and
password from the request body, hashes the password, and then creates a new user in the database. */
userController.signup = async (req, res, next) => {
  let { username, password } = req.body;

  await bcrypt
    .hash(password, SALT_WORK_FACTOR)
    .then((hashedPW) => {
      password = hashedPW;
    })
    .catch((err) => console.log(err));

  try {
    User.create({ username, password }, (err, newUser) => {
      if (err) {
        console.log('Error in signup controller: ', err);
        return next({
          log: 'Mongoose create handler error',
          status: 400,
          message: { err: `${err}` },
        });
      } else {
        res.locals.newUser = newUser;
        return next();
      }
    });
  } catch (err) {
    return next({
      log: 'Express error handler caught userController.signup middleware error',
      status: 400,
      message: { err: `${err}` },
    });
  }
};

/* This is a controller function that is called when a user logs in. It takes in the username and
password from the request body, and then checks if the username and password are found and matched
in the database. */
userController.login = (req, res, next) => {
  const { username, password } = req.body;
  try {
    User.findOne({ username }, (err, currUser) => {
      if (err) {
        return next({
          log: 'Mongoose findOne handler error',
          status: 400,
          message: { err: `${err}` },
        });
      } else {
        // if username and password are found and matched in database, proceed to the next middleware
        if (currUser) {
          console.log('currUser', currUser);
          const hashed = currUser.password;

          bcrypt
            .compare(password, hashed)
            .then((result) => {
              //result returns a boolean value
              if (result) {
                req.session.user = currUser.username;
                req.session.save();
                res.locals.validate = { success: true };
                return next();
              } else {
                res.locals.validate = { success: false };
                return next();
              }
            })
            .catch((err) => {
              return next({
                log: 'Express error handler caught userController.login middleware error',
                status: 400,
                message: { err: `${err}` },
              });
            });
        }
      }
    });
  } catch (err) {
    return next(err);
  }
};

userController.dummy = (req, res, next) => {
  console.log('req.session: ', req.session);
  return next();
};

userController.getProject = (req, res, next) => {
  const { projectId } = req.body;
  try {
    Project.findById(projectId).then((project) => {
      res.locals.project = project;
      next();
    });
  } catch (err) {
    return next({
      log: 'Express error handler caught userController.getProject middleware error',
      status: 400,
      message: { err: `${err}` },
    });
  }
};

userController.getUsers = (req, res, next) => {
  User.find({}, (error, users) => {
    // todo: better error handling
    if (error) return next(error);
    res.locals.users = users;
    return next();
  });
};

module.exports = userController;
