import React from 'react';
import Root from './containers/Root';
import BrowserHistory from 'react-router/lib/BrowserHistory';

require('../css/style.scss');

React.render(<Root history={new BrowserHistory} />, document.getElementById('app'));
