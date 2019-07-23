import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FETCH_GIFS, SEARCH_GIFS, SET_FULLSCREEN } from '../actions';
import './App.css';

export const App = ({
  fetchGifs,
  searchGifs,
  setFullScreen,
  fullscreen,
  gifs,
  search
}) => {
  const [term, setTerm] = useState('');
  const debouncedTerm = useDebounce(term, 500)[0];
  const hasDebouncedTerm = debouncedTerm && debouncedTerm.length > 0;
  const { images, isLoading } = hasDebouncedTerm
    ? search.results[debouncedTerm] || { images: [], isLoading: false }
    : gifs;
  const endOfResults = document.querySelector('#end-of-results');
  const numberOfGifs = images.length;
  const hasGifs = numberOfGifs >= 1;
  function getIsVisible(el) {
    const elOffset = el.offsetTop + el.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    return pageOffset > elOffset;
  }
  useEffect(() => {
    function handleScroll() {
      if (!isLoading && getIsVisible(endOfResults)) {
        if (hasDebouncedTerm) {
          searchGifs(debouncedTerm, numberOfGifs + 1);
        } else {
          fetchGifs(numberOfGifs + 1);
        }
      }
    }
    const hasSpace = !hasGifs || getIsVisible(endOfResults);
    if (!isLoading && hasSpace) {
      if (hasDebouncedTerm) {
        searchGifs(debouncedTerm, hasGifs ? numberOfGifs + 1 : 0);
      } else {
        fetchGifs(hasGifs ? numberOfGifs + 1 : 0);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [
    debouncedTerm,
    endOfResults,
    isLoading,
    hasGifs,
    hasDebouncedTerm,
    numberOfGifs,
    searchGifs,
    fetchGifs
  ]);

  const { images: imagesToDisplay } =
    term && term.length > 0
      ? search.results[term] || { images: [], isLoading: false }
      : gifs;
  return (
    <>
      {fullscreen && fullscreen.length > 0 ? (
        <div className="fullscreen-wrapper">
          <img src={fullscreen} alt="" className="fullscreen-image" />
          <span
            className="fullscreen-button"
            onClick={e => {
              setFullScreen('');
            }}
          >
            &times;
          </span>
        </div>
      ) : null}
      <input
        className="search-box"
        type="text"
        placeholder="Search for a GIF..."
        onChange={e => setTerm(e.target.value)}
      />
      <div className="wrapper">
        {imagesToDisplay.map(gif => (
          <img
            className="image"
            key={gif.id}
            src={gif.images['preview_gif'].url}
            width={gif.images['preview_gif'].width}
            height={gif.images['preview_gif'].height}
            alt={gif.title}
            onClick={e => {
              setFullScreen(gif.images['original'].url);
            }}
          />
        ))}
      </div>
      <p id={'end-of-results'}>{isLoading ? 'Loading...' : 'The end!'}</p>
    </>
  );
};

App.propTypes = {
  fetchGifs: PropTypes.func,
  searchGifs: PropTypes.func,
  setFullScreen: PropTypes.func,
  gifs: PropTypes.object,
  search: PropTypes.object,
  fullscreen: PropTypes.string
};

App.defaultProps = {
  gifs: { isLoading: false, images: [] },
  search: { results: {} },
  fullscreen: '',
  fetchGifs: () => {},
  searchGifs: () => {},
  setFullScreen: () => {}
};

const mapStateToProps = ({ gifs, search, fullscreen }) => {
  return { gifs, search, fullscreen };
};

const mapDispatchToProps = {
  fetchGifs: offset => FETCH_GIFS(offset),
  searchGifs: (term, offset) => SEARCH_GIFS(term, offset),
  setFullScreen: url => SET_FULLSCREEN(url)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
