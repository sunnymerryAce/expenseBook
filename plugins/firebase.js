import * as firebase from 'firebase';
import 'firebase/firestore';

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
  // Firestore オフラインデータの有効化
  firebase
    .firestore()
    .enablePersistence()
    .catch(function(err) {
      if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
      } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
      }
    });
}

export default firebase;
