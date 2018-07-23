import 'babel-polyfill'

import { loadImages } from '@core/loader'

import { Game } from '@game'
import * as images from '@game/resources'

console.log(images)

window.onload = () => {
  loadImages(images.sample).then(images => {
    const game = new Game()

    game.start()

    setTimeout(() => {
      game.stop()
    }, 3000)
  })
}
