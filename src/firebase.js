import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLOcTRAD956SFXPbhGKqYonFXSEG9cBgE",
  authDomain: "digimenuaz-restaurants.firebaseapp.com",
  projectId: "digimenuaz-restaurants",
  storageBucket: "digimenuaz-restaurants.appspot.com",
  messagingSenderId: "727463054741",
  appId: "1:727463054741:web:6478b572c32c3f5992ba9c",
};

const app = initializeApp(firebaseConfig);

// 🔥 BUNU ƏLAVƏ ET
export const db = getFirestore(app);
