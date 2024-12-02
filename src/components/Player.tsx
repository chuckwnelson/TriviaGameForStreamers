type Player = {
  id: number;
  socketID: string;
}
export default function PlayerComponent({ player, isMe }: { player:Player, isMe:boolean }) {
  return (
    <div className="player" style={{translate: Math.random() * window.innerWidth - window.innerWidth/2}}>
      <PlayerSprite name={"Player" + player.id} />
       {isMe && 'ME'}
    </div>
  )
}

function PlayerSprite({name}) {


  return (
    <div className="player-sprite">
      {name}
    </div>
  )
}
