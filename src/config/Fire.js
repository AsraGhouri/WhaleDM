import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/database'; // If using Firebase database
import 'firebase/storage';
 const config = {
  apiKey: "AIzaSyAa-fvu4xZLPiRt0QzeE9RaGN3V3E-UYpg",
  authDomain: "statistics-a9b48.firebaseapp.com",
  databaseURL: "https://statistics-a9b48.firebaseio.com",
  projectId: "statistics-a9b48",
  storageBucket: "statistics-a9b48.appspot.com",
  messagingSenderId: "594841888201"
  };
  const fire = firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true });

export default fire;