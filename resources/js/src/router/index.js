import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'products',
        component: () => import("../views/pets/index"),
    },
    {
        path: '/add-product',
        name: 'add-product',
        component: () => import("../views/pets/create"),
    },
]

const router = new Router({
    mode: "history",
    linkActiveClass: "open",
    routes,
});
export default router;
