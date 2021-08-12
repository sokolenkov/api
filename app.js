require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// import connectDB module
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// authMiddleware
const authMiddleware = require('./middleware/authentication');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authMiddleware, jobsRouter);

// error handler middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.DB_URI);
    app.listen(port, console.log(`Server is running on ${port} port...`));
  } catch (error) {
    console.log(error);
  }
};

start();
