// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCE0vY34xQdCwPyXaxJfxfe3FpfUCk0wAA",
    authDomain: "linkedin-clone-f824e.firebaseapp.com",
    projectId: "linkedin-clone-f824e",
    storageBucket: "linkedin-clone-f824e.appspot.com",
    messagingSenderId: "774411944094",
    appId: "1:774411944094:web:b0d90c08afe41009a3fb8f",
    measurementId: "G-KJN5RKWGXC"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();

export {db,auth};