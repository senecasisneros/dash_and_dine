import React from 'react';
import { FlatButton } from 'material-ui';

class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'CurrentLocation';
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const obj = position.coords;

        this.props.getMaps(obj);
        this.props.getLocation(latitude, longitude);
      });
    } else {
      alert('Error your current location is not avaliable\n');
    }
  }
  render() {
    return (
      <FlatButton
        onClick={this.onClick}
        className="btnStyle"
        type="button"
        label="Current Location"
        primary
      />
    );
  }
  }

export default CurrentLocation;
