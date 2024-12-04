export default (io, socket) => {
  console.log('socket.io - connection: ', socket.id);
  io.emit("playerJoin", socket.id);

  socket.on("foo", (value) => {
    io.emit("foo", 1)
  });

  socket.on("startGame", (value) => {
    io.emit("startGame", 1)

    setTimeout(() => io.emit("nextState", 1), 10000)
  });

  socket.on("pauseGame", (value) => {
    io.emit("pauseGame", 1)
  });

  socket.on('disconnect', () => {
    console.log(`socket.io - socket.id \`${socket.id}\` disconnected`)
    io.emit("playerLeft", socket.id);
  })
}
