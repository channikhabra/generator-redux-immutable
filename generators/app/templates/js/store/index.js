import combineReducers from 'redux-immutable';
import Immutable from 'immutable';
import {createStore} from '../utils/devTools';
import * as reducers from '../reducers';

const reducer = combineReducers(reducers);

let state = {};
state.title = 'Hello world!';

export const store = createStore(reducer, Immutable.fromJS(state));
