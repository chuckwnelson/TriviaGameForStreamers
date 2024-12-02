import SocketIOClient from 'socket.io'

export default (socket: SocketIOClient.Socket) => {
  socket.on("connect", () => {
    console.log('Socket.io Connected', socket.id);
  });

  socket.on("disconnect", () => {
    console.log('Socket.io Disconnected', socket.id); // undefined
  });
}
