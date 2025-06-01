const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = new User({ userName, password });
    await user.save();
    res.status(201).send('User registered');
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (!user) return res.status(404).send('User not found');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid password');
  res.send('Login successful');
});

router.post('/reset-password', async (req, res) => {
  const { userName, newPassword } = req.body;
  const user = await User.findOne({ userName });
  if (!user) return res.status(404).send('User not found');
  user.password = newPassword;
  await user.save();
  res.send('Password reset');
});

module.exports = router;