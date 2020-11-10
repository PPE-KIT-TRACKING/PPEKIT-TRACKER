import {
	INSERT_ORDER,
	CHANGE_ORDER_STATUS,
	FETCH_ORDERS,
	DELETE_ORDER
} from './ordersConstants';
import { asyncActionStart } from '../../async/asyncActions';
import { asyncActionFinish } from '../../async/asyncActions';

export const insertOrder = (order, orderId) => {
	return async (dispatch, getState, { getFirestore }) => {
		try {
			const firestore = getFirestore();
			await firestore
				.collection('orders')
				.doc(orderId)
				.set(order);
			dispatch({ type: INSERT_ORDER });
		} catch (error) {
			console.log(error);
			console.log('Bear');
		}
	};
};

export const changeOrderStatus = (orderId, costOffered, expired) => {
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
				...oldUser,
				email: firebase.auth().currentUser.email,
				uid: firebase.auth().currentUser.uid
			};
			dispatch(asyncActionStart());
			if (!expired)
				await firestore
					.collection('orders')
					.doc(orderId)
					.update({
						status: 'completed',
						manufacturer: newUser,
						completedDate: firebase.firestore.FieldValue.serverTimestamp(),
						costOffered: costOffered
					});
			else
				await firestore
					.collection('orders')
					.doc(orderId)
					.update({
						status: 'expired'
					});

			dispatch(asyncActionFinish());
		} catch (error) {
			console.log(error);
		}
	};
};

export const deleteOrder = orderId => {
	return async (dispatch, getState, { getFirestore }) => {
		try {
			const firestore = getFirestore();
			dispatch(asyncActionStart());
			await firestore
				.collection('orders')
				.doc(orderId)
				.delete();
			dispatch({ type: DELETE_ORDER });
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
