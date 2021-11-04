<template>
	<section>
		<h2>TEST</h2>

		<h1>{{ user.name }}</h1>
		<div class="user-accounts">
			<img :src="require(`@/assets/${user.image}`)" />
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
