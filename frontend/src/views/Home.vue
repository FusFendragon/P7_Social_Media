<template>
	<div class="home">
		<AddPost @add-post="addPost" />
		<div class="posts">
			<div v-for="post in posts" :key="post.id" class="post">
				<router-link :to="{ name: 'Profil', params: { id: post.userId } }" class="router-style">
					<div v-for="user in users" :key="user.id" class="author">
						<img v-if="user.id == post.userId" :src="`${user.imageUrl}`" />
						<h2 v-if="user.id == post.userId">{{ user.name }}</h2>
					</div>
				</router-link>
				<DeleteButton @click="deletePost(post.id)" />
				<span class="hr"></span>
				<router-link :to="{ name: 'Post', params: { id: post.id } }" class="router-style">
					<p>{{ post.message }}</p>
					<img :src="`${post.imageUrl}`" alt="L'image du post n'est pas chargé" class="post-image">
					<div class="stats">
						<span class="date">{{ post.createdAt }}</span>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import AddPost from "@/components/AddPost.vue";
import DeleteButton from "@/components/DeleteButton.vue";
export default {
	name: "Home",
	components: {
		DeleteButton,
		AddPost,
	},
	data() {
		return {
			users: [],
			posts: [],
		};
	},
	methods: {
		async addPost(formData) {
			const res = await fetch("http://localhost:3000/posts/add", {
				method: "POST",
				body: formData,
			});
			const data = await res.json();
			this.posts = [data, ...this.posts];
		},
		async deletePost(id) {
			if (confirm("Voulez vous supprimer le message ?")) {
				const res = await fetch(`http://localhost:3000/posts/${id}`, {
					method: "DELETE",
				});
				res.status === 201 ? (this.posts = this.posts.filter((post) => post.id !== id)) : alert("Le message n'a pas été suprrimé suite à une erreur");
			}
		},
		async fetchPosts() {
			const res = await fetch("http://localhost:3000/posts");
			const data = await res.json();
			return data;
		},
		async fetchUsers() {
			const res = await fetch("http://localhost:3000/users");
			const data = await res.json();
			return data;
		},
	},
	async created() {
		this.posts = await this.fetchPosts();
		this.users = await this.fetchUsers();
	},
};
</script>

<style scoped>
.home {
	max-width: 1400px;
}
.posts {
	display: flex;
	flex-direction: column;
	max-width: 550px;
	margin: 0 auto;
}
.post {
	display: flex;
	position: relative;
	flex-direction: column;
	max-width: 550px;
	border: 2px solid #dbd0c0;
	border-radius: 10px;
	margin-bottom: 20px;
}
.author {
	display: flex;
}
.author img {
	width: 30px;
	height: 30px;
	align-self: center;
	object-fit: cover;
	border: 1px solid #dbd0c0;
	border-radius: 50%;
	margin: 15px 0px 10px 5px;
}
.delete-button {
	position: absolute;
	top: 20px;
	right: 20px;
	width: 20px;
}
.hr {
	height: 2px;
	width: 45%;
	background-color: #dbd0c0;
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
.post-image {
	width: 300px;
	object-fit: cover;
}
.date {
	align-self: center;
}
.router-style {
	text-decoration: none;
	color: black;
}
</style>
