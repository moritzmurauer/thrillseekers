
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


// API Key to communicate with Firebase Backend
const firebaseConfig = {
  apiKey: "AIzaSyC1yECJHk5Ad8pPycv9FbDV1KJclI47nJs",
  authDomain: "spa-thrillseeker.firebaseapp.com",
  projectId: "spa-thrillseeker",
  storageBucket: "spa-thrillseeker.appspot.com",
  messagingSenderId: "572026772824",
  appId: "1:572026772824:web:af09ddb2e020f682e0192d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectStorage = firebase.storage()
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp


export { projectFirestore, projectAuth, timestamp, projectStorage}