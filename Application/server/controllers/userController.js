const User = require('../models/userModel.js');
const Project = require('../models/projectModel.js');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;


const userController = {};


/* This is the signup controller. It is taking the username and password from the body of the request.
It is then hashing the password and creating a new user in the database. */
userController.signup = async (req, res, next) => {
  let { username, password } = req.body;

  await bcrypt.hash(password, SALT_WORK_FACTOR)
    .then((hashedPW) => {
      password = hashedPW
    })
    .catch(err => console.log(err));

  try {
    User.create({ username, password }, (err, newUser) => {
      if (err) {
        console.log("Error in signup controller: ", err);
        return next({
          log: 'Mongoose create handler error',
          status: 400,
          message: { err: `${err}` }
        })
      } else {
        res.locals.newUser = newUser;
        return next();
      }
    })
  } catch (err) {
    return next({
      log: 'Express error handler caught userController.signup middleware error',
      status: 400,
      message: { err: `${err}` }
    })
  }
}

/* This is the login controller. It is checking the database for the username and password. If the
username and password are found and matched in the database, it will proceed to the next middleware. */
userController.login = (req, res, next) => {
  const { username, password } = req.body;
  try {
    User.findOne({ username }, (err, currUser) => {
      if (err) {
        return next({
          log: 'Mongoose findOne handler error',
          status: 400,
          message: { err: `${err}` }
        });
      } else {
        if (currUser) {
          const hashed = currUser.password

          bcrypt.compare(password, hashed)
            .then(result => {
              if(result) {
                req.session.user = currUser.username;
                req.session.save();
                res.locals.validate = { success: true };
                return next();
              } else {
                res.locals.validate = { success: false };
                return next();
              }
            })
            .catch(err => {
              return next({
                log: 'Express error handler caught userController.login middleware error',
                status: 400,
                message: {err: `${err}`}
              })});
        }
      }
    })
  } catch (err) {
    return next(err);
  }
}


/* This is a controller that is finding a project by its id. */
userController.getProject = (req, res, next) => {
  const { projectId } = req.body;
  try {
    Project.findById(projectId)
    .then((project) => {
      res.locals.project = project;
      next();
    })
  } catch (err) {
    return next({
      log: 'Express error handler caught userController.getProject middleware error',
      status: 400,
      message: { err: `${err}` }
    })
  }
}


userController.getUsers = (req, res, next) => {
  User.find({}, (error, users) => {
    // todo: better error handling
    if (error) return next(error);
    res.locals.users = users;
    return next();
  });
}


userController.dummy = (req, res, next) => {
  console.log('req.session: ', req.session);
  return next();
}


module.exports = userController;