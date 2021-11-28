<template>
  <section>
    <div class="post">
      <div id="author">
        <img v-if="user.id == post.userId" :src="user.imageUrl" />
        <h2 v-if="user.id == post.userId">{{ user.name }}</h2>
      </div>
      <span class="hr"></span>
      <p>{{ message }}</p>
      <img
        :src="`${post.imageUrl}`"
        v-if="post.imageUrl != null"
        class="post-image"
      />
    </div>
    <form @submit="onSubmit" class="add-form">
      <label class="label-form">Modidiez votre message :</label>
      <input
        type="text"
        v-model="message"
        name="message"
        placeholder="Modifiez votre message..."
        @input="countChars()"
      />
      <div id="btn-input">
        <input
          type="file"
          id="file"
          ref="file"
          v-on:change="handleFileUpload()"
          name="imageUrl"
        />
        <span>{{ numberOfChars }}/350</span>
        <input type="submit" value="✔" class="btn" />
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "modifyPost",
  data() {
    return {
      user: [],
      post: [],
      message: "",
      file: "",
      numberOfChars: 0,
    };
  },
  methods: {
    async fetchPost() {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3000/posts/${this.$route.params.id}`,
        { headers: { authorization: "Bearer " + token } }
      );
      const data = await res.json();
      return data;
    },
    async onSubmit(e) {
      e.preventDefault();
      const token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("image", this.file);
      formData.append("message", this.message);
      const res = await fetch(
        `http://localhost:3000/posts/${this.$route.params.id}`,
        {
          method: "PUT",
          headers: { authorization: "Bearer " + token },
          body: formData,
        }
      );
      const data = await res.json();
      console.log(data);
      this.signupStatus = data;
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    async fetchUser() {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3000/users/${this.post.userId}`,
        { headers: { authorization: "Bearer " + token } }
      );
      const data = await res.json();
      return data;
    },
    countChars() {
      this.numberOfChars = this.message.length;
    },
  },
  async created() {
    this.post = await this.fetchPost();
    this.user = await this.fetchUser();
    this.message = await this.post.message;
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
.router-style {
  text-decoration: none;
  color: black;
}
#author {
  display: flex;
}
#author img {
  width: 30px;
  height: 30px;
  align-self: center;
  object-fit: cover;
  border: 1px solid #dbd0c0;
  border-radius: 50%;
  margin: 15px 0px 10px 5px;
}
.add-form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
}
.label-form {
  text-align: left;
}
input[type="text"] {
  height: 50px;
  border-radius: 5px;
  word-wrap: break-word;
  overflow: auto;
}
#btn-input {
  display: flex;
  justify-content: space-between;
}
input[type="submit"] {
  width: 25px;
  border-radius: 25px;
  background-color: rgb(68, 68, 219);
  border: 1px solid transparent;
  color: white;
}
input[type="submit"]:hover {
  background-color: rgb(31, 31, 131);
}
</style>
