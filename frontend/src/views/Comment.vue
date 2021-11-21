<template>
	<section>
		<div class="post">
			<router-link :to="{ name: 'Profil', params: { id: post.authorId } }" class="router-style">
				<div v-for="user in users" :key="user.id" class="author">
					<img v-if="user.id === post.authorId" :src="require(`@/assets/${user.image}`)" />
					<h2 v-if="user.id === post.authorId">{{ user.name }}</h2>
				</div>
			</router-link>
			<p>{{ post.message }}</p>
			<div class="stats">
				<span class="like"> {{ post.like }}</span>
				<span class="date">{{ post.date }}</span>
			</div>
		</div>
	</section>
</template>

<script>
import posts from "@/posts.js";
import accounts from "@/accounts.js";
export default {
	data() {
		return {
			postId: this.$route.params.id,
			users: accounts.users,
		};
	},
	computed: {
		post() {
			return posts.posts.find((post) => {
				return post.id == this.postId;
			});
		},
	},
};
</script>

<style scoped>
.post {
	display: flex;
	flex-direction: column;
	max-width: 550px;
	border-radius: 10px;
	margin: 0 auto;
}
.author {
	display: flex;
}
.author img {
	width: 30px;
	height: 30px;
	align-self: center;
	object-fit: cover;
	border: 1px solid #f9cf93;
	border-radius: 50%;
	margin: 15px 0px 10px 5px;
}
.hr {
	height: 2px;
	width: 45%;
	background-color: #f9cf93;
	margin: 0px 0px 5px 10px;
}
.post h2 {
	text-align: left;
	margin: 20px 10px 10px 5px;
}
.post h2:hover {
	text-decoration: underline;
}
.post p {
	text-align: justify;
	margin: 0px 10px;
}
.stats {
	display: flex;
	justify-content: space-between;
}
.like {
	align-self: center;
	margin: 10px 10px 5px 10px;
}
.date {
	align-self: center;
}
.router-style {
	text-decoration: none;
	color: black;
}
</style>
