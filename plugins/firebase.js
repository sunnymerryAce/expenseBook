import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  // Please insert Firebase infomation here
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
