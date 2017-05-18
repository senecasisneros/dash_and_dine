import { connect } from 'react-redux';
import WeatherDisplay from './WeatherDisplay';
import React, { Component } from 'react';
import { receiveLocation, changeRes } from '../actions/LocationActions';
import { Card, CardText, CardTitle, CardActions, FlatButton } from 'material-ui';
import Maps from './Maps';

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
		if(!this.props.res) {
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
				<Card className="cardStyle">
					<CardTitle className="cardTitle" title={name} subtitle={fullAddress} />
					<CardText>
						<div className="col-xs-4">
							<h3 className="cuisineHead">{cuisine}</h3>
							<WeatherDisplay main={main} weather_desc={weather_desc} />
						</div>
						<div className="col-xs-8">
							<Maps mapAdd={address} coord={coordinate} />
						</div>
					</CardText>
					<CardActions id="nextRest">
						<FlatButton label="Next Restaurant" secondary={true} onClick={this._changeRes} />
					</CardActions>
				</Card>
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
