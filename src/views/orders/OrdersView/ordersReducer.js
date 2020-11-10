import { createReducer } from '../../../app/common/utils/reducerUtil';
import {
	INSERT_ORDER,
	CHANGE_ORDER_STATUS,
	DELETE_ORDER
} from './ordersConstants';

const initialState = [
	
];

export const insertOrder = (state, payload) => {
	return state;
};

export const changeOrderStatus = (state, payload) => {
	const newstate = state.map((value, index, array) => {
		if (value.id === payload.orderId)
			return Object.assign({}, { ...value, status: 'completed' });

		return value;
	});

	return newstate;
};

export const deleteOrder = (state, payload) => {
	return state;
};

export default createReducer(initialState, {
	[INSERT_ORDER]: insertOrder,
	[CHANGE_ORDER_STATUS]: changeOrderStatus,
	[DELETE_ORDER]: deleteOrder
});
