const express = require('express');
const router = express.Router();
const Like = require('../models/Like');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

router.post('/', async (req, res) => {
  const { userId, postId } = req.body;
  const existing = await Like.findOne({ userId, postId });
  if (existing) return res.status(400).send('Already liked');
  const like = new Like({ userId, postId });
  await like.save();

  await axios.put(`${process.env.POSTS}/posts/${postId}`, { $inc: { likes: 1 } });
  res.status(201).send('Liked');
});

router.delete('/', async (req, res) => {
  const { userId, postId } = req.body;
  await Like.findOneAndDelete({ userId, postId });
  await axios.put(`${process.env.POSTS}/posts/${postId}`, { $inc: { likes: -1 } });
  res.send('Unliked');
});

module.exports = router;
