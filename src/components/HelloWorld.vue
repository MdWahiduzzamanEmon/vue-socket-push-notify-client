<template>
  <p>State: {{ JSON.stringify(state.data?.id) }}</p>
  <p>Project name: {{ JSON.stringify(state.responseData) }}</p>
  <input type="text" v-model="projectName" placeholder="Project name" />
  <input type="text" v-model="userId" placeholder="User id" />
  <!-- <input type="text" v-model="isAll" placeholder="Is all" /> -->
  <button @click="handleSetProejctSubscribe">Create project</button>
</template>

<script setup>
import { state } from "../socket";
import { socket } from "../socket";
import { useNotifyStore } from "../stores/notifyStore.js";
import { storeToRefs } from "pinia";

const notifyStore = useNotifyStore();

const { projectName, userId,isAll } = storeToRefs(notifyStore);
const { handleSetProejctSubscribe } = notifyStore;

import { onMounted } from "vue";

onMounted(() => {
  socket.connect();
});
</script>

<style scoped>
p {
  color: red;
}

button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

input {
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

</style>
