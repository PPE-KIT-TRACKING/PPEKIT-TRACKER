import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { configureStore } from './app/store/configureStore'
import { Provider } from 'react-redux';


const store = configureStore();

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
