import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCWfMZrjUkvyLyCrIu3pT6ka3dB13-Cd4o",
    authDomain: "react-firebase-d2a77.firebaseapp.com",
    databaseURL: "https://react-firebase-d2a77.firebaseio.com",
    projectId: "react-firebase-d2a77",
    storageBucket: "react-firebase-d2a77.appspot.com",
    messagingSenderId: "546161780743",
    appId: "1:546161780743:web:d52b443508f618268be2a2"
}
firebase.initializeApp(config);

export default firebase;