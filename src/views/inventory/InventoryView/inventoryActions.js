import {
	REMOVE_FROM_INVENTORY,
	ADD_TO_INVENTORY,
	ADD_TO_HOSPITAL_INVENTORY
} from './inventoryConstants';
import { toastr } from 'react-redux-toastr';
import { getFirestore } from 'redux-firestore';

export const removeFromInventory = (index, quantity) => {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		try {
			
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
			dispatch({ type: ADD_TO_INVENTORY });
		} catch (error) {
			toastr.error('Error', 'Inventory not Updated..!');
		}
	};
};

export const addToHospitalInventory = (orderId,index, quantity) => {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();
		try {
			if (quantity >= 0) {
				let querySnap = await firestore.collection('orders').doc(orderId).get()
				const hospitalId = querySnap.data().hospital.uid;
				querySnap = await firestore.collection('users').doc(hospitalId).get()
				let inventory = querySnap.data().inventory
				inventory[index].quantity += quantity;
				await firestore
						.collection('users')
						.doc(hospitalId)
					 .update({
							inventory:inventory
						});
			}
			dispatch({ type: ADD_TO_HOSPITAL_INVENTORY });
		} catch (error) {
			console.log(error);
		}
	};
};