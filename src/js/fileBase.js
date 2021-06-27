// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import 'firebase/analytics';

// Add the Firebase products that you want to use
// import 'firebase/auth';
import 'firebase/firestore';
// import { collection, query, where, onSnapshot } from 'firebase/firestore';
// const firebase = require('firebase');
// const firebaseui = require('firebaseui');

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: 'AIzaSyBEb1huf_meo1LJ-mMkHS6QuTVDhqJ5x3I',
  authDomain: 'filmoteka-9136d.firebaseapp.com',
  databaseURL:
    'https://filmoteka-9136d-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-9136d',
  storageBucket: 'filmoteka-9136d.appspot.com',
  messagingSenderId: '904812622933',
  appId: '1:904812622933:web:c5ae777769ec7ec58490dc',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    db.collection('watched')
      .doc(uid)
      .update({
        // userUid: user.uid,
        movieId: firebase.firestore.FieldValue.arrayUnion('greater_virginia1'),
      })
      .then(function () {
        console.log('Document written.');
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
    // get

    const docRef = db.collection('watched').doc(uid);

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log('Document data:', doc.data().movieId);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });

    // delete
    db.collection('watched')
      .doc(uid)
      .update({
        // userUid: user.uid,
        movieId: firebase.firestore.FieldValue.arrayRemove('greater_virginia1'),
      })
      .then(function () {
        console.log('Document written.');
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  } else {
    console.log('User is signed out');
  }
});
