import { System } from '@core/system'
import { ShaderManager } from '@core/shader'

import { SimpleShader } from '@game/render/shader'

export class RenderSystem implements System {
  gl: WebGL2RenderingContext
  shaderManager: ShaderManager

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl
    this.shaderManager = new ShaderManager(gl)
  }

  init() {
    // loading shaders
    // loading some assets
  }

  start() {}

  fixedUpdate(delta: number) {}

  lateUpdate(interpolation: number) {
    this.beforeRender()
    this.render()
    this.afterRender()
  }

  stop() {}

  cleanup() {}

  beforeRender() {}

  render() {}

  afterRender() {}
}
