import * as di from '@core/di'
import { System, Operation } from '@core/ecs'

import * as entity from '@game/entity'

export class GameSystem implements System {
  constructor() {
    //
  }

  componentTypes(): Array<number> {
    return []
  }

  init(op: Operation): void {
    console.log('add camera and sample entities')

    // setup camera and position it in the scene
    const camera = new entity.Camera()
    camera.transform.position.values[2] = 10
    op.add(camera)

    // add a simple model with texture in the scene
    const sample = new entity.Sample()
    op.add(sample)
  }

  start(): void {
    //
  }

  fixedUpdate(delta: number, op: Operation): void {
    //
  }

  lateUpdate(interpolation: number, op: Operation): void {
    //
  }

  stop(): void {
    //
  }

  clean(): void {
    //
  }
}
