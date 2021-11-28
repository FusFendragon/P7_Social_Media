<template>
  <button @click="deleteMessage" class="delete-button">✘</button>
</template>

<script></script>

<style scoped>
.delete-button {
  width: 30px;
  height: 30px;
  background-color: #dbd0c0;
  border-radius: 5px;
  align-self: center;
}
.delete-button:hover {
  background-color: black;
  color: white;
}
</style>
