import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAtiqeg_UMXmOMLgYnBfv530_N-n-nwbj8",
  authDomain: "dessertstore-833ea.firebaseapp.com",
  databaseURL: "https://dessertstore-833ea-default-rtdb.firebaseio.com",
  projectId: "dessertstore-833ea",
  storageBucket: "dessertstore-833ea.appspot.com",
  messagingSenderId: "108572510478",
  appId: "1:108572510478:web:e9b3439de30bdd86136f5f",
  measurementId: "G-6BHD0FE9ML"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, get, query, orderByChild, equalTo };