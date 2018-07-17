require("socket.io-client");

const socket = io.connect("ws://localhost:3000");

console.log(socket);