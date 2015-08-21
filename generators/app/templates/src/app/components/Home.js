import React, {Component} from 'react';

export default class Home extends Component {
  render() {
    // injected from the Sample reducer
    const {title} = this.props;
    return (
      <h1>Welcome {title}!</h1>
    );
  }
}
