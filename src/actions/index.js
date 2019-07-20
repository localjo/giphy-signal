import { createAction } from 'redux-starter-kit';
import axios from 'axios';

export const FETCH_GIFS_REQUESTED = createAction('FETCH_GIFS_REQUESTED');
export const FETCH_GIFS_SUCCEEDED = createAction('FETCH_GIFS_SUCCEEDED');
export const FETCH_GIFS_FAILED = createAction('FETCH_GIFS_FAILED');

export const FETCH_GIFS = () => async dispatch => {
  dispatch(FETCH_GIFS_REQUESTED());
  try {
    const res = await axios.get('//api.giphy.com/v1/gifs/trending', {
      params: { api_key: process.env.REACT_APP_GIPHY_API_KEY }
    });
    const gifs = res.data.data || [];
    return dispatch(FETCH_GIFS_SUCCEEDED(gifs));
  } catch (error) {
    return dispatch(FETCH_GIFS_FAILED(error));
  }
};
