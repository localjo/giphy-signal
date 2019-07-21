import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FETCH_GIFS } from '../actions';

export const App = ({ fetchGifs, gifs }) => {
  const { images, isLoading } = gifs;
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
      fetchGifs(numberOfGifs + 1);
    }
  }

  useEffect(() => {
    const hasSpace = !hasGifs || getIsVisible(endOfResults);
    if (!isLoading && hasSpace) {
      fetchGifs(hasGifs ? numberOfGifs + 1 : 0);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <>
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
  gifs: PropTypes.object
};

App.defaultProps = {
  gifs: { isLoading: false, images: [] },
  fetchGifs: () => {}
};

const mapStateToProps = ({ gifs }) => {
  return { gifs };
};

const mapDispatchToProps = {
  fetchGifs: offset => FETCH_GIFS(offset)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
