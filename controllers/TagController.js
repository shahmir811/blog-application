const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const Tag = require('../models/Tag');

// get list of all tags
exports.all_tags = async (req, res) => {
  try {
    const tags = await Tag.find();

    res.status(200).json({
      count: tags.length,
      tags: tags.map(tag => {
        return {
          _id: tag._id,
          name: tag.name
        };
      })
    });
  } catch (error) {
    errorResponse(error, res);
  }
};

// Add new tag
exports.add_tag = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name } = req.body;

  try {
    const newTag = new Tag({
      _id: new mongoose.Types.ObjectId(),
      name
    });

    const response = await newTag.save();
    res.status(201).json({
      message: 'Order created successfully',
      createdOrder: {
        _id: response._id,
        name: response.name
      }
    });
  } catch (error) {
    errorResponse(error, res);
  }
};

// delete tag
exports.delete_tag = async (req, res) => {
  const { id } = req.params;

  try {
    const tag = await Tag.findById(id);
    if (!tag) return res.status(404).json({ message: 'Tag not found' });

    await Tag.findByIdAndRemove(id);

    res.status(200).json({ message: 'Tag removed' });
  } catch (error) {
    errorResponse(error, res);
  }
};

const errorResponse = (error, res) => {
  console.log(error.message);
  return res.status(500).json('Server error');
};
