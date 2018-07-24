import 'babel-polyfill'

import { Game } from '@game'

window.onload = async () => {
  const game = new Game()

  // waiting until all the resources and io completed
  // here.
  await game.init()

  game.start()

  setTimeout(() => {
    game.stop()
  }, 3000)
}
