import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_APIKEY,
  // authDomain: import.meta.env.VITE_AUTHDOMAIN,
  // projectId: import.meta.env.VITE_PROJECTID,
  // storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  // messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  // appId: import.meta.env.VITE_APPID,
  apiKey: "AIzaSyAKvCC0x2C7ATJlcFmwmlKA8lyRih9zcqA",
  authDomain: "learn-mentor-gate.firebaseapp.com",
  projectId: "learn-mentor-gate",
  storageBucket: "learn-mentor-gate.appspot.com",
  messagingSenderId: "282345147065",
  appId: "1:282345147065:web:4b24728d0743366d562968"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
