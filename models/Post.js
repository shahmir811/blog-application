const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  _id: Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  tag: { type: Schema.Types.ObjectId, ref: 'tag', required: true },
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  body: { type: String, required: true },
  postImage: { type: String },
  created_at: { type: Date, default: Date.now }
});

// middleware -----
// make sure that the slug is created from the name
// donot use fat arrow function below as we are using 'this' keyword
PostSchema.pre('save', function(next) {
  this.slug = slugify(this.title);
  next();
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;

// function to slugify a title
function slugify(text) {
  let date = Date.now();
  let updateText = text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text

  return updateText + '-' + date;
}
