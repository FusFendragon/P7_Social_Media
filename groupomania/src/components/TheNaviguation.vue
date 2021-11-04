<template>
	<nav id="nav">
		<ul class="nav-links">
            <li class="links">
                <router-link to='/'>
                    Home
                </router-link>
            </li>
            <li v-for="user in users" :key="user.name" class="links">
                <router-link :to="{
                    name: 'UsersAccount',
                    params: { id: user.id }
                }">
                {{ user.name }}
                </router-link>
            </li>
        </ul>
	</nav>
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
#nav {
	display: flex;
	justify-content: center;
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
	padding: 0px 10px;
}

#nav a.router-link-exact-active {
	color: #ff0c71;
}
.nav-links {
    display: flex;
}
.links {
    list-style: none;
    padding-right: 20px;
}
</style>
