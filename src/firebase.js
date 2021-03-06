import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDyhK4NepdfjKudcTkrP3yl8hftJXsVd1c",
  authDomain: "ionic-vue-firestore-app.firebaseapp.com",
  databaseURL: "https://ionic-vue-firestore-app.firebaseio.com",
  projectId: "ionic-vue-firestore-app",
  storageBucket: "ionic-vue-firestore-app.appspot.com",
  messagingSenderId: "798882780307",
  appId: "1:798882780307:web:bb09f94f1c22a87e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

const usersCollection = db.collection('users')
const customerCollection = db.collection('customer')
const orderCollection = db.collection('order')

export {
  db,
  usersCollection,
  customerCollection,
  orderCollection
}



