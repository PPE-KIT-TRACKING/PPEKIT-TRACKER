import {
	LOGIN_USER_SUCESS,
	LOGIN_USER_ERR,
	REGISTER_USER_SUCESS,
	REGISTER_USER_ERR,
	SIGN_OUT_USER
} from './authConstants';
import { toastr } from 'react-redux-toastr';
import { firestore } from 'firebase';
import data from '../customer/CustomerListView/data';

export const login = creds => {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		try {
			await firebase
				.auth()
				.signInWithEmailAndPassword(creds.email, creds.password);
			dispatch({ type: LOGIN_USER_SUCESS });
	
		} catch (error) {
			dispatch({
				type: LOGIN_USER_ERR,
				payload: { message: 'Please enter valid email/password...!' }
			});
		}
	};
};

export const logout = () => {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		try {
			await firebase.auth().signOut();
			dispatch({ type: SIGN_OUT_USER });
		} catch (error) {}
	};
};

export const register = user => {
	return async (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();
		try {
			let createdUser = await firebase
				.auth()
				.createUserWithEmailAndPassword(user.email, user.password);
			const newUser = {
				name: user.firstName + ' ' + user.lastName,
				avatar: '/static/images/avatars/avatar_6.png',
				type: user.type,
				orders:[]
			};
			await firestore.set(`users/${createdUser.uid}`, { ...newUser });
			dispatch({ type: REGISTER_USER_SUCESS });
		} catch (error) {
			dispatch({
				type: REGISTER_USER_ERR,
				payload: { message: 'Email already registered..!' }
			});
		}
	};
};
