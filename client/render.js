import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Attributes from './containers/Attributes';
import store from './store';

const render = function () {
  const app = (
    <Provider store={store}>
      <Attributes />
    </Provider>
  );
  const root = document.querySelector('#app');
  if (!root) return console.log('No container found.');
  ReactDOM.render(app, root);
};

export default render;
