export default function GameStateObj() {
  this.status = 'waiting'

  this.init = function() {
    console.log('Init Game State Instance')
  }
}
