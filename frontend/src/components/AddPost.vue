<template>
  <div class="add-post">
    <form @submit="onSubmit" class="add-form">
      <label class="label-form">Postez votre message :</label>
      <input
        type="text"
        v-model="message"
        name="message"
        placeholder="Votre Post..."
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
  </div>
</template>

<script>
export default {
  name: "AddPost",
  data() {
    return {
      message: "",
      file: "",
      numberOfChars: 0,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.numberOfChars = 0;
      if (!this.message) {
        alert("Veuillez Poster un message non vide");
        return;
      }
      if (this.message.length > 350) {
        alert("Veuillez ecrire un message ne dépassant pas 350 caratères");
        return;
      }
      let formData = new FormData();
      formData.append("image", this.file);
      formData.append("message", this.message);
      formData.append("userId", localStorage.getItem("userId"));
      this.$emit("add-post", formData);
      this.message = "";
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    countChars() {
      this.numberOfChars = this.message.length;
    },
  },
};
</script>

<style scoped>
.add-post {
  max-width: 550px;
  margin: 0 auto;
}
.add-form {
  display: flex;
  flex-direction: column;
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
