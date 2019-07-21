import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FETCH_GIFS } from '../actions';
export class App extends React.Component {
  componentDidMount() {
    const { fetchGifs, gifs } = this.props;
    if (!gifs || gifs.length <= 0) {
      fetchGifs();
    }
  }
  render() {
    const { fetchGifs, gifs } = this.props;
    const style = {
      wrapper: { display: 'flex', flexWrap: 'wrap', margin: '5px 0 0 5px' },
      image: {
        height: '100px',
        margin: '0 5px 5px 0',
        flex: '1 0 auto'
      }
    };
    return (
      <>
        <div style={style.wrapper}>
          {gifs.map(gif => (
            <img
              style={style.image}
              key={gif.id}
              src={gif.images['preview_gif'].url}
              alt={gif.title}
            />
          ))}
        </div>
        <button onClick={() => fetchGifs(gifs.length + 1)}>Load More</button>
      </>
    );
  }
}

App.propTypes = {
  fetchGifs: PropTypes.func,
  gifs: PropTypes.array
};

App.defaultProps = {
  gifs: [],
  fetchGifs: () => {}
};

const mapStateToProps = ({ counter, gifs }) => {
  return { counter, gifs };
};

const mapDispatchToProps = {
  fetchGifs: offset => FETCH_GIFS(offset)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
