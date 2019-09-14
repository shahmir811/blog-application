const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const connectDB = require('./config/db');
const tagRoutes = require('./routes/tags');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();
connectDB();

// middlewares
app.use(morgan('dev')); //  log request

// Making folder public
app.use('/uploads', express.static('uploads'));

// Below is body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/tags', tagRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) =>
  console.log(`Server is running at port ${PORT}`)
);
