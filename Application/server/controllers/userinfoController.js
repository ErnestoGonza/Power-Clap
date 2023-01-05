const User = require('../models/userModel.js');
const Project = require('../models/projectModel.js');
const Card = require('../models/cardModel.js');

const userinfoController = {};

userinfoController.getProjects = (req, res, next) => {
  console.log('req.session in userinfoController.getProjects: ', req.session);
  // const user = User.findOne({ username: req.session.user });
  // console.log('User inside getProjects func: ',user);
  let projects = [];
  if (user) {
    projects = Project.find({ '_id': { $in: user.projects } });
  }
  res.locals.projects = projects.map((project) => project.projectName);
  next();
};

module.exports = userinfoController;