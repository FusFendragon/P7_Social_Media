<template>
	<div class="add-post">
		<form @submit="onSubmit" class="add-form">
			<label>Postez votre message</label>
			<input type="text" v-model="message" name="message" placeholder="Votre Post" />
			<input type="submit" value="Save Post" class="btn" />
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
	margin-bottom: 40px;
}
.form-control {
	margin: 20px 0;
}
.form-control label {
	display: block;
}
.form-control input {
	width: 100%;
	height: 40px;
	margin: 5px;
	padding: 3px 7px;
	font-size: 17px;
}
.form-control-check {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.form-control-check label {
	flex: 1;
}
.form-control-check input {
	flex: 2;
	height: 20px;
}
</style>
