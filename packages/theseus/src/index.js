import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Routes from './routes';
import { GlobalStyle } from './styles/global-styles';
import registerServiceWorker from './utils/registerServiceWorker';

render(
  <Provider store={configureStore()}>
    <GlobalStyle />
    <Routes />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
