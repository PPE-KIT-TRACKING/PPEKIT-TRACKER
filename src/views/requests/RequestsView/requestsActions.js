import { asyncActionStart } from '../../async/asyncActions';
import { asyncActionFinish } from '../../async/asyncActions';

export const insertRequest = request => {
	return async (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const requests = initialState();
		await firestore
			.collection('requests')
			.doc()
			.set(requests[0]);
		await firestore
			.collection('requests')
			.doc()
			.set(requests[1]);
		await firestore
			.collection('requests')
			.doc()
			.set(requests[2]);
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
