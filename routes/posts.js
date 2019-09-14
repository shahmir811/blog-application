const express = require('express');
const multer = require('multer');
const router = express.Router();
const { check } = require('express-validator');

const auth = require('../middlewares/auth');
const PostController = require('../controllers/PostController');

/////////////////// multer task starts here //////////////////////////////////////

// Multer setup for storing files in storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname.split(' ').join('_')); // replace space with underscores
  }
});

const fileFilter = (req, file, callback) => {
  // only upload images of type jpeg, png or jpg
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    //accept file
    callback(null, true);
  } else {
    // reject file
    callback(
      new Error('Only upload files with extension jpeg, jpg or png'),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 50 } // only allow 50MB
});

/////////////////// multer task ends here //////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
// get all posts
router.get('/', auth, PostController.all_posts);

/////////////////////////////////////////////////////////////////////////
// Create new post
router.post(
  '/',
  [
    auth,
    upload.single('postImage'),
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
