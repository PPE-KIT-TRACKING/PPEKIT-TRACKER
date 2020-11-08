import { ADD_TO_CART } from './marketConstants';
import { createReducer } from '../../../app/common/utils/reducerUtil';
import { v4 as uuid } from 'uuid';

const initialState = [];

export const addToCartReducer = (state = initialState, payload) => {
	const newState = [...state];
	const updatedProduct = Object.assign({}, payload.product);
	if (updatedProduct.count != 0) {
		let alreadyinCart = false;

		for (let i = 0; i < newState.length; i++) {
			if (updatedProduct.id === newState[i].id) {
				newState[i].count = newState[i].count + updatedProduct.count;
				alreadyinCart = true;
				break;
			}
		}
		if (!alreadyinCart) {
			newState.push(updatedProduct);
		}
	}
	return newState;
};

export default createReducer(initialState, {
	[ADD_TO_CART]: addToCartReducer
});
