import { combineReducers } from 'redux';
import { createReducer } from 'redux-starter-kit';
import {
  FETCH_GIFS_SUCCEEDED,
  FETCH_GIFS_REQUESTED,
  SEARCH_GIFS_REQUESTED,
  SEARCH_GIFS_SUCCEEDED,
  SEARCH_GIFS_FAILED,
  SET_FULLSCREEN
} from '../actions';

// NOTE: redux-starter-kit uses https://github.com/immerjs/immer
// to allow "mutating" the state directly in the reducer

export const gifReducer = createReducer(
  { isLoading: false, images: [] },
  {
    [FETCH_GIFS_REQUESTED]: (state, action) => {
      state.isLoading = true;
      return state;
    },
    [FETCH_GIFS_SUCCEEDED]: (state, action) => {
      const { gifs, offset } = action.payload;
      state.isLoading = false;
      state.images = offset > 0 ? state.images.concat(gifs) : gifs;
      return state;
    }
  }
);

export const searchReducer = createReducer(
  { results: {} },
  {
    [SEARCH_GIFS_REQUESTED]: (state, { payload: { term } }) => {
      state.results[term] = state.results[term] || {};
      state.results[term].images = state.results[term].images || [];
      state.results[term].isLoading = true;
      return state;
    },
    [SEARCH_GIFS_SUCCEEDED]: (state, { payload: { gifs, offset, term } }) => {
      state.results[term].isLoading = false;
      state.results[term].images =
        offset > 0 ? state.results[term].images.concat(gifs) : gifs;
      return state;
    },
    [SEARCH_GIFS_FAILED]: (state, { payload: { error, term } }) => {
      state.results[term].error = error;
      state.results[term].isLoading = false;
      return state;
    }
  }
);

export const fullscreenReducer = createReducer('', {
  [SET_FULLSCREEN]: (state, { payload }) => {
    return payload;
  }
});

const rootReducer = combineReducers({
  gifs: gifReducer,
  search: searchReducer,
  fullscreen: fullscreenReducer
});

export default rootReducer;
