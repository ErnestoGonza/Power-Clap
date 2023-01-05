const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./db.js');
const port = process.env.PORT || 3000;
const app = express();
connectDB();

// Credentials set to true for session to persist
app .use(cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    // Sessions -- hard coded secret because dotenv and process.env were't working
    .use(session({
        secret: /*process.env.SECRET*/ 'YPUWB0EX9ISPOTMX7Q7W',
        resave: false,
        saveUninitialized: true
    }))


// ROUTERS
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');
const userinfoRouter = require('./routes/userinfoRouter');
const authRouter = require('./routes/authRouter');
const projectRouter = require('./routes/projectRouter')


// ROUTES
app .use('/tasks', taskRouter)
    .use('/userinfo', userinfoRouter)
    .use('/user', userRouter)
    .use('/auth', authRouter)
    .use('/project', projectRouter)


// 404 Error
app.use((req, res) => {
  res.status(404).send("This is not the page you're looking for...");
});


// Express global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});