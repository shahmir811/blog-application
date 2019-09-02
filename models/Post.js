const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

const PostSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userID: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  tagID: { type: Schema.Types.ObjectId, ref: 'tag', required: true },
  title: { type: String, required: true },
  slug: { type: String, slug: title },
  body: { type: String, required: true },
  postImage: { type: String },
  created_at: { type: Date, default: Date.now }
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
