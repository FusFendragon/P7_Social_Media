<template>
  <section>
    <div id="user-profil">
      <div id="user-card">
        <div>
          <img :src="user.imageUrl" />
          <h2>{{ user.name }}</h2>
        </div>
        <div id="user-info">
          <p>{{ user.bio }}</p>
        </div>
      </div>
      <div id="bottom-block">
        <div id="history-posts">
          <h3>Posts</h3>
          <div class="hr"></div>
          <div>
            <div v-for="post in posts" :key="post.id">
              <router-link
                :to="{ name: 'Post', params: { id: post.id } }"
                class="router-style"
              >
                <h4>
                  <span class="date"
                    >{{
                      moment(post.createdAt).format("YYYY-MM-DD HH:MM")
                    }}:</span
                  ><br />
                  {{ post.message }}
                </h4>
              </router-link>
            </div>
          </div>
        </div>
        <div class="action-list">
          <router-link
            :to="{ name: 'ModifyUser', params: { id: user.id } }"
            class="action-profil"
            >Modifier le compte</router-link
          >
          <router-link
            :to="{}"
            class="action-profil"
            @Click="deleteUser(`${this.$route.params.id}`)"
            >Supprimer le compte</router-link
          >
          <router-link
            :to="{}"
            class="action-profil"
            @Click="changeAdministratorStatue(`${this.$route.params.id}`)"
            v-if="user.administrator === false"
            >Rendre l'utilisateur administrateur</router-link
          >
          <router-link
            :to="{}"
            class="action-profil"
            @Click="changeAdministratorStatue(`${this.$route.params.id}`)"
            v-if="user.administrator === true"
            >Retirer l'utilisateur des administrateurs</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      posts: [],
      user: [],
    };
  },
  methods: {
    moment,
    async fetchPostsUser() {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3000/posts/user/${this.$route.params.id}`,
        { headers: { authorization: "Bearer " + token } }
      );
      const data = await res.json();
      return data;
    },
    async fetchUser() {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3000/users/${this.$route.params.id}`,
        { headers: { authorization: "Bearer " + token } }
      );
      const data = await res.json();
      return data;
    },
    async deleteUser(id) {
      const token = localStorage.getItem("token");
      if (
        confirm(
          "Êtes-vous sûr de supprimer le compte ainsi que tous ses postes ?"
        )
      ) {
        const res = await fetch(`http://localhost:3000/users/${id}`, {
          method: "DELETE",
          headers: { authorization: "Bearer " + token },
        });
        res.status === 201
          ? window.open("/", "_self")
          : "";
        if (id === localStorage.getItem("userId")) {
          localStorage.clear();
        }
      }
    },
    changeAdministratorStatue(id) {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:3000/users/admin/${id}`, {
        method: "PUT",
        headers: { authorization: "Bearer " + token },
        body: this.user,
      }),
        (this.user.administrator = !this.user.administrator);
    },
  },
  async created() {
    this.user = await this.fetchUser();
    this.posts = await this.fetchPostsUser();
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
#bottom-block {
  display: flex;
  flex-direction: row;
}
#history-posts {
  width: 60%;
  padding: 15px;
  border-right: 2px solid #f9e4c8;
  word-wrap: break-word;
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
  color: black;
}
.action-list {
  display: flex;
  flex-wrap: wrap;
}
.action-profil {
  width: auto;
  height: 20px;
  background-color: #dbd0c0;
  padding: 10px;
  border: 2px solid black;
  border-radius: 10px;
  text-decoration: none;
  color: black;
  margin: 0px 5px;
  margin: 10px;
  font-size: 0.8em;
}
.action-profil:hover {
  background-color: black;
  color: white;
}
</style>
