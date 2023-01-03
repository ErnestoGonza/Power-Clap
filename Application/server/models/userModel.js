import mongoose, { Schema } from 'mongoose';

const userSchema = mongoose.Schema({
  username: {
    type: String,
    // Username and password must be provided due to the required property
    // If the required field is not provided, a validation error will be
    // thrown with the specified error message
    // Check the link below for mongoose built-in validators
    // https://mongoosejs.com/docs/validation.html#custom-error-messages
    required: [true, 'Please add a username']
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
},
  {
    timestamps: true
  });

// module.exports = mongoose.model('User', userSchema);

const User = mongoose.model('User', userSchema);

export default User;
