const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  responsibleBy: [{type: String}],
  startDate: {type: String},
  deadline: {type: String},
  //stage will be numbers from 1 to 4
  //1 means 'to do'
  //2 for 'in progress'
  //3 for 'to verify'
  //4 for 'completed'
  stage: {type: Number},
  project: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
})


const Card = mongoose.model('Card', cardSchema);

module.exports = Card;