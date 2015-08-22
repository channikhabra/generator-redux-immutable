import {combineReducers} from 'redux-immutable';
import {createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable';
import * as reducers from '../reducers';

let createStoreWithMiddleware;
if (__DEV__) {
  let {devTools, persistState} = require('redux-devtools');

  createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    createStore
  );
} else {
  createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
}

const reducer = combineReducers(reducers);

let state = {};
state.title = 'to the party';


export default createStoreWithMiddleware(reducer, Immutable.fromJS(state));
