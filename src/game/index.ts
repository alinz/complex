import { Window } from '@core/window'
import { SystemManger } from '@core/system'

import { RenderSystem } from '@game/render'

export class Game {
  window: Window
  systemManager: SystemManger

  constructor() {
    this.window = new Window()
    this.systemManager = new SystemManger(60)

    // add all the systems here, order matters
    this.systemManager.add(RenderSystem, new RenderSystem(this.window.gl))
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
