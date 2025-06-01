const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  content: String,
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Post', PostSchema);