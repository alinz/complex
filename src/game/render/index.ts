import { System } from '@core/system'
import { ShaderManager } from '@core/shader'
import { GeometryManager } from '@core/geometry'

import { SimpleShader } from '@game/render/shader'
import { Triangle, Square } from '@game/geometry'

export class RenderSystem implements System {
  gl: WebGL2RenderingContext
  shaderManager: ShaderManager
  geometryManager: GeometryManager

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl
    this.shaderManager = new ShaderManager(gl)
    this.geometryManager = new GeometryManager(gl)
  }

  init() {
    // add all shaders here
    this.shaderManager.add(SimpleShader)
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

  clearScreen() {
    const { gl } = this

    // Clear the canvas
    gl.clearColor(0.5, 0.5, 0.5, 1.0)

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST)

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT)
  }

  beforeRender() {
    this.clearScreen()
    this.shaderManager.bind(SimpleShader)
  }

  render() {
    //
    const { gl } = this

    const geometry = this.geometryManager.getInstance(Square)

    geometry.bind()
    gl.drawElements(gl.TRIANGLE_STRIP, geometry.vertexCount, gl.UNSIGNED_SHORT, 0)
  }

  afterRender() {
    //
  }
}
