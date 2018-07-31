import * as di from '@core/di'
import { Scene } from '@core/scene'
import { ModelManager } from '@core/graphics/model'

import * as system from '@game/system'
import * as model from '@game/model'

export class FirstScene extends Scene {
  constructor() {
    super()

    // load models
    const modelManager = di.instance(ModelManager)
    modelManager.add(model.Square)

    // adding systems here
    this.addSystem(system.GameSystem)
    this.addSystem(system.RenderSystem)
    console.log('added Game and Render systems')
  }
}
