import { gifReducer } from '.';
import { FETCH_GIFS_SUCCEEDED } from '../actions';

describe('GIF reducer', () => {
  const gifs = [
    {
      type: 'gif',
      id: '1',
      url: 'https://giphy.com/gifs/JrGlLg0Ycz3XrufJ40'
    }
  ];
  it('should return the initial state', () => {
    expect(gifReducer(undefined, {})).toEqual([]);
  });
  it('should handle FETCH_GIFS_SUCCEEDED', () => {
    expect(gifReducer([], FETCH_GIFS_SUCCEEDED({ gifs }))).toEqual(gifs);
  });
  it('should handle FETCH_GIFS_SUCCEEDED with offset', () => {
    expect(
      gifReducer([...gifs], FETCH_GIFS_SUCCEEDED({ gifs, offset: gifs.length }))
    ).toEqual([...gifs, ...gifs]);
  });
});
