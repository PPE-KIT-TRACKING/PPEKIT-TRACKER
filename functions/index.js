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
		const activities = {};
		let iterable = 0;
		for (let index = 0; index < pInventory.length; index++) {
			if (pInventory[index].quantity !== aInventory[index].quantity) {
				const minorActivity = {
					index: index,
					item: aInventory[index],
					quantityDiff:
						aInventory[index].quantity - pInventory[index].quantity,
					timestamp: new Date()
				};
				activities[iterable] = minorActivity;
				isUpdated = true;
				iterable += 1;
			}
		}
		if (isUpdated === false) return null;

		const newUser = change.after.data();

		newUser.activity.push(activities);
		return admin
			.firestore()
			.collection('users')
			.doc(userId)
			.update(newUser)
			.then(ref => console.log(ref))
			.catch(err => console.log(err));
	});
