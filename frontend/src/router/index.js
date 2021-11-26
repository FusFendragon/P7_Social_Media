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
		path: "/MyProfil",
		name: "MyProfil",
		component: () => import(/* webpackChunkName: "MyProfil" */ "../views/MyProfil"),
	},
	{
		path: "/Post/:id",
		name: "Post",
		component: () => import(/* webpackChunkName: "Post" */ "../views/Post"),
	},
	{
		path: "/Login",
		name: "Login",
		component: () => import(/* webpackChunkName: "Login" */ "../views/Login"),
	},
	{
		path: "/Signup",
		name: "Signup",
		component: () => import(/* webpackChunkName: "Signup" */ "../views/Signup"),
	},
	{
		path: "/ModifyUser/:id",
		name: "ModifyUser",
		component: () => import(/* webpackChunkName: "ModifyUser" */ "../views/ModifyUser"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
