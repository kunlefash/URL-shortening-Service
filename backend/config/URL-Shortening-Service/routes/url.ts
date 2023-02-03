const express = require('express');
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/Url');

const router = express.Router();

const baseUrl = process.env.BASE_URL || 'http:localhost:5000';

router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json({ error: 'Invalid base URL' });
  }

  const urlCode = shortid.generate();

  if (!validUrl.isUri(longUrl)) {
    return res.status(401).json({ error: 'Invalid long URL' });
  }

  try {
    let url = await Url.findOne({ longUrl });
    if (url) {
      return res.json(url);
    }
    const shortUrl = `${baseUrl}/${urlCode}`;
    url = new Url({
      longUrl,
      shortUrl,
      urlCode,
      date: new Date(),
    });
    await url.save();
    return res.json(url);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
