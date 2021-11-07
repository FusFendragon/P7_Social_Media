<template>
	<section>
		<div class="user-profil">
			<img :src="require(`@/assets/${user.image}`)" />
			<h2>{{ user.name }}</h2>
			<p>{{ user.bio }}</p>
		</div>
	</section>
</template>

<script>
import accounts from "@/accounts.js";
export default {
	data() {
		return {
			userId: this.$route.params.id,
		};
	},
	computed: {
		user() {
			return accounts.users.find((user) => {
				return user.id == this.userId;
			});
		},
	},
};
</script>

<style scoped>
.user-profil img {
	width: 150px;
	height: 150px;
	border-radius: 100%;
	object-fit: cover;
	border: 2px solid black;
}
.user-profil h2 {
	margin: 5px 0px;
}
</style>