<template>
	<div class="home">
		<AddPost @add-post="addPost" />
		<div class="posts">
			<div v-for="post in posts" :key="post.id" class="post">
				<router-link :to="{ name: 'Profil', params: { id: post.userId } }" class="router-style router-profil" v-if="post.userId">
					<div v-for="user in users" :key="user.id" class="author">
						<img v-if="user.id == post.userId" :src="`${user.imageUrl}`" />
						<h2 v-if="user.id == post.userId">{{ user.name }}</h2>
						<DeleteButton @click="deletePost(post.id)" v-if="adminStatue === 1 || post.userId == userId" />
					</div>
				</router-link>
				<span class="hr"></span>
				<router-link :to="{ name: 'Post', params: { id: post.id } }" class="router-style router-profil">
					<p>{{ post.message }}</p>
					<img :src="`${post.imageUrl}`" v-if="post.imageUrl" class="post-image" />
						<div class="date">{{ moment(post.createdAt).format("YYYY-MM-DD") }} <span v-if="post.createdAt !== post.updatedAt">Modifié</span></div>

				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import moment from "moment";
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
			adminStatue: "",
		};
	},

	methods: {
		moment,
		async addPost(formData) {
			const token = localStorage.getItem("token");
			const res = await fetch("http://localhost:3000/posts/add", {
				method: "POST",
				headers: { authorization: "Bearer " + token },
				body: formData,
			});
			const data = await res.json();
			this.posts = [data, ...this.posts];
		},
		async deletePost(id) {
			const token = localStorage.getItem("token");
			if (confirm("Voulez vous supprimer le message ?")) {
				const res = await fetch(`http://localhost:3000/posts/${id}`, {
					method: "DELETE",
					headers: { authorization: "Bearer " + token },
				});
				const data = await res.json();
				res.status === 201 ? (this.posts = this.posts.filter((post) => post.id !== id)) : alert(data.message);
			}
		},
		async fetchPosts() {
			const token = localStorage.getItem("token");
			const res = await fetch("http://localhost:3000/posts", { headers: { authorization: "Bearer " + token } });
			const data = await res.json();
			return data;
		},
		async fetchUsers() {
			const token = localStorage.getItem("token");
			const res = await fetch("http://localhost:3000/users", { headers: { authorization: "Bearer " + token } });
			const data = await res.json();
			return data;
		},
		async adminView() {
			const token = localStorage.getItem("token");
			const res = await fetch(`http://localhost:3000/users/${this.userId}`, { headers: { authorization: "Bearer " + token } });
			const data = await res.json();
			const adminStatue = data.administrator === true ? 1 : 0;
			return adminStatue;
		},
	},
	async created() {
		this.userId = localStorage.getItem("userId");
		this.posts = await this.fetchPosts();
		this.users = await this.fetchUsers();
		this.adminStatue = await this.adminView();
	},
};
</script>

<style scoped>
.home {
	width: 40%;
	max-width: 1400px;
	margin: auto;
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
	width: 100%;
	text-align: right;
}
.date span {
	font-style: italic;
}
.router-style {
	text-decoration: none;
	color: black;
}
.router-profil {
	width: 60%;
}
</style>
