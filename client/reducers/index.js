import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import attrs from './attrs';
import cats from './cats';

export default combineReducers({
  routing: routerReducer,
  attrs,
  cats,
});
