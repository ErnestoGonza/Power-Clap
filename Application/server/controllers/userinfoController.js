const User = require('../models/userModel.js');
const Project = require('../models/projectModel.js');
const Card = require('../models/cardModel.js');

const userinfoController = {};

userinfoController.getProjects = async (req, res, next) => {
  // console.log('req.session in userinfoController.getProjects: ', req.session);
  const user = await User.findOne({ username: req.session.user });
  // console.log('User inside getProjects func: ', user);
  let projects = [];
  if (user) {
    projects = await Project.find({ creator: user._id });
    // console.log(`Projects from ${projects}`);
  }
  res.locals.projects = projects;
  next();
};

module.exports = userinfoController;
