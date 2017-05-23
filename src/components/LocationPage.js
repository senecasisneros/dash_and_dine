import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import WeatherDisplay from './WeatherDisplay';
import { receiveLocation, changeRes } from '../actions/LocationActions';
import Maps from './Maps';
import { FlatButton } from 'material-ui';


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
    const { name, display_phone, url, location, snippet_text, categories, rating, review_count } = this.props.res;
    const { address, city, state_code, postal_code, coordinate } = location;
    const fullAddress = address + ' ' + city + ', ' + state_code + ' ' + postal_code;
    const phoneNumber = display_phone.substring(1);
    const { main, weather } = this.props.weather.state;
    const weather_desc = weather[0].main;
    let description = this.props.weather.state.weather[0].description;
    description = description.charAt(0).toUpperCase() + description.slice(1);
    const cuisine = categories[0][0];

    return (
      <div>
        <Jumbotron className="details container-fluid">
          <h2 className="companyName">{name}</h2>
          <h6 id="fullAdress">{fullAddress}</h6>
          <h6 id="phone">{phoneNumber}</h6>
          <h6 id="cuisine">{cuisine}</h6>
          <p id="reviewCount">{review_count} Reviews</p>
          <StarRatingComponent
            name="rating"
            editing={false}
            renderStarIcon={() => <span id="starRating">★</span>}
            starCount={5}
            value={rating}
          />
          <div className="center-block">
            <FlatButton id="nextRest" bsStyle="primary" type="button" onClick={this._changeRes} label="Next Restaurant" primary />
            <FlatButton id="nextRest" bsStyle="primary" type="button" target="_blank" href={url} label="Yelp" primary />
            <FlatButton id="nextRest" bsStyle="primary" type="button" href='/' label="New Search" primary />
          {/* <a id="nextRest" className="btn btn-primary" target="_blank" href={url}>Yelp</a> */}
          {/* <a id="nextRest" className="btn btn-primary" href='/'>New Search</a> */}
          </div>
          <div className="cuisine col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <WeatherDisplay main={main} weather_desc={weather_desc} description={description}/>
          </div>
          <div className="mapDiv col-xs-12 col-sm-12 col-md-6 col-lg-6">
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
