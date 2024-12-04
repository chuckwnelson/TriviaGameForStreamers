import { useState, useEffect } from 'react'
import { socket } from './lib/socket'
import './App.css'

import Debugger from './components/Debugger'
import PlayerComponent from './components/Player'
import {Player} from './components/Player'
import Questions from './components/Questions'
import Scoreboard from './components/Scoreboard'
import GameSettings from './components/GameSettings'
import JoinGame from './components/JoinGame'

import TriviaData from './assets/exampleTrivia.json'

function App() {
  const initialGameState = {
    status: 'paused',
    currentRound: 0,
    currentQuestionInRound: 0,
    roundTime: 20,
    reviewTime: 10,
  }

  const initialGameTimer = {
    update: 1
  }
  const [connectionState, setConnectionState] = useState({connected: false})
  const [gameState, setGameState] = useState(initialGameState)
  const [gameTimer, setGameTimer] = useState(initialGameTimer)
  const [players, setPlayers] = useState([])

  const [fooEvents, setFooEvents] = useState(1);

  useEffect(() => {
    // console.log('gameState', gameState)
    // console.log('gameTimer', gameTimer)

    socket.on('connect', () => {
      console.log('--connected--', socket)
      setConnectionState({connected: true});
    });

    socket.on('disconnect', (socket) => {
      console.log('--disconnected--')
      setConnectionState({connected: false});
    });


    // no-op if the socket is already connected
    console.log('connecting...')
    socket.connect()

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("playerJoin", (socketID:string) => {
      console.log('Player Join', players.indexOf(socketID));
      if(players.indexOf(socketID) < 0) {
        setPlayers(previous => previous.concat(socketID))
      }
    });

    socket.on("playerLeft", (socketID:string) => {
      console.log('Player Left', socketID);
      setPlayers(previous => previous.filter(playerID => playerID !== socketID))
    });

    function onFooEvent(value:number) {
      setFooEvents((prevValue) => prevValue + value);
    }
    socket.on('foo', onFooEvent);

    // const socketEventsCleanup = socketEvents(socket)

    return () => {
      socket.off('foo', onFooEvent);
    };
  }, [players]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if(gameState.status !== 'paused') {

        if(gameTimer.update % gameState.roundTime === 0) {

          if(gameState.status === 'questioning') {
            setGameState((prevGameState) => { return { ...prevGameState, status: 'reviewing-answers' } })

          } else if(gameState.status === 'reviewing-answers') {
            setGameState((prevGameState) => { return { ...prevGameState, status: 'questioning', currentQuestionInRound: prevGameState.currentQuestionInRound++ } })
          }

        }

        setGameTimer(prevGameTimer => { return {update: prevGameTimer.update++} })
      }
    }, 1000)
    return () => clearInterval((intervalId))
  },[gameState, gameTimer])

  return (
    <div className="container">
      <Debugger connectionState={connectionState} numberOfPlayers={players.length} foo={fooEvents} gameTimer={gameTimer} gameState={gameState} />
      <div className="overlay">
        <GameSettings />
      </div>
      <div className="top">
        <button onClick={() => { setGameState((prevGameState) => { return { ...prevGameState, status: 'questioning' } }) } }>Start</button>
        <button onClick={() => { setGameState((prevGameState) => { return { ...prevGameState, status: 'paused' } }) } }>Stop</button>
        <Scoreboard gameTimer={gameTimer} gameState={gameState} />
      </div>
      <div className="middle">
        {[TriviaData.questions[gameState.currentQuestionInRound]].map((question, k) => <Questions key={'question' + k} question={question} />)}
      </div>
      <div className="bottom" onClick={() => { socket.emit('foo', 1); }}>
        <JoinGame />
        <div className="players">
          {players.map((socketID, i) => <PlayerComponent key={'player' + i} socketID={socketID} isMe={socketID === '123'} />)}
        </div>
      </div>
    </div>
  )
}

export default App
