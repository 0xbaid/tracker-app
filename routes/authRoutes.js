const express = require('express');
const router = express.Router();

// @route Post /signup
// @desc signup user
// @access public
router.post('/signup', (req, res) => {
  console.log(req.body);
  res.send('You made a post request');
});

module.exports = router;
