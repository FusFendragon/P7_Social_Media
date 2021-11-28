<template>
  <section>
    <div class="post">
      <router-link
        :to="{ name: 'Profil', params: { id: post.userId } }"
        class="router-style"
      >
        <div v-for="user in users" :key="user.id" class="user">
          <img v-if="user.id == post.userId" :src="user.imageUrl" />
          <h2 v-if="user.id == post.userId">{{ user.name }}</h2>
        </div>
      </router-link>
      <p>{{ post.message }}</p>
      <img
        :src="`${post.imageUrl}`"
        v-if="post.imageUrl != null"
        class="post-image"
      />
      <div class="stats">
        <span class="date">{{
          moment(post.createdAt).format("YYYY-MM-DD")
        }}</span>
      </div>
      <div id="edit-btn">
        <div id="modify-btn">
          <router-link :to="{ name: 'ModifyPost', params: { id: post.id } }"
            >Modifier le message</router-link
          >
        </div>
        <div id="delete">
          <p>Supprimer le post :</p>
          <DeleteButton
            @click="deletePost(post.id)"
            v-if="adminStatue === 1 || post.userId == userId"
            class="delete-post-btn"
          />
        </div>
      </div>
      <AddPost @add-post="addPost" />
      <div v-for="comment in comments" :key="comment.id" class="comments">
        <div class="user-comment-info">
          <div v-for="user in users" :key="user.id" class="user">
            <img v-if="user.id == comment.userId" :src="user.imageUrl" />
            <h2 v-if="user.id == comment.userId">{{ user.name }}</h2>
          </div>
          <DeleteButton
            @click="deleteComment(comment.id)"
            v-if="(adminStatue === 1 || post.userId == userId) && comment.id"
          />
        </div>

        <div>
          <p>{{ comment.message }}</p>
          <img
            :src="`${comment.imageUrl}`"
            v-if="comment.imageUrl"
            class="post-image"
          />
        </div>
        <div class="stats">
          <span class="date">{{
            moment(post.createdAt).format("YYYY-MM-DD")
          }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import AddPost from "@/components/AddPost.vue";
import DeleteButton from "@/components/DeleteButton.vue";
export default {
  name: "Post",
  components: {
    AddPost,
    DeleteButton,
  },
  data() {
    return {
      users: [],
      post: [],
      comments: [],
      adminStatue: "",
    };
  },
  methods: {
    moment,
    async fetchPost() {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3000/posts/${this.$route.params.id}`,
        { headers: { authorization: "Bearer " + token } }
      );
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
    async deletePost() {
      const token = localStorage.getItem("token");
      if (confirm("Voulez vous supprimer le message ?")) {
        const res = await fetch(
          `http://localhost:3000/posts/${this.$route.params.id}`,
          {
            method: "DELETE",
            headers: { authorization: "Bearer " + token },
          }
        );
        const data = await res.json();
        res.status === 201 ? this.$router.push("/") : alert(data.message);
      }
    },
    async deleteComment(id) {
      const token = localStorage.getItem("token");
      if (confirm("Voulez vous supprimer le message ?")) {
        const res = await fetch(`http://localhost:3000/Comments/${id}`, {
          method: "DELETE",
          headers: { authorization: "Bearer " + token },
        });
        const data = await res.json();
        res.status === 201
          ? (this.comments = this.comments.filter(
              (comment) => comment.id !== id
            ))
          : alert(data.message);
      }
    },
    async fetchComments() {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3000/comments/${this.$route.params.id}`,
        { headers: { authorization: "Bearer " + token } }
      );
      const data = await res.json();
      return data;
    },
    async fetchUsers() {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/users", {
        headers: { authorization: "Bearer " + token },
      });
      const data = await res.json();
      return data;
    },
    async adminView() {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/users/${this.userId}`, {
        headers: { authorization: "Bearer " + token },
      });
      const data = await res.json();
      const adminStatue = data.administrator === true ? 1 : 0;
      return adminStatue;
    },
  },
  async created() {
    this.userId = localStorage.getItem("userId");
    this.post = await this.fetchPost();
    this.comments = await this.fetchComments();
    this.users = await this.fetchUsers();
    this.adminStatue = await this.adminView();
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
  word-wrap: break-word;
  padding: 7px;
}
.post-image {
  width: 300px;
  object-fit: cover;
  align-self: center;
}
.stats {
  text-align: right;
}
#edit-btn {
  display: flex;
  justify-content: center;
}
#modify-btn {
  background-color: #dbd0c0;
  border-radius: 5px;
  padding: 7px;
}
#modify-btn a {
  text-decoration: none;
  color: black;
}
#modify-btn a:hover {
  text-decoration: none;
  color: white;
}

#modify-btn:hover {
  background-color: black;
}
#delete {
  display: flex;
}
.user-comment-info {
  display: flex;
  justify-content: space-between;
}
.comments {
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid #dbd0c0;
  margin: 0 auto;
  border-radius: 10px;
  margin-bottom: 20px;
}
.router-style {
  text-decoration: none;
  color: black;
}
</style>
