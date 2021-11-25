<template>
	<div class="add-post">
		<form @submit="onSubmit" class="add-form">
			<label class="label-form">Postez votre message :</label>
			<input type="text" v-model="message" name="message" placeholder="Votre Post..." />
			<input type="submit" value="✔" class="btn" />
		</form>
	</div>
</template>

<script>
export default {
	name: "AddPost",
	data() {
		return {
			message: "",
		};
	},
	methods: {
		onSubmit(e) {
			e.preventDefault();
			if (!this.message) {
				alert("Please add a Post");
				return;
			}
			const newPost = {
				message: this.message,
			};
			this.$emit("add-post", newPost);
			this.message = "";
		},
	},
};
</script>

<style scoped>
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
}
input[type="submit"] {
	width: 25px;
	border-radius: 25px;
	margin-left: 95%;
	background-color: rgb(68, 68, 219);
	border: 1px solid transparent;
	color: white;
}
input[type="submit"]:hover {
	background-color: rgb(31, 31, 131);
}
</style>
