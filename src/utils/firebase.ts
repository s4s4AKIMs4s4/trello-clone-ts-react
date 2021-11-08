import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD7EVWc8ykxRgEaH3s7V_90QpwFGfMQHao",
  authDomain: "trello-b4421.firebaseapp.com",
  databaseURL: "https://trello-b4421-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "trello-b4421",
  storageBucket: "trello-b4421.appspot.com",
  messagingSenderId: "1063570108565",
  appId: "1:1063570108565:web:dbfd28fe527cd80d06eb9c",
  measurementId: "G-JVEJHEMCWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app