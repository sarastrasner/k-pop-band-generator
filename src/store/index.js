import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// This dependency enables the Redux Dev Tools in your Chrome Console.
import { composeWithDevTools } from 'redux-devtools-extension';

import kPop from './store';

let reducers = combineReducers({ kPop });

const store = () => {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
}

export default store();