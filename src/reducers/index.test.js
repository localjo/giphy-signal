import { gifReducer } from '.';
import { FETCH_GIFS_SUCCEEDED, FETCH_GIFS_REQUESTED } from '../actions';

describe('GIF reducer', () => {
  const gifs = [
    {
      type: 'gif',
      id: '1',
      url: 'https://giphy.com/gifs/JrGlLg0Ycz3XrufJ40'
    }
  ];
  it('should return the initial state', () => {
    expect(gifReducer(undefined, {})).toEqual({ isLoading: false, images: [] });
  });
  it('should handle FETCH_GIFS_SUCCEEDED', () => {
    expect(
      gifReducer(
        { isLoading: true, images: [] },
        FETCH_GIFS_SUCCEEDED({ gifs })
      )
    ).toEqual({ isLoading: false, images: gifs });
  });
  it('should handle FETCH_GIFS_SUCCEEDED with offset', () => {
    expect(
      gifReducer(
        { isLoading: true, images: [...gifs] },
        FETCH_GIFS_SUCCEEDED({ gifs, offset: gifs.length })
      )
    ).toEqual({ isLoading: false, images: [...gifs, ...gifs] });
  });
  it('should set isLoading to true on FETCH_GIFS_REQUESTED', () => {
    expect(
      gifReducer({ isLoading: false, images: [] }, FETCH_GIFS_REQUESTED())
    ).toEqual({ isLoading: true, images: [] });
  });
});
