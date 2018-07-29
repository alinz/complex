import global from '@core/global'
import { Window } from '@core/window'
import * as di from '@core/di'
import { SystemManager } from '@core/ecs'
import { TextureManager } from '@core/graphics/texture'
import { ModelManager } from '@core/graphics/model'
import { ShaderManager } from '@core/graphics/shader'

import { RenderSystem } from '@game/system'
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
    const shaderManager = new ShaderManager()

    di.init(ModelManager, modelManager)
    di.init(TextureManager, textureManager)
    di.init(SystemManager, systemManager)
    di.init(ShaderManager, shaderManager)

    this.modelManager = modelManager
    this.textureManager = textureManager
    this.systemManager = systemManager

    // add all the systems here, order matters
    this.systemManager.add(RenderSystem, new RenderSystem())
  }

  async init() {
    // load resources
    await this.textureManager.loadPNGs(resources.images)

    // load models
    this.modelManager.add(models.Square, new models.Square(this.textureManager.texture(resources.images.sample.key)))
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
