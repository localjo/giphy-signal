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
    mock.restore();
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
});
