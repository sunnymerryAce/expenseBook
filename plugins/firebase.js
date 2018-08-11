import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  // Please insert Firebase Infomation here
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
