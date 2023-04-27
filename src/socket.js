import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  data: null,
});

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiRW1vbiIsInVzZXJJRCI6IjMifQ.2SjtIP_47GBceeYGhx6WWfA5LXoR0yKzA96nJKy-Cz4`;

// console.log(token);
export const socket = io(URL, {
  autoConnect: false,
  transportOptions: {
    polling: {
      extraHeaders: {
        BearerToken: token,
      },
    },
  },
});

function notifyMe(data) {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification(data.status, {
      body: data.id,
    });

    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification(data.status, {
          body: data.id,
        });
        // …
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}

socket.on("connect", () => {
  state.connected = true;
  if (socket.id) {
    state.data = socket;
    socket.emit("subscribe", "test");
  }
});

socket.on("response", (data) => {
  // Response from server
  console.log(JSON.parse(data));

  //notification
  notifyMe(JSON.parse(data));
});

socket.on("disconnect", () => {
  state.connected = false;
  state.data = null;
});
