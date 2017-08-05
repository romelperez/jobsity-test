import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'client/reducers';

let store;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV === 'production') {
  store = createStore(reducers, applyMiddleware(thunk));
}
else {
  store = createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(thunk)
    )
  );
}

export default store;
