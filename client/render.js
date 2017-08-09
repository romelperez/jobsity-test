import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './store';
import routes from './routes';

const history = syncHistoryWithStore(browserHistory, store);

const render = function () {
  const app = (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  );
  const root = document.querySelector('#app');
  if (!root) return console.log('No container found.');
  ReactDOM.render(app, root);
};

export default render;
