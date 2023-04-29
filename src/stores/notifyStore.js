import { defineStore } from "pinia";
import { ref } from "vue";
import { socket } from "../socket";

export const useNotifyStore = defineStore("notify", () => {
  const projectName = ref(null);
  const userId = ref(null);
  // const isAll = ref("all");

  const handleSetProejctSubscribe = () => {
    const data = {
      projectName: projectName.value, 
      userId: userId.value,
      // sendProposal: isAll.value,
    };
    console.log("data", data);
    socket.emit("subscribe", data);
  };

  return {
    projectName,
    userId,
    // isAll,
    handleSetProejctSubscribe,
  };
});
