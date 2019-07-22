import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FETCH_GIFS, SEARCH_GIFS, SEARCH_TERM_CHANGED } from '../actions';

export const App = ({
  fetchGifs,
  searchGifs,
  changeSearchTerm,
  gifs,
  search
}) => {
  const { term } = search;
  const hasSearchTerm = term && term.length >= 1;
  const imageSet = hasSearchTerm ? search.results[term] : gifs;
  const { images, isLoading } = imageSet;
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

  function handleScroll() {
    if (!isLoading && getIsVisible(endOfResults)) {
      if (hasSearchTerm) {
        searchGifs(term, numberOfGifs + 1);
      } else {
        fetchGifs(numberOfGifs + 1);
      }
    }
  }

  useEffect(() => {
    const hasSpace = !hasGifs || getIsVisible(endOfResults);
    if (!isLoading && hasSpace) {
      if (hasSearchTerm) {
        searchGifs(term, hasGifs ? numberOfGifs + 1 : 0);
      } else {
        fetchGifs(hasGifs ? numberOfGifs + 1 : 0);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <>
      <input
        type="text"
        placeholder="Search for a GIF..."
        value={term}
        onChange={e => {
          changeSearchTerm(e.target.value);
        }}
      />
      <div style={style.wrapper}>
        {images.map(gif => (
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
  changeSearchTerm: PropTypes.func,
  gifs: PropTypes.object,
  search: PropTypes.object
};

App.defaultProps = {
  gifs: { isLoading: false, images: [] },
  search: { term: '', results: {} },
  fetchGifs: () => {},
  searchGifs: () => {},
  changeSearchTerm: () => {}
};

const mapStateToProps = ({ gifs, search }) => {
  return { gifs, search };
};

const mapDispatchToProps = {
  fetchGifs: offset => FETCH_GIFS(offset),
  searchGifs: (term, offset) => SEARCH_GIFS(term, offset),
  changeSearchTerm: term => SEARCH_TERM_CHANGED({ term })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
