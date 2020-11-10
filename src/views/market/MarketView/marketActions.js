import { ADD_TO_CART } from './marketConstants';
import { toastr } from 'react-redux-toastr';

export const addToCart = product => {
	return dispatch => {
		dispatch({
			type: ADD_TO_CART,
			payload: { product: product }
		});
		
		if (product.count === 0) {
			toastr.warning('Empty action', 'Increase count of product from 0');
		} else {
			toastr.success('Item added successfully....');
		}
	};
};
