<template>
  <header>
    <router-link to="/">
      <img src="@/assets/logo.png" alt="Groupomania" />
    </router-link>
    <nav id="nav">
      <ul class="nav-links">
        <li class="links">
          <router-link to="/"> Accueil </router-link>
        </li>
        <li class="links">
          <router-link :to="{ name: 'Profil', params: { id: userId } }" v-if="userId">
            Mon compte
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheNaviguation",
  data() {
    return {
      userId: "",
    };
  },
  created() {
    this.userId = localStorage.getItem("userId");
  },
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
}
header img {
  width: 80%;
}
#nav {
  display: flex;
  justify-content: center;
  padding: 15px;
}

#nav a {
  font-weight: bold;
  color: #dbd0c0;
  padding: 0px 10px;
}

#nav a.router-link-exact-active {
  color: #f9cf93;
}
.nav-links {
  display: flex;
  padding-left: 0px;
}
.links {
  list-style: none;
  padding-right: 20px;
}
</style>
