import { combineReducers } from 'redux';
import authReducer from '../../views/auth/authReducer';
import ordersReducer from '../../views/orders/OrdersView/ordersReducer';
import requestsReducer from '../../views/requests/RequestsView/requestsReducer';
import asyncReducer from '../../views/async/asyncReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { reducer as toastrReducer } from 'react-redux-toastr';

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	auth: authReducer,
	orders: ordersReducer,
	requests: requestsReducer,
	async: asyncReducer,
	toastr: toastrReducer
});

export default rootReducer;
