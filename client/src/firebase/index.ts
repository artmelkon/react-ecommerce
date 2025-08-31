import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATqkCx2sw_PqE930lYJb3HsdZ6O43UYMk",
  authDomain: "nomad-bags-store-47b43.firebaseapp.com",
  projectId: "nomad-bags-store-47b43",
  storageBucket: "nomad-bags-store-47b43.firebasestorage.app",
  messagingSenderId: "515740947756",
  appId: "1:515740947756:web:c290efd342e061b5860889"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
