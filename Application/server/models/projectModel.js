const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  projectName: {
    type: String,
    required: true
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
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
})


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;