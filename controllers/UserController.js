const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const User = require('../models/User');

/////////////////////////////////////////////////////////////////////////
// get list of all users
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, phone, email, password } = req.body;

  try {
    // check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Encypt password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      phone,
      email,
      password: encryptedPassword
    });

    console.log(newUser);

    await newUser.save();

    // Return jsonWebToken
    const payload = {
      user: { id: newUser._id }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    errorResponse(error, res);
  }
};

const errorResponse = (error, res) => {
  console.log(error.message);
  return res.status(500).json('Server error');
};
