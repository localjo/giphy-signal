import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { FETCH_GIFS } from '.';

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    mock.reset();
  });
  it('dispatches success event when GIFs are received', () => {
    mock.onGet('//api.giphy.com/v1/gifs/trending').reply(200, {});
    const store = mockStore({});
    return store.dispatch(FETCH_GIFS()).then(() => {
      const actions = store.getActions().map(a => a.type);
      expect(actions[0]).toEqual('FETCH_GIFS_REQUESTED');
      expect(actions[1]).toEqual('FETCH_GIFS_SUCCEEDED');
    });
  });
  it('dispatches failure event when GIFs are not received', () => {
    mock.onGet('//api.giphy.com/v1/gifs/trending').networkError();
    const store = mockStore({});
    return store.dispatch(FETCH_GIFS()).then(() => {
      const actions = store.getActions().map(a => a.type);
      expect(actions[0]).toEqual('FETCH_GIFS_REQUESTED');
      expect(actions[1]).toEqual('FETCH_GIFS_FAILED');
    });
  });
  it('gets GIFs with offset when store has gifs', () => {
    mock
      .onGet('//api.giphy.com/v1/gifs/trending', {
        api_key: process.env.REACT_APP_GIPHY_API_KEY,
        offset: 1
      })
      .reply(200, {});
    const store = mockStore({ gifs: [1] });
    const state = store.getState();
    return store.dispatch(FETCH_GIFS(state.gifs.length)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual('FETCH_GIFS_REQUESTED');
      expect(actions[1].payload.offset).toEqual(1);
    });
  });
});
