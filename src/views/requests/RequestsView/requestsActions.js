import { REMOVE_FROM_INVENTORY } from 'src/views/inventory/InventoryView/inventoryConstants';
import { asyncActionStart } from '../../async/asyncActions';
import { asyncActionFinish } from '../../async/asyncActions';
import { INSERT_REQUEST, REMOVE_REQUEST } from './requestsConstants';

export const insertRequest = request => {
	return async (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		// const requests = initialState();
		// await firestore
		// 	.collection('requests')
		// 	.doc()
		// 	.set(requests[0]);
		// await firestore
		// 	.collection('requests')
		// 	.doc()
		// 	.set(requests[1]);
		await firestore
			.collection('requests')
			.doc()
			.set(request);
		dispatch({ type: INSERT_REQUEST });
	};
};

export const removeRequest = requestId => {
	return async (dispatch, getState, { getFirestore }) => {
		try {
			const firestore = getFirestore();
			dispatch(asyncActionStart());
			await firestore
				.collection('requests')
				.doc(requestId)
				.delete();
			dispatch({ type: REMOVE_REQUEST });
			dispatch(asyncActionFinish());
		} catch (error) {
			console.log(error);
		}
	};
};

function createData(name, location, requiredby, verified, ppeNeeded) {
	return {
		name,
		location,
		requiredby,
		verified,
		ppeNeeded
	};
}

const initialState = () => [
	createData('Ankur Hospital', 'New Delhi', '31/10/2020', 'Yes', [
		{ orderId: 1, item: 'Sanitizer', quantity: 5 },
		{ orderId: 2, item: 'Mask', quantity: 5 },
		{ orderId: 1, item: 'Gloves', quantity: 10 }
	]),
	createData('Vishal Hospital', 'New Delhi', '31/10/2020', 'Yes', [
		{ orderId: 1, item: 'Sanitizer', quantity: 5 },
		{ orderId: 2, item: 'Mask', quantity: 5 },
		{ orderId: 3, item: 'Gloves', quantity: 10 }
	]),
	createData('Kriplani Hospital', 'New Delhi', '31/10/2020', 'Yes', [
		{ orderId: 1, item: 'Sanitizer', quantity: 5 },
		{ orderId: 2, item: 'Mask', quantity: 5 },
		{ orderId: 3, item: 'Gloves', quantity: 10 }
	])
];
