import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
// import {BrowserRouter as Router, Route} from 'react-router-dom';

import Table from './components/tableApp.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


ReactDOM.render(
		<Router history = {hashHistory}>
		<Route path="/" component={Table} />
		</Router>,
  	document.getElementById('root')
);
