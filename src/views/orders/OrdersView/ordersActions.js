import {
	INSERT_ORDER,
	CHANGE_ORDER_STATUS,
	FETCH_ORDERS
} from './ordersConstants';
import { asyncActionStart } from '../../async/asyncActions';
import { asyncActionFinish } from '../../async/asyncActions';
import { firebase, getFirebase } from 'react-redux-firebase';

export const insertOrder = order => {
	return {
		type: INSERT_ORDER,
		payload: {
			order
		}
	};
};

export const changeOrderStatus = orderId => {
	return async (dispatch, getState, { getFirestore, getFirebase }) => {
		try {
			const firestore = getFirestore();
			const firebase = getFirebase();
			const {
				isEmpty,
				isLoaded,
				...oldUser
			} = getState().firebase.profile;
			const newUser = {
				...oldUser
			};
			dispatch(asyncActionStart());
			await firestore
				.collection('orders')
				.doc(orderId)
				.update({
					status: 'completed',
					manufacturer: newUser
				});
			await firebase.updateProfile({
				orders: [...newUser.orders, orderId]
			});
			dispatch(asyncActionFinish());
		} catch (error) {
			console.log(error);
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
		try {
			// const firestore = getFirestore();
			dispatch(asyncActionStart());

			// const querySnap = await firestore.collection('orders').get()

			// if (querySnap.docs.length === 0) {
			// 	dispatch(asyncActionFinish());
			// 	return querySnap;
			// }

			// const orders = [];
			// for (let order of querySnap.docs) {
			// 	order = { ...order.data(), id: order.id }
			// 	orders.push(order)
			// }

			dispatch(asyncActionFinish());
		} catch (error) {
			console.log(error);
		}
	};
};
