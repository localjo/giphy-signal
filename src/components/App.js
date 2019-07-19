import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  COUNTER_INCREMENT,
  COUNTER_DECREMENT,
  COUNTER_RESET
} from '../actions';
export class App extends React.Component {
  render() {
    const { increment, decrement, reset, counter } = this.props;
    return (
      <>
        <h1 className="header">Giphy Signal: {counter}</h1>
        <button onClick={() => increment(1)}>Increment</button>
        <button onClick={() => decrement(1)}>Decrement</button>
        <button onClick={() => reset()}>Reset</button>
      </>
    );
  }
}

App.propTypes = {
  increment: PropTypes.func,
  decrement: PropTypes.func,
  reset: PropTypes.func,
  counter: PropTypes.number
};

const mapStateToProps = ({ counter }) => {
  return { counter };
};

const mapDispatchToProps = {
  increment: COUNTER_INCREMENT,
  decrement: COUNTER_DECREMENT,
  reset: COUNTER_RESET
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
