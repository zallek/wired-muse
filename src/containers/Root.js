import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from 'configureStore';
import App from 'containers/App';

import './Root.css';
import 'bootstrap/dist/css/bootstrap.css';


const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
}
