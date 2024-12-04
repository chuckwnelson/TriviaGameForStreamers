import './style.css'

type ConnectionState = {
  connected: boolean;
}
export default function DebuggerComponent({connectionState, numberOfPlayers, foo, gameTimer, gameState}:{connectionState:ConnectionState, numberOfPlayers:number, foo:number}) {
  return (
    <ul className="debugger">
      <li>Connection: { (connectionState.connected) ? 'Connected' : 'Disconnected' } </li>
      <li># of Players: { numberOfPlayers } </li>
      <li>Foo: { foo } </li>
      <li>GameTimer: { gameTimer.update } </li>
      <li>GameState: { gameState.status } </li>
    </ul>
  )
}
