<template>
	<div id="login-form">
		<form @submit="onSubmit">
			<h2>Inscription</h2>
			<div>{{ signupStatus }}</div>
			<label><b>Adresse e-mail</b></label>
			<input type="text" placeholder="Entrer votre e-mail" name="email" v-model="email" required />

			<label><b>Mot de passe</b></label>
			<input type="password" placeholder="Entrer votre mot de passe" name="password" v-model="password" required />

			<label><b>Nom</b></label>
			<input type="text" placeholder="Entrer votre mot de passe" name="name" v-model="name" required />

			<label><b>Image de profil</b></label>
			<input type="file" id="file" placeholder="Télechargez votre image" name="imageUrl" />

			<label><b>Description de Profil</b></label>
			<input type="text" placeholder="Entrer votre description" v-model="bio" name="bio" />

			<input type="submit" id="submit" value="Valider" />
		</form>
	</div>
</template>

<script>
export default {
	name: "signup",
	data() {
		return {
			email: "",
			password: "",
			name: "",
			bio: "",
			signupStatus: "",
		};
	},
	methods: {
		async onSubmit(e) {
			e.preventDefault();
			const newUser = {
				email: this.email,
				password: this.password,
				name: this.name,
				bio: this.bio,
			};
			const files = document.querySelector('#file');
			const formData = files.files[0];
			// formData.append('imageUrl', files.files[0]);
			console.log(formData);
			const res = await fetch("http://localhost:3000/users/signup", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: (JSON.stringify(newUser),formData)
			});
			const data = await res.json();
			console.log(data);
			this.signupStatus = data;
		},
	},
};
</script>

<style scoped>
#login-form {
	width: 400px;
	margin: 20px auto;
}
form {
	width: 100%;
	padding: 30px;
	border: 1px solid #f1f1f1;
	background: #fff;
	box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
#login-form h2 {
	width: 38%;
	margin: 0 auto;
	padding-bottom: 10px;
}

input[type="text"],
input[type="password"],
input[type="file"] {
	width: 100%;
	padding: 12px 20px;
	margin: 8px 0;
	display: inline-block;
	border: 1px solid #ccc;
	box-sizing: border-box;
}

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
</style>
