// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import 'firebase/auth';
// import 'firebase/init';

// import firebaseui from 'firebaseui';

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
firebase.initializeApp(firebaseConfig);

// Initialize the FirebaseUI Widget using Firebase.
// const ui = new firebaseui.auth.AuthUI(firebase.auth());

// // Is there an email link sign-in?
// if (ui.isPendingRedirect()) {
//   ui.start('#firebaseui-auth-container', uiConfig);
// }
// // This can also be done via:
// if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
//   ui.start('#firebaseui-auth-container', uiConfig);
// }

// ui.start('#firebaseui-auth-container', {
//   signInOptions: [
//     // List of OAuth providers supported.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//     firebase.auth.GithubAuthProvider.PROVIDER_ID,
//   ],
//   // Other config options...
// });

// // Initialize the FirebaseUI Widget using Firebase.
// const ui = new firebaseui.auth.AuthUI(firebase.auth());

// const uiConfig = {
//   callbacks: {
//     signInSuccessWithAuthResult: function (authResult, redirectUrl) {
//       // User successfully signed in.
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       return true;
//     },
//     uiShown: function () {
//       // The widget is rendered.
//       // Hide the loader.
//       document.getElementById('loader').style.display = 'none';
//     },
//   },
//   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//   signInFlow: 'popup',
//   signInSuccessUrl: '<url-to-redirect-to-on-success>',
//   signInOptions: [
//     // Leave the lines as is for the providers you want to offer your users.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//     firebase.auth.GithubAuthProvider.PROVIDER_ID,
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     firebase.auth.PhoneAuthProvider.PROVIDER_ID,
//   ],
//   // Terms of service url.
//   tosUrl: '<your-tos-url>',
//   // Privacy policy url.
//   privacyPolicyUrl: '<your-privacy-policy-url>',
// };

// // The start method will wait until the DOM is loaded.
// ui.start('#firebaseui-auth-container', uiConfig);
const gCurrentUser = '';
/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById('quickstart-sign-in').disabled = false;
      });
  }
  document.getElementById('quickstart-sign-in').disabled = true;
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Create user with email and pass.
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}

/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(function () {
      // Email Verification sent!
      alert('Email Verification Sent!');
    });
}

function sendPasswordReset() {
  const email = document.getElementById('email').value;
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(function () {
      // Password Reset Email Sent!
      alert('Password Reset Email Sent!');
    })
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
    });
}

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function (user) {
    document.getElementById('quickstart-verify-email').disabled = true;
    if (user) {
      // User is signed in.
      const displayName = user.displayName;
      const email = user.email;
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
      document.getElementById('quickstart-sign-in-status').textContent =
        'Signed in';
      document.getElementById('quickstart-sign-in').textContent = 'Sign out';
      document.getElementById('quickstart-account-details').textContent =
        JSON.stringify(user, null, '  ');
      console.log('user', user.uid);
      if (!emailVerified) {
        document.getElementById('quickstart-verify-email').disabled = false;
      }
    } else {
      // User is signed out.
      document.getElementById('quickstart-sign-in-status').textContent =
        'Signed out';
      document.getElementById('quickstart-sign-in').textContent = 'Sign in';
      document.getElementById('quickstart-account-details').textContent =
        'null';
    }
    document.getElementById('quickstart-sign-in').disabled = false;
  });

  document
    .getElementById('quickstart-sign-in')
    .addEventListener('click', toggleSignIn, false);
  document
    .getElementById('quickstart-sign-up')
    .addEventListener('click', handleSignUp, false);
  document
    .getElementById('quickstart-verify-email')
    .addEventListener('click', sendEmailVerification, false);
  document
    .getElementById('quickstart-password-reset')
    .addEventListener('click', sendPasswordReset, false);
}

window.onload = function () {
  initApp();
};
