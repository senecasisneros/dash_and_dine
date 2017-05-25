const axios = require('axios');
const weatherKey = process.env.weather_key;

exports.weather = function (lat, lon, cb) {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=${weatherKey}`;
  axios.get(url)
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      cb(err);
    });
};
