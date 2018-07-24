import global from '@core/global'
import { Window } from '@core/window'
import { SystemManger } from '@core/ecs'
import { TextureManager } from '@core/graphics/texture'

import { RenderSystem } from '@game/render'
import * as recources from '@game/resources'

export class Game {
  window: Window
  systemManager: SystemManger
  textureManager: TextureManager

  constructor() {
    this.window = new Window()
    // setup global webgl2 context
    // the core is depends on this
    global.gl = this.window.gl

    this.textureManager = new TextureManager()
    this.systemManager = new SystemManger(60)

    // add all the systems here, order matters
    this.systemManager.add(RenderSystem, new RenderSystem())
  }

  async init() {
    // load resources
    await this.textureManager.loadPNGs(recources.PNGs)
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
