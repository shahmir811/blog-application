const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const auth = require('../middlewares/auth');
const TagController = require('../controllers/TagController');

// get list of all tags
router.get('/', auth, TagController.all_tags);

router.post(
  '/create',
  [
    check('name', 'Tag name is required')
      .not()
      .isEmpty()
  ],
  TagController.add_tag
);

router.delete('/:id', auth, TagController.delete_tag);

module.exports = router;
