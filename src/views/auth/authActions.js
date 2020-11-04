import {
	LOGIN_USER_SUCESS,
	LOGIN_USER_ERR,
	REGISTER_USER_SUCESS,
	REGISTER_USER_ERR,
	SIGN_OUT_USER,
	UPDATE_PASSWORD_SUCESS,
	UPDATE_PASSWORD_ERR
} from './authConstants';
import { toastr } from 'react-redux-toastr';
import moment from "moment";

export const login = creds => {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		try {
			await firebase
				.auth()
				.signInWithEmailAndPassword(creds.email, creds.password);
			toastr.success('Success', 'Logged in..!');
			dispatch({ type: LOGIN_USER_SUCESS });
		} catch (error) {
			dispatch({
				type: LOGIN_USER_ERR,
				payload: { message: 'Please enter valid email/password...!' }
			});
			toastr.error('Error', 'Please enter valid email/password...!');
		}
	};
};

export const logout = () => {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		try {
			await firebase.auth().signOut();
			toastr.success('Success', 'Logout Sucessfully..!');
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
				firstName: user.firstName,
				lastName: user.lastName,
				country: '',
				state: '',
				avatar: '/static/images/avatars/avatar_6.png',
				type: user.type,
				inventory: [],
				phone: '',
				registeredDate:firebase.firestore.FieldValue.serverTimestamp(),
			};
			await firestore.set(`users/${createdUser.uid}`, { ...newUser });
			toastr.success('Success', 'User created sucessfully..!');
			dispatch({ type: REGISTER_USER_SUCESS });
		} catch (error) {
			dispatch({
				type: REGISTER_USER_ERR,
				payload: { message: 'Email already registered..!' }
			});
			toastr.error('Error', 'Email already registered..!');
		}
	};
};

const reauthenticate = (currentPassword, user, firebase) => {
	var cred = firebase.auth.EmailAuthProvider.credential(
		user.email,
		currentPassword
	);
	return user.reauthenticateWithCredential(cred);
};

export const updatePassword = (currentPassword, newPassword, valid) => {
	return async (dispatch, getState, { getFirebase }) => {
		if (valid) {
			const firebase = getFirebase();
			try {
				var user = firebase.auth().currentUser;
				await reauthenticate(currentPassword, user, firebase);
				await user.updatePassword(newPassword);
				dispatch({
					type: UPDATE_PASSWORD_SUCESS
				});
				toastr.success('Success', 'Password Updated sucessfully..!');
			} catch (error) {
				dispatch({
					type: UPDATE_PASSWORD_ERR,
					payload: { message: 'Password not changed..!' }
				});
				toastr.error('Error', 'Enter valid old password..!');
			}
		} else {
			dispatch({
				type: UPDATE_PASSWORD_ERR,
				payload: { message: 'Password not changed..!' }
			});
			toastr.error('Error', 'Enter same password in confirmation..!');
		}
	};
};
