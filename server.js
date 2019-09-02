const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const connectDB = require('./config/db');
const tagRoutes = require('./routes/tags');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const app = express();
connectDB();

// middlewares
app.use(morgan('dev')); //  log request
// Below is body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/tags', tagRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) =>
  console.log(`Server is running at port ${PORT}`)
);
