import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FETCH_GIFS, SEARCH_GIFS } from '../actions';

export const App = ({ fetchGifs, searchGifs, gifs, search }) => {
  const [term, setTerm] = useState('');
  const debouncedTerm = useDebounce(term, 500)[0];
  const hasDebouncedTerm = debouncedTerm && debouncedTerm.length > 0;
  const { images, isLoading } = hasDebouncedTerm
    ? search.results[debouncedTerm] || { images: [], isLoading: false }
    : gifs;
  const endOfResults = document.querySelector('#end-of-results');
  const numberOfGifs = images.length;
  const hasGifs = numberOfGifs >= 1;
  const style = {
    wrapper: { display: 'flex', flexWrap: 'wrap', margin: '5px 0 0 5px' },
    image: {
      height: '100px',
      margin: '0 5px 5px 0',
      flex: '1 0 auto'
    }
  };
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
      <input
        type="text"
        placeholder="Search for a GIF..."
        onChange={e => setTerm(e.target.value)}
      />
      <div style={style.wrapper}>
        {imagesToDisplay.map(gif => (
          <img
            style={style.image}
            key={gif.id}
            src={gif.images['preview_gif'].url}
            alt={gif.title}
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
  gifs: PropTypes.object,
  search: PropTypes.object
};

App.defaultProps = {
  gifs: { isLoading: false, images: [] },
  search: { term: '', results: {} },
  fetchGifs: () => {},
  searchGifs: () => {}
};

const mapStateToProps = ({ gifs, search }) => {
  return { gifs, search };
};

const mapDispatchToProps = {
  fetchGifs: offset => FETCH_GIFS(offset),
  searchGifs: (term, offset) => SEARCH_GIFS(term, offset)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
