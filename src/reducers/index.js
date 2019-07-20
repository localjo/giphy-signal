import { combineReducers } from 'redux';
import { createReducer } from 'redux-starter-kit';
import { FETCH_GIFS_SUCCEEDED } from '../actions';

// NOTE: redux-starter-kit uses https://github.com/immerjs/immer
// to allow "mutating" the state directly in the reducer

export const gifReducer = createReducer([], {
  [FETCH_GIFS_SUCCEEDED]: (state, action) => action.payload
});

const rootReducer = combineReducers({
  gifs: gifReducer
});

export default rootReducer;
