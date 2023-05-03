const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');

// Get the 10 most recent blog posts
router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).limit(10);
  res.render('home', { posts });
});

// Display a login button if the user is not logged in, and a logout button if the user is logged in
router.get('/', (req, res) => {
  const loggedIn = req.session.loggedIn;
  res.render('home', { loggedIn });
});

// Redirect the user to the login page if they are not logged in
router.get('/login', (req, res) => {
  res.redirect('/login');
});

// Redirect the user to the dashboard if they are logged in
router.get('/dashboard', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    res.redirect('/dashboard');
  }
});

module.exports = router;
