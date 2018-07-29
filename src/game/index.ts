import global from '@core/global'
import { Window } from '@core/window'
import * as di from '@core/di'
import { SystemManager } from '@core/ecs'
import { TextureManager } from '@core/graphics/texture'
import { ModelManager } from '@core/graphics/model'

import { RenderSystem } from '@game/render'
import * as resources from '@game/resources'
import * as models from '@game/model'

export class Game {
  window: Window
  systemManager: SystemManager
  textureManager: TextureManager
  modelManager: ModelManager

  constructor() {
    this.window = new Window()
    // setup global webgl2 context
    // the core is depends on this
    global.gl = this.window.gl

    const modelManager = new ModelManager()
    const textureManager = new TextureManager()
    const systemManager = new SystemManager(60)

    di.init(ModelManager, modelManager)
    di.init(TextureManager, textureManager)
    di.init(SystemManager, systemManager)

    this.modelManager = modelManager
    this.textureManager = textureManager
    this.systemManager = systemManager

    // add all the systems here, order matters
    this.systemManager.add(RenderSystem, new RenderSystem())
  }

  async init() {
    // load resources
    await this.textureManager.loadPNGs(resources.PNGs)

    // load models
    this.modelManager.add(models.Square, new models.Square(this.textureManager.texture('sample')))
  }

  start() {
    this.systemManager.startAllSystems()
    this.systemManager.start()
  }

  stop() {
    this.systemManager.stopAllSystems()
    this.systemManager.stop()
  }
}
