import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCnKgMmvHuFd_te3U7gxrC09jcHqYYD7lA",
  authDomain: "letmeask-1deb1.firebaseapp.com",
  databaseURL: "https://letmeask-1deb1-default-rtdb.firebaseio.com",
  projectId: "letmeask-1deb1",
  storageBucket: "letmeask-1deb1.appspot.com",
  messagingSenderId: "221919252576",
  appId: "1:221919252576:web:7e9ded7ce3e778f31cb305"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }