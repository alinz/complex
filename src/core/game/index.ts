import { getTime } from '@core/time'

export interface Game {
  init()
  fixedUpdate(delta: number)
  lateUpdate(interpolation: number)
  cleanup()
}

export class GameManager {
  isRunning: boolean
  frameTime: number
  frameRate: number
  game: Game | null

  constructor(frameRate: number) {
    this.isRunning = false
    this.frameRate = frameRate * 1.0
    this.frameTime = 1.0 / this.frameRate
  }

  start(game: Game) {
    if (!this.isRunning) {
      this.game = game
      this.runLoop()
    }
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false
    }
  }

  runLoop() {
    if (this.isRunning || this.game == null) {
      return
    }

    const game = this.game
    const step = this.frameTime
    const slow = 1

    game.init()

    let now = 0
    let dt = 0
    let last = getTime()
    let slowStep = slow * step
    let delta = 0.0

    let updateCounter = 0
    let renderCounter = 0
    let deltaCounter = 0.0

    const internal = () => {
      now = getTime()
      delta = now - last
      dt = dt + Math.min(1, delta / 1000)

      while (dt > slowStep) {
        updateCounter++
        dt = dt - slowStep
        game.fixedUpdate(step)
      }

      renderCounter++
      game.lateUpdate(dt / slow)
      last = now

      if (this.isRunning) {
        requestAnimationFrame(internal)
      } else {
        game.cleanup()
        return
      }

      deltaCounter += delta / 1000
      if (deltaCounter >= 1) {
        console.log(updateCounter, renderCounter)
        deltaCounter = 0
        updateCounter = 0
        renderCounter = 0
      }
    }

    this.isRunning = true
    requestAnimationFrame(internal)
  }
}
