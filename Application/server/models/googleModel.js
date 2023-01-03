import mongoose from 'mongoose';

const googleSchema = mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  diplayName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},
{
  timestamps: true
});

const googleUser = mongoose.model('googleUser', googleSchema);

export default googleUser;
