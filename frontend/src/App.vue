<template>
	<div id="app">
		<TheNavigation @check-auth="checkAuth" />
		<router-view :key="$route.path" />
	</div>
</template>

<script>
import TheNavigation from "@/components/TheNaviguation";

export default {
	components: {
		TheNavigation,
	},
	computed: {
		checkAuth() {
			// window.open("/login", "_self");
			console.log("test");
			return "test";
		},
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
