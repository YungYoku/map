import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import router from "./router";

const app = createApp(App);

const firebaseConfig = {
    apiKey: "AIzaSyCXox5PaAAMz0Oa7IEY0704Jj1XYBXWSlM",
    authDomain: "ya-map-5c603.firebaseapp.com",
    projectId: "ya-map-5c603",
    storageBucket: "ya-map-5c603.appspot.com",
    messagingSenderId: "102197101284",
    appId: "1:102197101284:web:9f304ba166638d42da62f1"
};

initializeApp(firebaseConfig);
export const db = getFirestore();

app.use(router);

app.mount("#app");
