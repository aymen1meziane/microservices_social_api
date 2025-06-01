const express = require('express');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');

dotenv.config();
const app = express();
app.use(express.json());

// Proxy pour auth-service
app.use('/auth', createProxyMiddleware({
  target: process.env.USERS,
  changeOrigin: true,
  pathRewrite: { '^/auth': '/auth' },
}));

// Proxy pour post-service
app.use('/posts', createProxyMiddleware({
  target: process.env.POSTS,
  changeOrigin: true,
  pathRewrite: { '^/posts': '/posts' },
}));

// Proxy pour like-service
app.use('/likes', createProxyMiddleware({
  target: process.env.LIKES,
  changeOrigin: true,
  pathRewrite: { '^/likes': '/likes' },
}));

app.listen(3000, () => console.log('Gateway running on port 3000'));