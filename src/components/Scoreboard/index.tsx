import './style.css'

type ScoreObj = {
  round: number;
  leaderName?: string;
  leaderScore?: number;
}

export default function ScoreboardComponent({round = 1, leaderName, leaderScore}:ScoreObj) {
  return (
    <div className="scoreboard">
      <div>Round # {round}</div>
      <div>Leader: {leaderName} @ {leaderScore}</div>
      <div>Timers</div>
      <div>Streamer Announcement</div>
    </div>
  )
}
