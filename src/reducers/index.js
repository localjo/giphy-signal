import { combineReducers } from 'redux';
import { createReducer } from 'redux-starter-kit';
import {
  COUNTER_INCREMENT,
  COUNTER_DECREMENT,
  COUNTER_RESET
} from '../actions';

// NOTE: redux-starter-kit uses https://github.com/immerjs/immer
// to allow "mutating" the state directly in the reducer

const counterReducer = createReducer(0, {
  [COUNTER_INCREMENT]: (state, action) => state + action.payload,
  [COUNTER_DECREMENT]: (state, action) => state - action.payload,
  [COUNTER_RESET]: () => 0
});

const rootReducer = combineReducers({
  counter: counterReducer
});

export default rootReducer;
