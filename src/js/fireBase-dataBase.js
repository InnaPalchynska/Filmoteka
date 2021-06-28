import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';

if (!initializeApp.length) {
  const firebaseApp = initializeApp({
    apiKey: 'AIzaSyBEb1huf_meo1LJ-mMkHS6QuTVDhqJ5x3I',
    authDomain: 'filmoteka-9136d.firebaseapp.com',
    databaseURL:
      'https://filmoteka-9136d-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'filmoteka-9136d',
    storageBucket: 'filmoteka-9136d.appspot.com',
    messagingSenderId: '904812622933',
    appId: '1:904812622933:web:c5ae777769ec7ec58490dc',
  });
}

const db = getFirestore();
const auth = getAuth();

function getUser() {
  const user = auth.currentUser;

  if (user) {
    console.log(user.uid);
  } else {
    console.log('No user is signed in.');
  }
}

setTimeout(getUser, 1000);

function getLibraryMovies() {
  const unsub = onSnapshot(doc(db, 'watched', auth.currentUser.uid), doc => {
    console.log('Current data: ', doc.data().movieId);
  });
}

setTimeout(getLibraryMovies, 2000);

async function addMoviesToLibrary() {
  const docRef = doc(db, 'watched', auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      movieId: arrayUnion('333greater_virginia'),
    });
  } else {
    await setDoc(docRef, {
      movieId: ['greater_virginia'],
    });
  }
}

async function removeMoviesFromLibrary() {
  const docRef = doc(db, 'watched', auth.currentUser.uid);
  await updateDoc(docRef, {
    movieId: arrayRemove('greater_virginia'),
  });
}

// setTimeout(addMoviesToLibrary, 3000);

function onQueueButton(e) {
  addMoviesToLibrary;
  //   updateLocalStorage(e, 'queue');
  //   renderLibraryMovies('queue');
}

export { onQueueButton };
