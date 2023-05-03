const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Log the user in
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(401).send('Invalid username or password');
  } else if (!user.comparePassword(password)) {
    res.status(401).send('Invalid username or password');
  } else {
    req.session.loggedIn = true;
    req.session.userId = user.id;
    res.redirect('/dashboard');
  }
});

// Log the user out
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;