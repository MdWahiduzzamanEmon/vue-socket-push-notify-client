<template>
  <p>State: {{ JSON.stringify(state.data?.id) }}</p>
  <input type="text" v-model="projectName" placeholder="Project name" />
  <button @click="handleSetProejctSubscribe">Create project</button>
</template>

<script setup>
import { state } from "../socket";
import { socket } from "../socket";
import { useNotifyStore } from "../stores/notifyStore.js";
import { storeToRefs } from "pinia";

const notifyStore = useNotifyStore();

const { projectName } = storeToRefs(notifyStore);
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
  padding: 15px 32px;
  font-size: 16px;
}

</style>
