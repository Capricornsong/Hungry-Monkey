import {useEffect, useState} from "react"

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app"
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBoTXYlai40mi8LVRBK2gQm0dvSCKwMWwg",
    authDomain: "hungry-monkey-8888.firebaseapp.com",
    projectId: "hungry-monkey-8888",
    storageBucket: "hungry-monkey-8888.appspot.com",
    messagingSenderId: "200889206145",
    appId: "1:200889206145:web:aa623537369aa70e311480"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()

export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}

export function logout() {
    return signOut(auth)
}

// Custom Hook
export function useAuth() {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
        return unsub
    }, [])

    return currentUser
}