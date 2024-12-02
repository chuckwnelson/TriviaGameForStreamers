// const socket = io('http://localhost', {
//     transports: ['websocket'], // Required when using Vite
// });

export default (io, socketEvents) => {
  console.log('Starting Server')
  io.on('connection--', socket => socketEvents(io, socket))
}
