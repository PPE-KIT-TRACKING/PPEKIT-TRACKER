import {
	REMOVE_FROM_INVENTORY,
	ADD_TO_INVENTORY,
	ADD_TO_HOSPITAL_INVENTORY
} from './inventoryConstants';
import { toastr } from 'react-redux-toastr';
import { getFirestore } from 'redux-firestore';

export const removeFromInventory = items => {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		try {
			const inventory = getState().firebase.profile.inventory;
			for (let item of items) {
				let index = item.index;
				let quantity = Number(item.quantity);
				inventory[index].quantity =
					Number(inventory[index].quantity) - quantity >= 0
						? Number(inventory[index].quantity) - quantity
						: 0;
			}

			await firebase.updateProfile({
				inventory: inventory
			});

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
		quantity = Number(quantity);
		try {
			if (quantity >= 0) {
				const inventory = getState().firebase.profile.inventory;
				inventory[index].quantity =
					Number(inventory[index].quantity) + Number(quantity);
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

export const addToHospitalInventory = (orderId, items) => {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();
		try {
			let querySnap = await firestore
				.collection('orders')
				.doc(orderId)
				.get();
			const hospitalId = querySnap.data().hospital.uid;
			querySnap = await firestore
				.collection('users')
				.doc(hospitalId)
				.get();
			let inventory = querySnap.data().inventory;
			for (const item of items) {
				let index = item.index;
				let quantity = item.quantity;
				inventory[index].quantity =
					Number(inventory[index].quantity) + Number(quantity);
			}
			console.log('in actions ', inventory, items);
			await firestore
				.collection('users')
				.doc(hospitalId)
				.update({
					inventory: inventory
				});

			dispatch({ type: ADD_TO_HOSPITAL_INVENTORY });
		} catch (error) {
			console.log(error);
			console.log('high');
		}
	};
};
