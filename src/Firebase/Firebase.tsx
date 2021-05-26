import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFJoIVbEQnc-TgZ15braac1K3Yxk5mWW8",
    authDomain: "instantquiz-3f5c9.firebaseapp.com",
    projectId: "instantquiz-3f5c9",
    storageBucket: "instantquiz-3f5c9.appspot.com",
    messagingSenderId: "512645164981",
    appId: "1:512645164981:web:e05374f0357c5e267233fc",
    measurementId: "G-S0BBBP83NN",
};

//initialize firebase app
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const firestore = firebase.firestore;

export default firebase;
