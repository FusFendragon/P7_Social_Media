import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/Profil/:id",
		name: "Profil",
		component: () => import(/* webpackChunkName: "Profil" */ "../views/Profil"),
	},
	{
		path: "/MyProfil/:id",
		name: "MyProfil",
		component: () => import(/* webpackChunkName: "MyProfil" */ "../views/MyProfil"),
	},
	{
		path: "/Comment/:id",
		name: "Comment",
		component: () => import(/* webpackChunkName: "Comment" */ "../views/Comment"),
	},
	{
		path: "/Login",
		name: "Login",
		component: () => import(/* webpackChunkName: "Login" */ "../views/Login"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
