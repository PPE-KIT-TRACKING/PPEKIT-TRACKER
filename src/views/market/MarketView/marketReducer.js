import { ADD_TO_CART } from './marketConstants';
import { createReducer } from '../../../app/common/utils/reducerUtil';
import { v4 as uuid } from 'uuid';

const initialState = [];

export const addToCartReducer = (state = initialState, payload) => {
	const updatedProduct = Object.assign({}, payload.product);
	let alreadyinCart = false;

	const newState = state.map(product => {
		if (updatedProduct.uid === product.uid) {
			alreadyinCart = true;
			return updatedProduct;
		}
		return product;
	});
	if (!alreadyinCart) {
		newState.push(updatedProduct);
	}
	return newState;
};

export default createReducer(initialState, {
	[ADD_TO_CART]: addToCartReducer
});
