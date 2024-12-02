import './style.css'

export interface JoinGameType {
  url?: string;
}
export default function JoinGameComponent({url = window.location.href}:JoinGameType) {
  return (
    <div className="join-game">
      <div className="header">@ChuckWNelson</div>
      <div className="body">
        <div className="qr-code"><img src="//placehold.co/150x150" alt="" /></div>
      </div>
      <div className="footer">Join the Game</div>
    </div>
  )
}
