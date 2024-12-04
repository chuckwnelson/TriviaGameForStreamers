import { defineConfig } from 'vite'
import vitePluginSocketIO from 'vite-plugin-socket-io'
import react from '@vitejs/plugin-react'
import SocketServer from './src/lib/socketio-server'
import SocketEvents from './src/lib/socketio-server-events'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginSocketIO({serverEvents: SocketServer, socketEvents: SocketEvents})],
})
