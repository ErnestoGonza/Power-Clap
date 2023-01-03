import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
  project: {
    type: String,
    required: true
  },
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
})


const Card = mongoose.model('Card', cardSchema);

export default Card;