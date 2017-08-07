import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

export default (
  <Route path='/' component={require('./containers/App').default}>
    <IndexRoute component={require('./containers/Dashboard').default} />
    <Route path='builder' component={require('./containers/Builder').default} />
    <Route path='builder/:catId' component={require('./containers/Builder').default} />
    <Redirect from='*' to='/' />
  </Route>
);
