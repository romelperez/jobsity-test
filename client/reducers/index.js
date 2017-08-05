import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import attrs from './attrs';

export default combineReducers({
  routing: routerReducer,
  attrs,
});
