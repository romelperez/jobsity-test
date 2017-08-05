import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

export default (
  <Route path='/' component={require('./containers/App').default}>
    <IndexRoute component={require('./containers/Dashboard').default} />
    <Redirect from='*' to='/' />
  </Route>
);
