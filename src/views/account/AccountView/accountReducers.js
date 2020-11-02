import { SAVE_DETAILS, UPLOAD_PHOTO } from './accountConstants';
import { createReducer } from '../../app/common/utils/reducerUtil';

const initialState = {};

export const saveDetails = (state, payload) => {
	return state;
};
export const upload = (state, payload) => {
	return state;
};

export default createReducer(initialState, {
	[SAVE_DETAILS]: saveDetails,
	[UPLOAD_PHOTO]: upload
});
