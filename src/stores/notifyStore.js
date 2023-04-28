import { defineStore } from "pinia";
import { ref } from "vue";
import { socket } from "../socket";

export const useNotifyStore = defineStore("notify", () => {
  const projectName = ref(null);

  const handleSetProejctSubscribe = () => {
    console.log("handleSetProejctSubscribe");
    socket.emit("subscribe", projectName.value);
  };

  return {
    projectName,
    handleSetProejctSubscribe,
  };
});
