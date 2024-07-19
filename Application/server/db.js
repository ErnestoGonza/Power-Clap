const mongoose = require('mongoose');
const dotenv = require('dotenv');

let env = dotenv.config();

// create a function that will connect to a MongoDB database
const connectDB = async () => {
  try {
    // Create variable that will be used to establish a connection to the database
    // The MONGO_URI is defined in our .env file
    // const conn = await mongoose.connect(process.env.MONGO_URI);

    //for testing purpose only
    const URI =
      'mongodb+srv://egonzalez442:UYPkR06rkk6jTzgp@cluster0.hv7gkdq.mongodb.net/';
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB connected');

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
