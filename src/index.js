import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { CssBaseline } from '@material-ui/core';
import './index.scss'
import "@fontsource/quicksand" 
ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById('root')
);
