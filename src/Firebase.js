import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";

const firebaseConfig = {};

let currentUser;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let db = getFirestore(app);

const provider = new GoogleAuthProvider();
const messageCollection = collection(db, "message");

export function setUser(user) {
    currentUser = user;
}
export function getUser() {
    return currentUser;
}

export {
    app,
    auth,
    provider,
    signInWithPopup,
    db,
    addDoc,
    messageCollection,
    onSnapshot,
    where,
    query,
};
