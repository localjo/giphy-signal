import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FETCH_GIFS } from '../actions';
export class App extends React.Component {
  render() {
    const { fetchGifs, gifs } = this.props;
    return (
      <>
        <h1 className="header">Giphy Signal</h1>
        <button onClick={() => fetchGifs()}>Fetch GIFs</button>
        <ul>
          {gifs.map(gif => (
            <li key={gif.id}>{gif.title}</li>
          ))}
        </ul>
      </>
    );
  }
}

App.propTypes = {
  fetchGifs: PropTypes.func,
  gifs: PropTypes.array
};

App.defaultProps = {
  gifs: []
};

const mapStateToProps = ({ counter, gifs }) => {
  return { counter, gifs };
};

const mapDispatchToProps = {
  fetchGifs: FETCH_GIFS
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
