import { REMOVE_FROM_INVENTORY, ADD_TO_INVENTORY } from './inventoryConstants';
import { toastr } from 'react-redux-toastr';

export const removeFromInventory = (index, quantity) => {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		try {
			// let createdUser = await firebase
			// 	.auth()
			// 	.createUserWithEmailAndPassword(user.email, user.password);
			// const newUser = {
			// 	firstName: user.firstName,
			// 	lastName: user.lastName,
			// 	country: '',
			// 	state: '',
			// 	avatar: '/static/images/avatars/avatar_6.png',
			// 	type: user.type,
			// 	inventory: [],
			// 	phone: '',
			// 	registeredDate:firebase.firestore.FieldValue.serverTimestamp(),
			// };
			// await firestore.set(`users/${createdUser.uid}`, { ...newUser });
			// toastr.success('Success', 'User created sucessfully..!');
			// dispatch({ type: REGISTER_USER_SUCESS });

			if (quantity >= 0) {
				const inventory = getState().firebase.profile.inventory;
				inventory[index].quantity =
					inventory[index].quantity - quantity >= 0
						? inventory[index].quantity - quantity
						: 0;
				await firebase.updateProfile({
					inventory: inventory
				});
			}
			toastr.success('Success', 'Inventory updated sucessfully..!');
			dispatch({ type: REMOVE_FROM_INVENTORY });
		} catch (error) {
			toastr.error('Error', 'Inventory not Updated..!');
		}
	};
};

export const addToInventory = (index, quantity) => {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		try {
			if (quantity >= 0) {
				const inventory = getState().firebase.profile.inventory;
				inventory[index].quantity =
					inventory[index].quantity + quantity;
				await firebase.updateProfile({
					inventory: inventory
				});
			}
			toastr.success('Success', 'Inventory updated sucessfully..!');
			dispatch({ type: REMOVE_FROM_INVENTORY });
		} catch (error) {
			toastr.error('Error', 'Inventory not Updated..!');
		}
	};
};
