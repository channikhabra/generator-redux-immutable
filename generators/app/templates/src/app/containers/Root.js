import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import store from '../store';
import App from './App';


export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        {() =>
          <Router history={this.props.history}>
         <Route path='/' component={App}>
         
            </Route>
          </Router>
        }
      </Provider>
    );
  }
}