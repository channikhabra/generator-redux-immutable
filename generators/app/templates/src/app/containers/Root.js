import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import store from '../store';
import App from './App';

import mui from 'material-ui';
import injectTapEventPlugin from "react-tap-event-plugin";
const ThemeManager = new mui.Styles.ThemeManager();
injectTapEventPlugin();


export default class Root extends Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
  }
  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    };
  }

  render() {
    return (
      <Provider store={store}>
        {() =>
          <Router history={this.props.history}>
             <Route path='/' component={App}/>
          </Router>
        }
      </Provider>
    );
  }
}
