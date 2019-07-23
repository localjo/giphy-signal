import { createAction } from 'redux-starter-kit';
import axios from 'axios';

if (!process.env.REACT_APP_GIPHY_API_KEY) {
  console.warn('You need to set the Giphy API key environment variable');
}

export const SET_FULLSCREEN = createAction('SET_FULLSCREEN');
export const FETCH_GIFS_REQUESTED = createAction('FETCH_GIFS_REQUESTED');
export const FETCH_GIFS_SUCCEEDED = createAction('FETCH_GIFS_SUCCEEDED');
export const FETCH_GIFS_FAILED = createAction('FETCH_GIFS_FAILED');
export const SEARCH_GIFS_REQUESTED = createAction('SEARCH_GIFS_REQUESTED');
export const SEARCH_GIFS_SUCCEEDED = createAction('SEARCH_GIFS_SUCCEEDED');
export const SEARCH_GIFS_FAILED = createAction('SEARCH_GIFS_FAILED');

export const FETCH_GIFS = offset => async dispatch => {
  dispatch(FETCH_GIFS_REQUESTED());
  const params = {
    api_key: process.env.REACT_APP_GIPHY_API_KEY,
    ...(offset > 0 && { offset })
  };
  try {
    const res = await axios.get('//api.giphy.com/v1/gifs/trending', {
      params
    });
    const gifs = res.data.data || [];
    return dispatch(FETCH_GIFS_SUCCEEDED({ gifs, offset }));
  } catch (error) {
    return dispatch(FETCH_GIFS_FAILED({ error: error.toString() }));
  }
};

export const SEARCH_GIFS = (term, offset) => async dispatch => {
  dispatch(SEARCH_GIFS_REQUESTED({ term, offset }));
  const params = {
    api_key: process.env.REACT_APP_GIPHY_API_KEY,
    q: term,
    ...(offset > 0 && { offset })
  };
  try {
    const res = await axios.get('//api.giphy.com/v1/gifs/search', {
      params
    });
    const gifs = res.data.data || [];
    return dispatch(SEARCH_GIFS_SUCCEEDED({ gifs, offset, term }));
  } catch (error) {
    return dispatch(SEARCH_GIFS_FAILED({ error: error.toString(), term }));
  }
};
