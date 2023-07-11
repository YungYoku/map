import { defineStore } from "pinia";

export const useAuthStore = defineStore({
    id: "auth",

    state: () => ({
        uid: localStorage.uid ?? ""
    }),

    getters: {},

    actions: {
        setUid(uid) {
            this.uid = uid;
            localStorage.uid = uid;
        }
    },
});
