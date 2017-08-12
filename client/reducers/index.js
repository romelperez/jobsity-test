import { combineReducers } from 'redux';
import categories from './categories';
import attributes from './attributes';

export default combineReducers({
  categories,
  attributes,
});
