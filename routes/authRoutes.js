const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @route Post /signup
// @desc signup user
// @access public
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    
    //creating token
    const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY')
    res.send({token});
  } catch (error) {
    return res.status(422).send(error.message);
  }
});

module.exports = router;
