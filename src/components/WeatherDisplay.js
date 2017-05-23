import React, { Component } from 'react';

class WeatherDisplay extends Component {
  render() {
    const { temp } = this.props.main;
    const des = this.props.weather_desc.toLowerCase();
    const description = this.props.description;

    return (
      <div className="weatherContainer">
        <img alt="Weather Display" className="image" width="250" height="250" src={`https://s3-us-west-1.amazonaws.com/dashanddine/${des}.jpg`} />
        <div id="description">{description}</div>
        <div className="text-image">{Math.floor(temp)}°</div>
      </div>
    );
  }
}

export default WeatherDisplay;
