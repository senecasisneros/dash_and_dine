import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { TextField, FlatButton } from 'material-ui';

let placeSearch, autocomplete;

const componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name',
};

const inputStyle = {
  width: '500px',
  fontSize: '30px',
};
const btnStyle = {
  fontSize: '40px',
};

let _autocomplete = null;

class AutoComplete extends React.Component {
  static propTypes = {
    getMaps: PropTypes.func.isRequired,
    getLocation: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    _autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), { types: ['geocode'] });
  }

  onChange(e) {
    this.setState({ address: e.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { address } = this.state;

    geocodeByAddress(address, (err, { lat, lng }) => {
      if (err) {
        console.log('Oh no!', err);
      }

      { lat, lng; }
      const address = _autocomplete.getPlace().formatted_address;
      const obj = { address, lat, lng };
      this.props.getMaps(obj);
      this.props.getLocation(lat, lng);
    });
  }
  render() {
    return (
      <div className="text-center">
        <form onSubmit={this.handleFormSubmit}>
          <TextField
            onChange={this.onChange}
            floatingLabelText="Enter a location"
            floatingLabelFixed={false}
            placeholder=""
            className="inputStyle"
            style={inputStyle}
            value={this.state.address}
            id="autocomplete"
            type="text"
            size="50"
          />
          <FlatButton style={btnStyle} type="submit" label="Enter" primary />
        </form>
      </div>
    );
  }
}

export default AutoComplete;
