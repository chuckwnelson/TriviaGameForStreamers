import { useState, useEffect } from 'react'
import { io } from "socket.io-client"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import socketEvents from './lib/socketio-client'

import GameState from './lib/gameState'

import PlayerComponent from './components/Player'
import Questions from './components/Questions'
import Scoreboard from './components/Scoreboard'
import GameSettings from './components/GameSettings'
import JoinGame from './components/JoinGame'

import TriviaData from './assets/exampleTrivia.json'

function App() {
  const gameStateObj = new GameState();
  const [gameState, setGameState] = useState(gameStateObj)
  const [players, setPlayers] = useState([{id: 1, socketID: '123'}, {id: 2, socketID: null}])

  useEffect(() => {
    console.log('gameState', gameState)
    const socket = io();
    socketEvents(socket)
  }, [])

  return (
    <div className="container">
      <div className="overlay">
        <GameSettings />
      </div>
      <div className="top">
        <Scoreboard />
      </div>
      <div className="middle">
        {[TriviaData.questions[0]].map((question, k) => <Questions key={'question' + k} question={question} />)}
      </div>
      <div className="bottom">
        <JoinGame />
        <div className="players">
          {players.map((player, i) => <PlayerComponent key={'player' + i} player={player} isMe={player.socketID === '123'} />)}
        </div>
      </div>
    </div>
  )
}

export default App
