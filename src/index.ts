import { WindowManager } from '@core/window/index'
import { GameManager } from '@core/game'

import { MyGame } from '@game'

window.onload = () => {
  const gameManager = new GameManager(30.0)
  gameManager.start(new MyGame())

  setTimeout(() => {
    gameManager.stop()
  }, 10000)
}
