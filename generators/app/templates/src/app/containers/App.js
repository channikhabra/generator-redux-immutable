import React, {Component} from 'react';
import {connect} from 'react-redux';
import selector from '../selector';

import {renderDevTools} from '../utils/devTools';
import store from '../store';

import Home from '../components/Home';

class App extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    const {children, title} = this.props;
    return (
      <div>
        <Home title={title} />
        {children}
      {renderDevTools(store)}
      </div>
    );
  }
}

export default connect(
  selector,
)(App);
