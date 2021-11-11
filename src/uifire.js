import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: "AIzaSyAghnu6L8kxbwjz01JJfVXaaoJv_0BEDRk",
  authDomain: "myfridge-bt3103.firebaseapp.com",
  projectId: "myfridge-bt3103",
  storageBucket: "myfridge-bt3103.appspot.com",
  messagingSenderId: "671238774646",
  appId: "1:671238774646:web:5eb9d4cc766cc99aeee457"
};

  firebase.initializeApp(firebaseConfig)

  export default firebase;