const User = require('../models/userModel.js');
const Project = require('../models/projectModel.js');


const userinfoController = {};


userinfoController.getProjects = async (req, res, next) => {
  const user = await User.findOne({ username: req.session.user });
  let projects = [];
  if (user) {
    projects = await Project.find({ creator: user._id });
  }
  res.locals.projects = projects;
  next();
};


module.exports = userinfoController;