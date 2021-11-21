<template>
	<div id="login-form">
		<form method="POST">
			<h2>Connexion</h2>

			<label><b>Nom d'utilisateur</b></label>
			<input type="text" placeholder="Entrer le nom d'utilisateur" name="username" required />

			<label><b>Mot de passe</b></label>
			<input type="password" placeholder="Entrer le mot de passe" name="password" required />

			<input type="submit" id="submit" value="LOGIN" />
		</form>
	</div>
</template>

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
	width: 38%;
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
</style>
