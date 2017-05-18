import React from 'react';
import { geocodeByAddress } from 'react-places-autocomplete';
import { TextField, FlatButton } from 'material-ui';

const componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name',
};

let _autocomplete = null;

class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${google_key}&libraries=places`;
    script.async = false;
    document.body.appendChild(script);
    var that=this
    script.onload=function(){
      console.log("loaded");

    _autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), {types: ['geocode']});
  }
}
  onChange(e) {
    this.setState({ address: e.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { address } = this.state;

    geocodeByAddress(address, (err, { lat, lng }) => {
      if (err) {
        console.log(err);
      }

      const address = _autocomplete.getPlace().formatted_address;
      const obj = {
        address,
        lat,
        lng
      };
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
            floatingLabelFixed={false} placeholder=""
            className="inputStyle"
            value={this.state.address}
            id="autocomplete"
            type="text"
            size="50"
          />
          <FlatButton
            className="btnStyle"
            type="submit"
            label="Enter"
            primary={true}
          />
        </form>
      </div>
    )
  }
}

export default AutoComplete;
