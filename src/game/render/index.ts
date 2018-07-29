import global from '@core/global'
import { System } from '@core/ecs'
import { ShaderManager } from '@core/graphics/shader'
import { ModelManager } from '@core/graphics/model'
import { mat4, vec3, Vec3 } from '@core/math'
import * as di from '@core/di'

import { SimpleShader } from '@game/shader'
import { Square } from '@game/model'

import { Camera } from '@game/entity'

const transformation = mat4.identity(mat4.createEmpty())

export class RenderSystem implements System {
  shaderManager: ShaderManager
  modelManager: ModelManager

  camera: Camera

  constructor() {
    this.shaderManager = new ShaderManager()

    this.camera = new Camera()
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
    gl.clearColor(0.1, 0.5, 0.8, 1.0)

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST)

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT)
  }

  beforeRender() {
    this.clearScreen()
    const shader = this.shaderManager.bind(SimpleShader)
    if (global.isAspectChanged) {
      // we need to setup projection matrix here
      const projectionMatrix = mat4.projectionMatrix(global.width, global.height, 70, 0.1, 1000.0)
      shader.loadProjectionMatrix(projectionMatrix)
    }

    this.camera.transform.position.values[2] = 1
    // update camera
    shader.loadViewMatrix(mat4.createViewMatrix(this.camera.transform.position, this.camera.transform.rotate))

    mat4.transformationMatrix(transformation, new Vec3(0.0, 0.0, 0.0), 0, 0, 0, 1.0)
    // mat4.identity(transformation)

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
