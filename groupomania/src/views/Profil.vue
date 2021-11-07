<template>
	<section>
		<div id="user-profil">
			<div id="user-card">
				<div>
					<img :src="require(`@/assets/${user.image}`)" />
					<h2>{{ user.name }}</h2>				
				</div>
				<div id="user-info">
					<p>{{ user.bio }}</p>
				</div>
			</div>
			<div id="history-post">
				<h3>Posts</h3>
				<div v-for="post in posts" :key="post.id">
				<div v-if="user.id == post.authorId">
					<router-link :to="{ name: 'Comment', params: { id: post.id } }" class="router-style">
						<h4> {{ post.date }}: {{ post.message }} </h4>
					</router-link>
				</div>
			</div>
			</div>
		</div>
	</section>
</template>

<script>
import accounts from "@/accounts.js";
import posts from "@/posts.js";
export default {
	data() {
		return {
			userId: this.$route.params.id,
			posts : posts.posts
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
section {
	max-width: 1400px;
	margin: 0px auto;
}
#user-profil {
	margin: 30px;
}
#user-profil img {
	width: 150px;
	height: 150px;
	border-radius: 100%;
	object-fit: cover;
	border: 2px solid black;
}
#user-profil h2 {
	margin: 5px 0px;
}
#user-card {
	display: flex;
	border: 2px solid #F9E4C8;
}
#user-info {
	align-self: center;
	margin-left: 20px;
}
#user-info p {
	text-align: justify;
}
#history-posts{
	max-width: 60%;
}
</style>