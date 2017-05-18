import React, { Component } from 'react';

class WeatherDisplay extends Component {
  render() {
    const { temp } = this.props.main;
    const des = this.props.weather_desc.toLowerCase();

    return (
      <div className="weatherContainer">
        <img alt="Weather Display" className="image" width="250" height="250" src={`https://s3.amazonaws.com/SenNewBucket/${des}.jpg`} />
        <div className="text-image">{Math.floor(temp)}°</div>
      </div>
    );
  }
}

export default WeatherDisplay;
