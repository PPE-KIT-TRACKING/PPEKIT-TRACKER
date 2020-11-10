import { asyncActionStart } from '../../async/asyncActions';
import { asyncActionFinish } from '../../async/asyncActions';
import { INSERT_REQUEST, REMOVE_REQUEST } from './requestsConstants';

export const insertRequest = request => {
	return async (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
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

