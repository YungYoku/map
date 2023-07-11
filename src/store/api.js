import { defineStore } from "pinia";
import { addDoc, arrayUnion, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/main.js";
import { addObjectToMap } from "@/api/mapInit.js";
import { formatCoordinatesToNumbersArray } from "@/api/calculateArea.js";
import { useAuthStore } from "@/store/auth.js";

export const useApiStore = defineStore({
    id: "api",

    state: () => ({}),

    getters: {},

    actions: {
        async addToDB(title = "Title", points = []) {
            const auth = useAuthStore();

            const areaRef = await addDoc(collection(db, "areas"), {
                title,
                points,
            });

            const idRef = doc(db, "areas", auth.uid);
            await updateDoc(idRef, {
                ids: arrayUnion(areaRef.id),
            });
        },

        async loadIds() {
            const auth = useAuthStore();

            const docRef = doc(db, "areas", auth.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data().ids || [];
            } else {
                console.log("No such document!");
            }
        },

        async loadPoints(id) {
            const docRef = doc(db, "areas", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data) {
                    return data;
                }
            } else {
                console.log("No such document!");
            }
        },

        async drawFromDB() {
            const ids = await this.loadIds();
            for (let id of ids) {
                id = id.replace(/\s/gi, "");
                const data = await this.loadPoints(id);
                addObjectToMap(
                    formatCoordinatesToNumbersArray(data.points),
                    data.title,
                    true
                );
            }
        }
    },
});
