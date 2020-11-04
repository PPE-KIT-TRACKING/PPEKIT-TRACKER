import { SAVE_DETAILS, UPLOAD_PHOTO } from './accountConstants';
import { toastr } from 'react-redux-toastr';
import deepEqual from 'deep-equal';

export const saveDetails = user => {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		try {
			toastr.info('Warning', 'Details already updated..!');
			const {
				isEmpty,
				isLoaded,
				...oldUser
			} = getState().firebase.profile;
			const newUser = {
				...oldUser,
				...user
			};
			if (!deepEqual(oldUser, newUser)) {
				await firebase.updateProfile(newUser);
				toastr.success('Success', 'Your Details Saved..!');
			}
			dispatch({ type: SAVE_DETAILS });
		} catch (error) {}
	};
};

export const upload = image => {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		const storage = firebase.storage();

		try {
			await storage.ref(`avatars/${image.name}`).put(image);

			const URL = await storage
				.ref('avatars')
				.child(image.name)
				.getDownloadURL();
			const {
				isEmpty,
				isLoaded,
				...oldUser
			} = getState().firebase.profile;

			const newUser = {
				...oldUser,
				avatar: URL
			};
			await firebase.updateProfile(newUser);
			toastr.success('Success', 'Profile Photo Updated..!');
			dispatch({ type: UPLOAD_PHOTO });
		} catch (error) {
			toastr.error('Error', 'Profile photo not updated');
		}
	};
};
