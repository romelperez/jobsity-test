import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Attributes from './containers/Attributes';
import store from './store';

export default function render () {
  const app = (
    <Provider store={store}>
      <MuiThemeProvider>
        <Attributes />
      </MuiThemeProvider>
    </Provider>
  );
  const root = document.querySelector('#app');
  ReactDOM.render(app, root);
}
