import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB09IyzSA3FoOI2kNVztyX-BZqOkzDbrCA',
  authDomain: 'projeto-firebase-310e9.firebaseapp.com',
  projectId: 'projeto-firebase-310e9',
  storageBucket: 'projeto-firebase-310e9.appspot.com',
  messagingSenderId: '933075080622',
  appId: '1:933075080622:web:2499fbcf3a0132b07f643f',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
