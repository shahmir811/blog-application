const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const UserController = require('../controllers/UserController');

/////////////////////////////////////////////////////////////////////////s
// register new user
router.post(
  '/register',
  [
    check('name', 'Name field is required')
      .not()
      .isEmpty(),
    check('phone', 'Phone number is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be atleast 6 characters long').isLength({
      min: 6
    })
  ],
  UserController.register
);

module.exports = router;
