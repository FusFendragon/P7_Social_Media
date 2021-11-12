<template>
	<div class="home">
		<div class="posts">
			<div v-for="post in posts" :key="post.id" class="post">
				<router-link :to="{ name: 'Profil', params: { id: post.authorId } }" class="router-style">
					<div v-for="user in users" :key="user.id" class="author">
						<img v-if="user.id === post.authorId" :src="require(`@/assets/${user.image}`)" />
						<h2 v-if="user.id === post.authorId">{{ user.name }}</h2>
					</div>
				</router-link>
				<DeleteButton />
				<span class="hr"></span>
				<router-link :to="{ name: 'Comment', params: { id: post.id } }" class="router-style">
		<p>{{ post.message }}</p>
		<div class="stats">
			<span class="like">{{ post.like }}</span>
			<span class="date">{{ post.date }}</span>
		</div>

				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import accounts from "@/accounts.js";
import posts from "@/posts.js";
import DeleteButton from "@/components/DeleteButton.vue"
export default {
	name: "Home",
	components: {
		DeleteButton
	},
	data() {
		return {
			users: accounts.users,
			posts : posts.posts
		};
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
	border: 2px solid #DBD0C0;
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
	border: 1px solid #DBD0C0;
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
	height:2px;
   	width:45%;
  	background-color:#DBD0C0;
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
