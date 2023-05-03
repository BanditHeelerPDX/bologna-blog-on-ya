const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');

// Create a new post
router.post('/', async (req, res) => {
  const user = await User.findById(req.session.userId);
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: user.userName,
  });
  await post.save();
  res.redirect('/dashboard');
});

// Edit a post
router.put('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;
  await post.save();
  res.redirect('/dashboard');
});

// Delete a post
router.delete('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  await post.remove();
  res.redirect('/dashboard');
});

// Comment on a post
router.post('/:id/comment', async (req, res) => {
  const post = await Post.findById(req.params.id);
  const comment = new Comment({
    content: req.body.content,
    author: req.session.userName,
    postId: post.id,
  });
  await comment.save();
  res.redirect(`/${post.id}`);
});

module.exports = router;