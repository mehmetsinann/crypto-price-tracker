import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyD6zzKO-lRv4Nx6TrNiyszVnL7aIXDkYOY",
  authDomain: "coin-tracker-33b9b.firebaseapp.com",
  projectId: "coin-tracker-33b9b",
  storageBucket: "coin-tracker-33b9b.appspot.com",
  messagingSenderId: "783648355675",
  appId: "1:783648355675:web:d8c32c2225d9cdc59b967e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

export const db = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider).then(() => {
    window.location.reload();
  });
};
export const signOut = () => {
  auth.signOut();
  localStorage.removeItem("coin-tracker-user");
};

export default firebase;
