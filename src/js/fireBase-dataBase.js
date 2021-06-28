import firebaseApp from './initializeApp-fileBase';
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

import { renderLibraryMovies } from './render-library-movies';

const db = getFirestore();
const auth = getAuth();

function getUser() {
  const user = auth.currentUser;

  if (user) {
    console.log(user.uid);
    return user.uid;
  } else {
    console.log('No user is signed in.');
  }
}

// setTimeout(getUser, 1000);

async function getLibraryMovies(libraryType) {
  const currentUserUid = getUser();
  // const unsub = await onSnapshot(doc(db, libraryType, currentUserUid), doc => {
  //   return doc.data().movieId;
  // });
  // console.log(unsub);
  // return  unsub;

  const docRef = doc(db, libraryType, currentUserUid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().movieId;
  } else {
    console.log('No movies yet...');
  }
}

// setTimeout(getLibraryMovies, 2000);

async function addMoviesToLibrary(libraryType, movieId) {
  const currentUserUid = getUser();
  const docRef = doc(db, libraryType, currentUserUid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      movieId: arrayUnion(movieId),
    });
  } else {
    await setDoc(docRef, {
      movieId: [movieId],
    });
  }
}

async function removeMoviesFromLibrary(libraryType, movieId) {
  const currentUserUid = getUser();
  const docRef = doc(db, libraryType, currentUserUid);
  await updateDoc(docRef, {
    movieId: arrayRemove(movieId),
  });
}

// setTimeout(addMoviesToLibrary, 3000);

function onQueueButton(e) {
  // const currentUserUid = getUser();
  const movieId = e.target.id;
  const libraryType = 'queue';
  getLibraryMovies(libraryType).then(watchedMovies => {
    if (!watchedMovies.includes(movieId)) {
      addMoviesToLibrary(libraryType, movieId);
      updateBtnTextContent(e, watchedMovies, movieId, libraryType);
    } else {
      removeMoviesFromLibrary(libraryType, movieId);
      updateBtnTextContent(e, watchedMovies, movieId, libraryType);
    }
  });
  //   updateLocalStorage(e, 'queue');
  //   renderLibraryMovies('queue');
}

function updateBtnTextContent(e, watchedMovies, movieId, libraryType) {
  if (!watchedMovies.includes(movieId)) {
    e.target.textContent = `Remove from ${libraryType}`;
    e.target.classList.add('active');
  } else {
    e.target.textContent = `Add to ${libraryType}`;
    e.target.classList.remove('active');
  }
}

function onWatchedButton(e) {
  // const currentUserUid = getUser();
  const movieId = e.target.id;
  const libraryType = 'watched';

  getLibraryMovies(libraryType).then(watchedMovies => {
    if (!watchedMovies.includes(movieId)) {
      addMoviesToLibrary(libraryType, movieId);
      // updateBtnTextContent(e, watchedMovies, movieId, libraryType);
    } else {
      removeMoviesFromLibrary(libraryType, movieId);
      // updateBtnTextContent(e, watchedMovies, movieId, libraryType);
    }
  });
  // console.log(watchedMovies);
  //   updateLocalStorage(e, 'queue');
  //   renderLibraryMovies('queue');
}

export {
  onWatchedButton,
  onQueueButton,
  getLibraryMovies,
  updateBtnTextContent,
};
