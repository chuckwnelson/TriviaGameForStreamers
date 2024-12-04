import { useRef, useEffect } from 'react'

// export type Player = {
//   id: number;
//   socketID: string;
// }
export default function PlayerComponent({ socketID, isMe }: { socketID:string, isMe:boolean }) {

  let translateX = Math.random() * window.innerWidth - window.innerWidth / 2


  return (
    <div className="player" style={{translate: translateX}}>
      <PlayerSprite name={"Player: " + socketID} />
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
