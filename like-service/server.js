const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const likeRoutes = require('./routes/likes');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.listen(process.env.PORT, () => console.log(`Like service running on port ${process.env.PORT}`));
