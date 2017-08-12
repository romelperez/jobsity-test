import { createStore, compose } from 'redux';
import reducers from 'client/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store;
if (process.env.NODE_ENV === 'production') {
  store = createStore(reducers);
}
else {
  store = createStore(reducers, composeEnhancers());
}

export default store;
