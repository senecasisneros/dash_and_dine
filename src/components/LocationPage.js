import { connect } from 'react-redux';
import React, { Component } from 'react';
import WeatherDisplay from './WeatherDisplay';
import { receiveLocation, changeRes } from '../actions/LocationActions';
import Maps from './Maps';
import { Button, Jumbotron } from 'react-bootstrap'

class LocationPage extends Component {
  constructor() {
    super();

    this._changeRes = this._changeRes.bind(this);
  }

  componentWillMount() {
    this.props.receiveLocation();
  }
  _changeRes() {
    this.props.changeRes();
  }

  render() {
    let { changeRes } = this.props;
    if (!this.props.res) {
      return (<h1>Loading...</h1>);
    }
    const { name, display_phone, url, location, snippet_text, categories } = this.props.res;
    const { address, city, state_code, postal_code, coordinate } = location;
    const fullAddress = address + ' ' + city + ', ' + state_code + ' ' + postal_code + '  ||   ' + display_phone;
    const { main, weather } = this.props.weather.state;
    const weather_desc = weather[0].main;
    const cuisine = categories[0][0];

    return (
      <div>
        <Jumbotron className="Jumbotron1 container-fluid">
          <h2 className="companyName">{name}</h2>
          <h6 id="fullAdress">{fullAddress}</h6>
          <div className="center-block">
          <Button id="nextRest" bsStyle="primary" onClick={this._changeRes}>Next Restaurant</Button>
          </div>
          <div className="cuisine col-sm-12 col-md-6">
            <h3 className="cuisineHead">{cuisine}</h3>
            <WeatherDisplay main={main} weather_desc={weather_desc} />
          </div>
          <div className="mapDiv col-sm-12 col-md-6">
            <Maps mapAdd={address} coord={coordinate} />
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default connect(state => ({
  res: state.restaurant.choice,
  weather: state.weather,
}),
dispatch => {
  return {
    receiveLocation() {
      dispatch(receiveLocation());
    },
    changeRes() {
      dispatch(changeRes());
    },
  };
}
)(LocationPage);
