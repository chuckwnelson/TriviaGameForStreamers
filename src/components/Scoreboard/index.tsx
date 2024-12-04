import './style.css'

type ScoreObj = {
  round: number;
  leaderName?: string;
  leaderScore?: number;
  gameTimer: { update: number };
  gameState: { status: string; roundTime: number; };
}

export default function ScoreboardComponent({round = 1, leaderName, leaderScore, gameTimer, gameState}:ScoreObj) {
  return (
    <div className="scoreboard">
      <div>
        <div>Round # {round}</div>
        <div>Leader: {leaderName} @ {leaderScore}</div>
        <div>Timers</div>
        <div>Streamer Announcement</div>
      </div>
      <div className="countdown-clock">
        <div className='clock-number'>{gameTimer.update % gameState.roundTime }</div>
        <div className='clock-bar' style={{ width: ((gameTimer.update % 11) * 10) + '%' }}></div>
      </div>
    </div>
  )
}
