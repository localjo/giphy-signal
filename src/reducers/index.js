import { combineReducers } from 'redux';
import { createReducer } from 'redux-starter-kit';
import { FETCH_GIFS_SUCCEEDED, FETCH_GIFS_REQUESTED } from '../actions';

// NOTE: redux-starter-kit uses https://github.com/immerjs/immer
// to allow "mutating" the state directly in the reducer

export const gifReducer = createReducer(
  { isLoading: false, images: [] },
  {
    [FETCH_GIFS_REQUESTED]: (state, action) => {
      return { ...state, isLoading: true };
    },
    [FETCH_GIFS_SUCCEEDED]: (state, action) => {
      const { gifs, offset } = action.payload;
      return {
        isLoading: false,
        images: offset > 0 ? [...state.images, ...gifs] : gifs
      };
    }
  }
);

const rootReducer = combineReducers({
  gifs: gifReducer
});

export default rootReducer;
