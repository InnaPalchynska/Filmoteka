// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
import 'firebase/firestore';

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
    //add
    const uid = user.uid;
    db.collection('watched')
      .doc(uid)
      .update({
        movieId: firebase.firestore.FieldValue.arrayUnion('greater_virginia1'),
      })
      .then(function () {
        console.log('Document written.');
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });

    // get
    db.collection('watched')
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          const watchedMovies = doc.data().movieId;
          console.log('Document data:', watchedMovies);
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
