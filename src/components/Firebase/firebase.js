import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCV9PEWU8Yy6cFgRJrkwaSCduXYb4BncXg",
  authDomain: "visitor-registration-3f5c6.firebaseapp.com",
  databaseURL: "https://visitor-registration-3f5c6.firebaseio.com",
  projectId: "visitor-registration-3f5c6",
  storageBucket: "visitor-registration-3f5c6.appspot.com",
  messagingSenderId: "176373991576",
  appId: "1:176373991576:web:f63658ff846d553303e8ed",
  measurementId: "G-D3B8F08XM3",
};

firebase.initializeApp(config);

class Firebase {
  constructor() {
    //firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.database();
  }

  // *** Auth API ***
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then((snapshot) => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***
  user = (uid) => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");
}

export { firebase };
export default Firebase;
