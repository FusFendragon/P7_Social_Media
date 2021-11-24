<template>
	<section>
		<!-- <div id="user-profil">
			<div id="user-card">
				<div>
					<img :src="require(`@/assets/${user.image}`)" />
					<h2>{{ user.name }}</h2>
				</div>
				<div id="user-info">
					<p>{{ users.bio }}</p>
				</div>
			</div>
			<div id="history-posts">
				<h3>Posts</h3>
				<div class="hr"></div>
				<div v-for="post in posts" :key="post.id">
					<div v-if="user.id == post.authorId">
						<router-link :to="{ name: 'Comment', params: { id: post.id } }" class="router-style">
							<h4>
								<span class="date">{{ post.date }}:</span><br />
								{{ post.message }}
							</h4>
						</router-link>
					</div>
				</div>
			</div>
		</div> -->
		<div>{{ user }}</div>
	</section>
</template>

<script>
import posts from "@/posts.js";
export default {
	data() {
		return {
			userId: this.$route.params.id,
			posts: posts.posts,
			user: {},
		};
	},
	methods: {
		async fetchUsers() {
			const res = await fetch(`http://localhost:3000/users/${this.userId}`);
			const data = await res.json();
			return data;
		},		
		async created() {
			this.user = await this.fetchUsers();
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
	background-color: #faeee0;
	padding: 10px;
	border: 2px solid #f9e4c8;
	border-radius: 20px;
}
#user-info {
	align-self: center;
	margin-left: 20px;
}
#user-info p {
	text-align: justify;
}
#history-posts {
	max-width: 40%;
	padding: 15px;
	border-right: 2px solid #f9e4c8;
}
#history-posts h3 {
	text-align: left;
	margin-bottom: 2px;
}
#history-posts .hr {
	height: 2px;
	width: 30%;
	background-color: #dbd0c0;
	margin: 0px 0px 15px 0px;
}
#history-posts h4 {
	text-align: justify;
	padding: 10px 0px;
	margin: 0px;
	border-bottom: 2px solid #dbd0c0;
}
#history-posts h4:hover {
	background-color: rgb(243, 243, 243);
}
#history-posts .date {
	text-decoration: underline;
}
.router-style {
	text-decoration: none;
	color: #2c3e50;
}
</style>
