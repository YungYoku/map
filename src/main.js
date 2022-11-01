import "./style.scss";
import "./mapInit.js";
import "./paintOnMap.js";
import "./calculateArea.js";
import "./popup.js";
import "./drawButton.js";
import "./syncWithDB.js";
import { initializeApp } from "firebase/app";
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
export const analytics = getAnalytics(app);
