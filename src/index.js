import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { configureStore } from './app/store/configureStore';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const store = configureStore();

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<div>
				<ReduxToastr
					timeOut={4000}
					newestOnTop={false}
					preventDuplicates
					position="top-right"
					getState={state => state.toastr} // This is the default
					transitionIn="fadeIn"
					transitionOut="fadeOut"
					progressBar
					closeOnToastrClick
				/>
				<App />
			</div>
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

serviceWorker.unregister();
