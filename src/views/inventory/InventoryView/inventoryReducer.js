import {
	REMOVE_FROM_INVENTORY,
	ADD_TO_INVENTORY,
	ADD_TO_HOSPITAL_INVENTORY
} from './inventoryConstants';
import { createReducer } from '../../app/common/utils/reducerUtil';

export const removeFromInventory = (state, payload) => {
	return state;
};

export const addToInventory = (state, payload) => {
	return state;
};

export const addToHospitalInventory = (state, payload) => {
	return state;
};

export default createReducer(initialState, {
	[REMOVE_FROM_INVENTORY]: removeFromInventory,
	[ADD_TO_INVENTORY]: addToInventory,
	[ADD_TO_HOSPITAL_INVENTORY]: addToHospitalInventory
});
