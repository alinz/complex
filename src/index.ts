import { Game } from '@game'

window.onload = () => {
  const game = new Game()

  game.start()

  setTimeout(() => {
    game.stop()
  }, 3000)
}
