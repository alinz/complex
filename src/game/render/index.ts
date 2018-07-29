import global from '@core/global'
import { System } from '@core/ecs'
import { ShaderManager } from '@core/graphics/shader'
import { ModelManager } from '@core/graphics/model'
import { mat4, vec3, Vec3 } from '@core/math'
import * as di from '@core/di'

import { SimpleShader } from '@game/shader'
import { Square } from '@game/model'

const transformation = mat4.identity(mat4.createEmpty())

export class RenderSystem implements System {
  shaderManager: ShaderManager
  modelManager: ModelManager

  constructor() {
    this.shaderManager = new ShaderManager()
  }

  init() {
    this.modelManager = di.instance(ModelManager)

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
    const { gl } = global

    // Clear the canvas
    gl.clearColor(0.1, 0.5, 0.5, 1.0)

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST)

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT)
  }

  beforeRender() {
    this.clearScreen()
    const shader = this.shaderManager.bind(SimpleShader)

    mat4.transformationMatrix(transformation, new Vec3(0.0, 0.0, 0.0), 0, 0, 0, 1.0)

    shader.loadTransformationMatrix(transformation)
  }

  render() {
    //
    const { gl } = global

    const model = this.modelManager.autoBind(Square)

    gl.drawElements(gl.TRIANGLES, model.vertexCount, gl.UNSIGNED_SHORT, 0)
  }

  afterRender() {
    const { gl } = global

    //
    this.shaderManager.unbind()

    // disable the depth test
    gl.disable(gl.DEPTH_TEST)
  }
}
