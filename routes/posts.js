const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const auth = require('../middlewares/auth');
const PostController = require('../controllers/PostController');

/////////////////////////////////////////////////////////////////////////
// get all posts
router.get('/', auth, PostController.all_posts);

/////////////////////////////////////////////////////////////////////////
// Create new post
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title field is required')
        .not()
        .isEmpty(),
      check('body', 'Description required')
        .not()
        .isEmpty(),
      check('tagId', 'Mention associated tag')
        .not()
        .isEmpty()
    ]
  ],
  PostController.create_post
);

/////////////////////////////////////////////////////////////////////////
// Create new post
router.get('/:slug', auth, PostController.show_post);

/////////////////////////////////////////////////////////////////////////
// update post
router.put(
  '/:id',
  [
    auth,
    [
      check('title', 'Title field is required')
        .not()
        .isEmpty(),
      check('body', 'Description required')
        .not()
        .isEmpty(),
      check('tagId', 'Mention associated tag')
        .not()
        .isEmpty()
    ]
  ],
  PostController.update_post
);

/////////////////////////////////////////////////////////////////////////
// delete post
router.delete('/:slug', auth, PostController.delete_post);

module.exports = router;
