const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Like', LikeSchema);
