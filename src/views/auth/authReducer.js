import {
	LOGIN_USER_SUCESS,
	LOGIN_USER_ERR,
	SIGN_OUT_USER,
	REGISTER_USER_SUCESS,
	REGISTER_USER_ERR,
	UPDATE_PASSWORD_ERR,
	UPDATE_PASSWORD_SUCESS
} from './authConstants';
import { createReducer } from '../../app/common/utils/reducerUtil';

const initialState = {
	currentUser: null,
	authError: false,
	registerError: false,
	_error: ''
};

export const loginUser = (state, payload) => {
	return state;
};

export const loginUserErr = (state, payload) => {
	return {
		...state,
		authError: true,
		_error: payload.message
	};
};

export const signOutUser = (state, payload) => {
	return {
		...state
	};
};

export const signOutUserErr = (state, payload) => {
	return {
		...state
	};
};

export const register = (state, payload) => {
	return {
		...state
	};
};

export const registerErr = (state, payload) => {
	return {
		...state,
		registerError: true,
		_error: payload.message
	};
};

export const updatePasswordErr = (state, payload) => {
	return {
		...state,
		_error: payload.message
	};
};

export const updatePassword = (state, payload) => {
	return {
		...state
	};
};

export default createReducer(initialState, {
	[LOGIN_USER_SUCESS]: loginUser,
	[LOGIN_USER_ERR]: loginUserErr,
	[SIGN_OUT_USER]: signOutUser,
	[REGISTER_USER_SUCESS]: register,
	[REGISTER_USER_ERR]: registerErr,
	[UPDATE_PASSWORD_SUCESS]: updatePassword,
	[UPDATE_PASSWORD_ERR]: updatePasswordErr
});
