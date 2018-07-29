import global from '@core/global'
import { Window } from '@core/window'
import * as di from '@core/di'
import { SystemManager, EntityManager } from '@core/ecs'
import { TextureManager } from '@core/graphics/texture'
import { ModelManager } from '@core/graphics/model'
import { ShaderManager } from '@core/graphics/shader'

import { RenderSystem, GameSystem } from '@game/system'
import * as resources from '@game/resources'
import * as models from '@game/model'

export class App {
  window: Window
  systemManager: SystemManager
  textureManager: TextureManager
  modelManager: ModelManager

  constructor() {
    // window object must be initlized first
    // because it sets global WebGL2 context before any other
    // core components boots up
    this.window = new Window()

    const modelManager = new ModelManager()
    const textureManager = new TextureManager()
    const systemManager = new SystemManager(60)
    const shaderManager = new ShaderManager()
    const entityManager = new EntityManager()

    di.init(ModelManager, modelManager)
    di.init(TextureManager, textureManager)
    di.init(SystemManager, systemManager)
    di.init(ShaderManager, shaderManager)
    di.init(EntityManager, entityManager)

    this.modelManager = modelManager
    this.textureManager = textureManager
    this.systemManager = systemManager
  }

  // load all models, textures, and audio files here
  async init() {
    // load resources
    await this.textureManager.loadPNGs(resources.images)

    // load models
    this.modelManager.add(models.Square, new models.Square(this.textureManager.texture(resources.images.sample.key)))

    // add all the systems here, order matters
    // NOTE: systems must be added last
    this.systemManager.add(GameSystem, new GameSystem())
    this.systemManager.add(RenderSystem, new RenderSystem())
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
