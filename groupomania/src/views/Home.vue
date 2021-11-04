<template>
	<div class="home">
		<h1>All Accounts</h1>
		<div class="accounts">
			<div v-for="user in users" :key="user.name">
				<router-link :to="{ name: 'UsersAccount', params: { id: user.id } }">
					<h2>{{ user.name }}</h2>
				</router-link>
				<figure>
					<router-link :to="{ name: 'UsersAccount', params: { id: user.id } }">
						<img :src="require(`@/assets/${user.image}`)" :alt="user.name" />
					</router-link>
				</figure>
			</div>
		</div>
	</div>
</template>

<script>
import accounts from "@/accounts.js";
export default {
	name: "Home",
	components: {},
	data() {
		return {
			users: accounts.users,
		};
	},
};
</script>

<style scoped>
.home {
	max-width: 1400px;
	margin: 0 auto;
}
</style>
