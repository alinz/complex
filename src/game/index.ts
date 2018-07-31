import * as di from '@core/di'
import { Window } from '@core/window'
import { TextureManager } from '@core/graphics/texture'
import { ModelManager } from '@core/graphics/model'
import { ShaderManager } from '@core/graphics/shader'
import { Runner } from '@core/scene'

import * as resource from '@game/resource'
import { FirstScene } from '@game/scene'

export class Main {
  window: Window
  runner: Runner

  constructor() {
    // window object must be initlized first
    // because it sets global WebGL2 context before any other
    // core components boots up
    this.window = new Window()
    console.log('initialized window')

    di.init(ModelManager, new ModelManager())
    di.init(TextureManager, new TextureManager())
    di.init(ShaderManager, new ShaderManager())

    console.log('initialized managers')
  }

  // load all models, textures, and audio files here
  async init() {
    const textureManager = di.instance(TextureManager)

    // load resources
    await textureManager.loadPNGs(resource.images)
    console.log('loaded textures')

    this.runner = new Runner(new FirstScene())
    this.runner.init()
  }

  start() {
    this.runner.start(60)
  }

  stop() {
    this.runner.stop()
  }
}
