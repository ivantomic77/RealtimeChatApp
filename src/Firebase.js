import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import {
    getFirestore, 
    serverTimestamp,
    collection,
    addDoc,
    onSnapshot,
    query,
    where,
    orderBy
} from "firebase/firestore";
import { writable } from "svelte/store";

const firebaseConfig = {
    
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let db = getFirestore(app);

const provider = new GoogleAuthProvider();
const messageCollection = collection(db, "messages");

export const user = writable(null);

export function setUser(userData) {
    user.set(userData);
}

onAuthStateChanged(auth, (userAuth) => {
    if (userAuth) {
        setUser(userAuth);
    } else {
        setUser(null);
    }
});

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
    serverTimestamp,
    orderBy,
    signOut
};