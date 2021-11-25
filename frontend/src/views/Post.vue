<template>
	<section>
		<div class="post">
			<router-link :to="{ name: 'Profil', params: { id: post.userId } }" class="router-style">
				<div class="user">
					<img v-if="user.id == post.userId" :src="user.imageUrl" />
					<h2 v-if="user.id == post.userId">{{ user.name }}</h2>
				</div>
			</router-link>
			<p>{{ post.message }}</p>
			<div class="stats">
				<span class="date">{{ post.createdAt }}</span>
			</div>
			<div v-for="comment in comments" :key="comment.id" class="comments">
				<div>
					{{ comment.message }}
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			user: [],
			post: [],
			comments: [],
		};
	},
	methods: {
		async fetchPost() {
			const res = await fetch(`http://localhost:3000/posts/${this.$route.params.id}`);
			const data = await res.json();
			return data;
		},
		async fetchComments() {
			const res = await fetch(`http://localhost:3000/comments/${this.$route.params.id}`);
			const data = await res.json();
			return data;
		},
		async fetchUser() {
			const res = await fetch(`http://localhost:3000/users/${this.post.userId}`);
			const data = await res.json();
			return data;
		},
	},
	async created() {
		this.post = await this.fetchPost();
		this.comments = await this.fetchComments();
		this.user = await this.fetchUser();
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
.user {
	display: flex;
}
.user img {
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
