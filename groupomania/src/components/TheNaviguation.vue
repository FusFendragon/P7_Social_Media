<template>
    <header>
        <router-link to='/'>
            <img src="@/assets/logo.png" alt="Groupomania">
        </router-link>
	<nav id="nav">
		<ul class="nav-links">
            <li class="links">
                <router-link to='/'>
                    Accueil
                </router-link>
            </li>
            <li class="links">
                <router-link to='/MyProfil'>
                    Mon compte
                </router-link>
            </li>
        </ul>
	</nav>
    </header>
</template>

<script>
import accounts from "@/accounts";
export default {
    data() {
        return {
            userId: this.$route.params.id,
            users: accounts.users
        }
    }
}
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
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #DBD0C0;
	padding: 0px 10px;
}

#nav a.router-link-exact-active {
	color: #F9CF93;
}
.nav-links {
    display: flex;
}
.links {
    list-style: none;
    padding-right: 20px;
}
</style>
