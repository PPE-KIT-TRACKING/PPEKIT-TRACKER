import {
	INSERT_ORDER,
	CHANGE_ORDER_STATUS,
	FETCH_ORDERS
} from './ordersConstants';
import { asyncActionStart } from '../../async/asyncActions';
import { asyncActionFinish } from 'src/views/async/asyncActions';
export const insertOrder = order => {
	return {
		type: INSERT_ORDER,
		payload: {
			order
		}
	};
};

export const changeOrderStatus = orderId => {
	return {
		type: CHANGE_ORDER_STATUS,
		payload: {
			orderId
		}
	};
};

export const fetchOrders = orders => {
	return {
		type: CHANGE_ORDER_STATUS,
		payload: orders
	};
};

export const loadOrders = () => {
	return async (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore;
		try {
			dispatch(asyncActionStart());
			let orders = firestore.collection('orders');
			dispatch(asyncActionFinish());
		} catch (error) {
			console.log(err);
		}
	};
};
