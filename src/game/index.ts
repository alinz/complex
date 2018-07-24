import global from '@core/global'
import { Window } from '@core/window'
import { SystemManger } from '@core/ecs'
import { TextureManager } from '@core/graphics/texture'
import { ModelManager } from '@core/graphics/model'

import { RenderSystem } from '@game/render'
import * as resources from '@game/resources'
import * as models from '@game/model'

export class Game {
  window: Window
  systemManager: SystemManger
  textureManager: TextureManager
  modelManager: ModelManager

  constructor() {
    this.window = new Window()
    // setup global webgl2 context
    // the core is depends on this
    global.gl = this.window.gl

    this.modelManager = new ModelManager()
    this.textureManager = new TextureManager()
    this.systemManager = new SystemManger(60)

    // add all the systems here, order matters
    this.systemManager.add(RenderSystem, new RenderSystem(this.modelManager))
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
