import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import cats from './cats';
import fields from './fields';

export default combineReducers({
  routing: routerReducer,
  cats,
  fields,
});
