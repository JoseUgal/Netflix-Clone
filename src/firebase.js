import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDNt4BJqk7JiMOt5NXLDLnz1kFRYlJVsfI",
  authDomain: "netflix-clone-c3aff.firebaseapp.com",
  projectId: "netflix-clone-c3aff",
  storageBucket: "netflix-clone-c3aff.appspot.com",
  messagingSenderId: "698865086694",
  appId: "1:698865086694:web:cb2202ae4dcf630c48cb27",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { auth, db };
