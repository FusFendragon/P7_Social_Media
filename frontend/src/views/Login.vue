<template>
  <div id="login-form">
    <form @submit="onSubmit">
      <h2>Veuillez-vous connecter</h2>

      <div id="login-status">{{ loginStatus }}</div>

      <label><b>Adresse e-mail</b></label>
      <input
        type="text"
        placeholder="Entrer votre e-mail"
        name="email"
        v-model="email"
        required
      />

      <label><b>Mot de passe</b></label>
      <input
        type="password"
        placeholder="Entrer votre mot de passe"
        name="password"
        v-model="password"
      />

      <input type="submit" id="submit" value="LOGIN" />
    </form>
    <h3>
      Vous n'avez pas de compte ?
      <router-link to="/Signup" class="router-style">Cliquez ici</router-link>
    </h3>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      loginStatus: "",
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      const infoLogin = {
        email: this.email,
        password: this.password,
      };
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(infoLogin),
      });
      const data = await res.json();
      this.loginStatus = data.error;
      if (data.token && data.userId) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("token", data.token);
        window.location.pathname = "/";
      }
    },
  },
};
</script>

<style scoped>
#login-form {
  width: 400px;
  margin: 20px auto;
}
/* Bordered form */
form {
  width: 100%;
  padding: 30px;
  border: 1px solid #f1f1f1;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
#login-form h2 {
  width: 40%;
  margin: 0 auto;
  padding-bottom: 10px;
}

/* Full-width inputs */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
input[type="submit"] {
  background-color: #f9cf93;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  border: 1px solid transparent;
}
input[type="submit"]:hover {
  background-color: #fbb656;
  border: 1px solid #fbb656;
}
#login-status {
  color: red;
  margin: 5px 0px 20px;
  font-weight: 1000;
}
</style>
