import {
	INSERT_ORDER,
	DELETE_ORDER
} from './ordersConstants';
import { asyncActionStart } from '../../async/asyncActions';
import { asyncActionFinish } from '../../async/asyncActions';
import { toastr } from 'react-redux-toastr';

export const insertOrder = (order, orderId) => {
	return async (dispatch, getState, { getFirestore }) => {
		try {
			const firestore = getFirestore();
			await firestore
				.collection('orders')
				.doc(orderId)
				.set(order);
			dispatch({ type: INSERT_ORDER });
			toastr.success('Success', 'Order has been placed sucessfully..!');
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



