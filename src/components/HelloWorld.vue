<template>
  <p>State: {{ JSON.stringify(state.data?.id) }}</p>
</template>

<script setup>
import { state } from "../socket";
import { socket } from "../socket";

import { onMounted } from "vue";

onMounted(() => {
  socket.connect();
});
</script>

<style lang="scss" scoped></style>
