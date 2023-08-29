// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_2c-1mE9YGvQ6SquAMw1VxdcpL-0rDlk",
  authDomain: "fir-tutorial-45204.firebaseapp.com",
  projectId: "fir-tutorial-45204",
  storageBucket: "fir-tutorial-45204.appspot.com",
  messagingSenderId: "561287610815",
  appId: "1:561287610815:web:cf9bc5d09bb30ff794e10a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const db = getFirestore(app);

export{
    db
}