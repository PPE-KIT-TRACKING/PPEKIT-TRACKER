import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCusGiXYdJrdijOSAoLTPfCfAMU-_GuZnk',
	authDomain: 'ppetracker-9a27e.firebaseapp.com',
	databaseURL: 'https://ppetracker-9a27e.firebaseio.com',
	projectId: 'ppetracker-9a27e',
	storageBucket: 'ppetracker-9a27e.appspot.com',
	messagingSenderId: '968150066045',
	appId: '1:968150066045:web:ffc705f881b830efb62214',
	measurementId: 'G-HGWR2H1JSB'
};

firebase.initializeApp(firebaseConfig);
export default firebase;
