const axios = require('axios');

const weather_key = process.env.weather_key;

exports.weather = function (lat, lon, cb) {
  // let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=101dfbeab8089ca5b548128192819d7d`;
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=${weather_key}`;
  axios.get(url)
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      cb(err);
    });
};
