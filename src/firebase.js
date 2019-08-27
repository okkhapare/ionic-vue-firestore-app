import firebase from 'firebase'
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
const breakfastMenuCollection = db.collection('breakfastMenu')
const lunchMenuCollection = db.collection('lunchMenu')
const dinnerMenuCollection = db.collection('dinnerMenu')
const miscellaneousMenuCollection = db.collection('miscellaneousMenu')

export {
  db,
  usersCollection,
  breakfastMenuCollection,
  lunchMenuCollection,
  dinnerMenuCollection,
  miscellaneousMenuCollection
}



