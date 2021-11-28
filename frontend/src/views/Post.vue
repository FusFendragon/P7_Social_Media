<template>
	<section>
		<div class="post">
			<router-link :to="{ name: 'Profil', params: { id: post.userId } }" class="router-style">
				<div v-for="user in users" :key="user.id" class="user">
					<img v-if="user.id == post.userId" :src="user.imageUrl" />
					<h2 v-if="user.id == post.userId">{{ user.name }}</h2>
				</div>
			</router-link>
			<p>{{ post.message }}</p>
			<img :src="`${post.imageUrl}`" v-if="post.imageUrl != null" class="post-image" />
			<div class="stats">
				<span class="date">{{ post.createdAt }}</span>
			</div>
			<AddPost @add-post="addPost" />
			<div v-for="comment in comments" :key="comment.id" class="comments">
				<div v-for="user in users" :key="user.id" class="user">
					<img v-if="user.id == comment.userId" :src="user.imageUrl" />
					<h2 v-if="user.id == comment.userId">{{ user.name }}</h2>
				</div>
				<div>
					{{ comment.message }}
					<img :src="`${comment.imageUrl}`" v-if="comment.imageUrl" class="post-image" />
				</div>
				<div class="stats">
					<span class="date">{{ post.createdAt }}</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import AddPost from "@/components/AddPost.vue";
export default {
	name: "Post",
	components: {
		AddPost,
	},
	data() {
		return {
			users: [],
			post: [],
			comments: [],
		};
	},
	methods: {
		async fetchPost() {
			const token = localStorage.getItem("token");
			const res = await fetch(`http://localhost:3000/posts/${this.$route.params.id}`, { headers: { authorization: "Bearer " + token } });
			const data = await res.json();
			return data;
		},
		async addPost(formData) {
			formData.append("postId", `${this.$route.params.id}`);
			const token = localStorage.getItem("token");
			const res = await fetch("http://localhost:3000/comments/add", {
				method: "POST",
				headers: { authorization: "Bearer " + token },
				body: formData,
			});
			const data = await res.json();
			this.comments = [data, ...this.comments];
		},
		async fetchComments() {
			const token = localStorage.getItem("token");
			const res = await fetch(`http://localhost:3000/comments/${this.$route.params.id}`, { headers: { authorization: "Bearer " + token } });
			const data = await res.json();
			return data;
		},
		async fetchUsers() {
			const token = localStorage.getItem("token");
			const res = await fetch("http://localhost:3000/users", { headers: { authorization: "Bearer " + token } });
			const data = await res.json();
			return data;
		},
	},
	async created() {
		this.post = await this.fetchPost();
		this.comments = await this.fetchComments();
		this.users = await this.fetchUsers();
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
.post-image {
	width: 300px;
	object-fit: cover;
	align-self: center;
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
