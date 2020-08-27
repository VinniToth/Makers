import firebase from 'firebase/app';
import 'firebase/database';


let firebaseConfig = {
    apiKey: "AIzaSyADqX80xvlCeCKvOpzpsKkW6q7QfvK9e6U",
    authDomain: "bdmakers-6a253.firebaseapp.com",
    databaseURL: "https://bdmakers-6a253.firebaseio.com",
    projectId: "bdmakers-6a253",
    storageBucket: "bdmakers-6a253.appspot.com",
    messagingSenderId: "620383337377",
    appId: "1:620383337377:web:a25b8bb79336b86f5069e0",
    measurementId: "G-J5HPMRB8DF"
  };

  if(!firebase.apps.length){
  //Abrir minha conexão
  firebase.initializeApp(firebaseConfig);
}

export default firebase;