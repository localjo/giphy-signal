import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureAppStore from './configureAppStore';
import App from './components/App';

const store = configureAppStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
