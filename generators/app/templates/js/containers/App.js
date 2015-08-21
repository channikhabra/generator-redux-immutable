import React, {Component} from 'react';
import {connect} from 'react-redux';
import selector from '../selector';

import Home from '../components/Home';

class App extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    const {children, title} = this.props;
    return (
        <Home title=title />
        {children}
    );
  }
}

export default connect(
  selector,
)(App);
