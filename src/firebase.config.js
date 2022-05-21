import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAG-Mk00yzhQCuyF2ncVeNKV53kqIv0q50',
  authDomain: 'house-marketplace-5e91e.firebaseapp.com',
  projectId: 'house-marketplace-5e91e',
  storageBucket: 'house-marketplace-5e91e.appspot.com',
  messagingSenderId: '1035271329635',
  appId: '1:1035271329635:web:34d30944d37b0386ada556',
  measurementId: 'G-PXGNZPV8V0',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
