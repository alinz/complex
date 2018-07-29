import { System, EntityManager } from '@core/ecs'
import * as di from '@core/di'
import { ModelManager } from '@core/graphics/model'

import { Sample } from '@game/entity'

export class GameSystem implements System {
  constructor() {
    //
  }

  init(): void {
    //
    const modelManager = di.instance(ModelManager)
    const entityManager = di.instance(EntityManager)

    // add the SampleEntity here
    const sample = new Sample()
    entityManager.add(sample)
  }

  start(): void {
    //
  }

  fixedUpdate(delta: number): void {
    //
  }

  lateUpdate(interpolation: number): void {
    //
  }

  stop(): void {
    //
  }

  cleanup(): void {
    //
  }
}
