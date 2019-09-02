const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const auth = require('../middlewares/auth');
const AuthController = require('../controllers/AuthController');

/////////////////////////////////////////////////////////////////////////
// Check logged in user
router.get('/currentUser', auth, AuthController.check_me);

/////////////////////////////////////////////////////////////////////////
// signin user
router.post(
  '/signin',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  AuthController.signin
);

module.exports = router;
