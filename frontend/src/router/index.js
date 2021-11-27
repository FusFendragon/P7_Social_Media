import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import(/* webpackChunkName: "Home" */ "../views/Home"),
	},
	{
		path: "/Profil/:id",
		name: "Profil",
		component: () => import(/* webpackChunkName: "Profil" */ "../views/Profil"),
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

function isAuthenticatedOrNot() {
  const token = localStorage.getItem("token")
  const data = token ? true : false;
  return data
}

router.beforeEach((to, from, next) => {
  const isAuthenticated = isAuthenticatedOrNot();
  console.log(isAuthenticated);
	if (to.name !== "Login" && to.name !== "Signup" && !isAuthenticated) next({ name: "Login" });
	else next();
});

export default router;
