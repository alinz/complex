import { System } from '@core/system'
import { ShaderManager } from '@core/shader'
import { GeometryManager } from '@core/geometry'
import { mat4, vec3, Vec3 } from '@core/math'

import { SimpleShader } from '@game/render/shader'
import { Triangle, Square } from '@game/geometry'

const transformation = mat4.identity(mat4.createEmpty())

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
    const simpleShader = this.shaderManager.bind(SimpleShader)

    mat4.transformationMatrix(transformation, new Vec3(0.2, 0.4, 0.0), 0, 0, 0, 1.0)

    simpleShader.loadTransformationMatrix(transformation)
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
    this.shaderManager.unbind()
  }
}
