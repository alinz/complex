import { Game } from '@core/game'

export class MyGame implements Game {
  init() {
    console.log('init')
  }

  fixedUpdate(delta: number) {
    console.log('updating ' + delta)
  }

  lateUpdate(interpolation: number) {
    console.log('rendering', interpolation)
  }

  cleanup() {
    console.log('cleanup')
  }
}
