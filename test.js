const handleUpload = () => {
	const uploadTask = storage.ref(`images/${image.name}`).put(image);
	uploadTask.on();
};
