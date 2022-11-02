import "./style.scss";
import "./mapInit.js";
import "./paintOnMap.js";
import "./calculateArea.js";
import "./popupTip.js";
import "./popupAddObjectForm.js";
import "./drawingButtonHandler.js";
import "./api.js";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCOhLJWkA0_DmcswK8rTATRa8otZvhliWQ",
  authDomain: "ya-map-1.firebaseapp.com",
  projectId: "ya-map-1",
  storageBucket: "ya-map-1.appspot.com",
  messagingSenderId: "609562060509",
  appId: "1:609562060509:web:59a6a36bc1e1bef1dfdd34",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const analytics = getAnalytics(app);
