import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Layout extends Component {
  static propTypes = {
    children: React.PropTypes.node,
  };
  render() {
    return (
      <div className="container" style={{ height: '100%' }}>
        {this.props.children}
      </div>
    );
  }
}
