import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import { compose, createStore } from 'redux';
import { rootReduser } from './redux/rootReduser';
import { Provider } from 'react-redux';

const store = createStore(rootReduser, compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);