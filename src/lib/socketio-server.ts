export default (io, socketEvents) => {
  console.log('Starting SocketIO Server')

  io.on('connection', (socket) => {
    socketEvents(io, socket)
  })
}
