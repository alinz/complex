import { getTime } from '@core/time'

import { Scene } from './scene'

export class Runner {
  isRunning: boolean
  scene: Scene

  constructor(scene: Scene) {
    this.isRunning = false
    this.scene = scene
  }

  init() {
    this.scene.init()
  }

  start(ups: number = 60) {
    if (!this.isRunning) {
      this.runLoop(ups)
    }
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false
    }
  }

  runLoop(ups: number) {
    if (this.isRunning) {
      return
    }

    const scene = this.scene
    const step = 1 / ups
    const slow = 1

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
        scene.fixedUpdate(step)
      }

      renderCounter++
      scene.lateUpdate(dt / slow)
      last = now

      if (this.isRunning) {
        requestAnimationFrame(internal)
      } else {
        scene.clean()
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
