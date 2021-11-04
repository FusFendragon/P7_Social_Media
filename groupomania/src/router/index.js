import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/account/:id",
		name: "UsersAccount",
		component: () => import(/* webpackChunkName: "UsersAccount" */ "../views/UsersAccount"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
