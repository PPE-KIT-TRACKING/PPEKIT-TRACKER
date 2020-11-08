const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.createActivity = functions.firestore
	.document('users/{userId}')
	.onUpdate((change, context) => {
		const userId = context.params.userId;
		const pInventory = change.before.data().inventory;
		const aInventory = change.after.data().inventory;
		let isUpdated = false;
		for (let index = 0; index < pInventory.length; index++) {
			if (pInventory[index].quantity !== aInventory[index].quantity)
				isUpdated = index;
		}
		if (isUpdated === false) return null;

		const newUser = change.after.data();
		const activity = {
			index: isUpdated,
			item: aInventory[isUpdated],
			quantityDiff:
				aInventory[isUpdated].quantity - pInventory[isUpdated].quantity,
			timestamp: new Date()
		};
		newUser.activity.push(activity);
		return admin
			.firestore()
			.collection('users')
			.doc(userId)
			.update(newUser)
			.then(ref => console.log(ref))
			.catch(err => console.log(err));
	});
