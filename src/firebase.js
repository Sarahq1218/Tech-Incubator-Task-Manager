import { getAuth } from "@firebase/auth"
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyAcwmixj-9E6qLFxnxxN0CFSZy7uwPZYdY",
    authDomain: "login-incubator.firebaseapp.com",
    projectId: "login-incubator",
    storageBucket: "login-incubator.appspot.com",
    messagingSenderId: "218304089861",
    appId: "1:218304089861:web:ea9806f18fc219e40d316c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

export { db }
export { storage }
export const auth = getAuth(app)


