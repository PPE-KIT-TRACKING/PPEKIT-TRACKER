import { ADD_TO_CART } from './marketConstants';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import ProductCard from 'src/views/product/ProductListView/ProductCard';

export const addToCart = product => {
	return dispatch => {
		dispatch({
			type: ADD_TO_CART,
			payload: { product: product }
		});
	};
};
