const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true }
});

const Tag = mongoose.model('tag', TagSchema);

module.exports = Tag;
