const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    unique: true
  },

  projectDescription: {
    type: String,
    required: true
  },
  // managedBy: {
  //   type: ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  members: [{type: String}],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
  },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;