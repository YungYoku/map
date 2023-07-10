import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Auth from "../views/AuthView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            auth: true
        },
    },

    {
        path: "/auth",
        name: "Auth",
        component: Auth,
        meta: {
            auth: false
        },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to) => {
    const logged = !!localStorage["uid"];
    if (to.meta["auth"]) {
        if (logged) {
            return true;
        } else {
            return "/auth";
        }
    }

    if (logged) {
        return "/";
    }

    return true;
});

export default router;
