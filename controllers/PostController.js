const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const Post = require('../models/Post');
const User = require('../models/User');
const Tag = require('../models/Tag');

/////////////////////////////////////////////////////////////////////////
// get all posts
exports.all_posts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', '_id name')
      .populate('tag', '_id name');

    res.status(200).json({
      count: posts.length,
      posts: posts.map(post => {
        return {
          _id: post._id,
          slug: post.slug,
          title: post.title,
          body: post.body,
          created_by: post.user.name,
          created_at: post.created_at,
          tag: post.tag.name,
          tagId: post.tag._id,
          myPost: post.user._id.toString() === req.user.id ? true : false
        };
      })
    });
  } catch (error) {
    errorResponse(error, res);
  }
};

/////////////////////////////////////////////////////////////////////////
// Create new post
exports.create_post = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { title, body, tagId } = req.body;

    const newPost = new Post({
      _id: new mongoose.Types.ObjectId(),
      user: req.user.id,
      tag: tagId,
      title,
      body
    });

    await newPost.save();

    res.status(201).json({
      message: 'New post created',
      post: newPost
    });
  } catch (error) {
    errorResponse(error, res);
  }
};

/////////////////////////////////////////////////////////////////////////
// Get single post
exports.show_post = async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await Post.findOne({ slug });

    res.status(200).json(post);
  } catch (error) {
    errorResponse(error, res);
  }
};

/////////////////////////////////////////////////////////////////////////
// update post
exports.update_post = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, tagId } = req.body;

    const post = await Post.findById(id);

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'Not allowed to update this post'
      });
    }

    const updatedPost = {};
    // updatedPost.user = req.user.id;
    updatedPost.title = title;
    updatedPost.body = body;
    updatedPost.tagId = tagId;

    const response = await Post.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: updatedPost.title,
          body: updatedPost.body,
          tag: updatedPost.tagId
        }
      },
      { new: true }
    )
      .select('_id title slug body')
      .populate('tag', '_id name');

    res.status(200).json({
      message: 'Post record updated',
      response
    });
  } catch (error) {
    errorResponse(error, res);
  }
};

/////////////////////////////////////////////////////////////////////////
// Delete Post
exports.delete_post = async (req, res) => {
  const { slug } = req.params;

  try {
    const post = await Post.findOne({ slug });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not able to delete this post' });
    }

    await post.remove();

    res.status(200).json({
      message: 'Post deleted successfully'
    });
  } catch (error) {
    errorResponse(error, res);
  }
};

/////////////////////////////////////////////////////////////////////////
// Error message
const errorResponse = (error, res) => {
  console.log(error.message);
  return res.status(500).json('Server error');
};
