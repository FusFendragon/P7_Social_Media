<template>
  <div id="app">
    <TheNavigation />
    <router-view :key="$route.path" />
  </div>
</template>

<script>
import TheNavigation from "@/components/TheNaviguation";
export default {
  name: "App",
  components: {
    TheNavigation,
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
  display: flex;
  flex-direction: column;
}
.router-style {
  text-decoration: none;
  color: rgb(45, 125, 255);
}
.router-style:hover {
  text-decoration: underline;
}
</style>
