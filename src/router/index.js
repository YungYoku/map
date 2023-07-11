import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegView from "@/views/RegView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
        meta: {
            auth: true
        },
    },

    {
        path: "/login",
        name: "Login",
        component: LoginView,
        meta: {
            auth: false
        },
    },
    {
        path: "/reg",
        name: "Register",
        component: RegView,
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
            return "/login";
        }
    }

    if (logged) {
        return "/";
    }

    return true;
});

export default router;
