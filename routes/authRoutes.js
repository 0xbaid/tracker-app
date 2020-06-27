const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route Post /signup
// @desc signup user
// @access public
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const user = new User({ email, password });
  await user.save();
  
  res.send('You made a post request');
});

module.exports = router;
