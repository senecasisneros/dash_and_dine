const express = require('express');
const router = express.Router();
const axios = require('axios');

const google_key = process.env.google_key;

const gUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

router.route('/address')
	.post((req, res) => {
  const address = req.body.address.replace(/ /g, '+');
  const city = req.body.city.replace(/ /g, '+');
  axios.get(`${gUrl}${address},+${city},+${req.body.state}&key=${google_key}`)
   .then(res => res.data)
   .then(result => {
     res.send(result.results[0].geometry.location);
   })
  .catch(err => {
    res.status(400).send(err);
  });
});

module.exports = router;
