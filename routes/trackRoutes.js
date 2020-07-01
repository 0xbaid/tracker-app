const express = require('express');
const router = express.Router();
const Track = require('../models/Track');
const auth = require('../middleware/auth');

// @route Get /track
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

// @route Post /track
// @desc post track data
// @access private
router.post('/tracks', auth, async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: 'You must provide name and location' });
  }
  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (err) {
    return res.status(422).send({error: err.message});
  }
});

module.exports = router;
