import global from '@core/global'
import { Window } from '@core/window'
import { SystemManger } from '@core/ecs'

import { RenderSystem } from '@game/render'

export class Game {
  window: Window
  systemManager: SystemManger

  constructor() {
    this.window = new Window()
    this.systemManager = new SystemManger(60)

    // setup global webgl2 context
    // the core is depends on this
    global.gl = this.window.gl

    // add all the systems here, order matters
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
