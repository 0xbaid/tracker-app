const express = require('express');
const router = express.Router();
const Track = require('../models/Track');
const auth = require('../middleware/auth');

// @route Post /track
// @desc get track data
// @access private
router.get('/tracks', auth, async (req, res) => {
  try {
    const tracks = await Track.find({ userId: req.user._id });
    res.send(tracks);
  } catch (err) {
    return res.status(422).send({ error: 'No tracks found' });
  }
});

module.exports = router;
