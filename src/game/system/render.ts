import global from '@core/global'
import { System, Operation, Entity } from '@core/ecs'
import { ShaderManager } from '@core/graphics/shader'
import { mat4, vec3, Vec3 } from '@core/math'
import * as di from '@core/di'

import { SimpleShader } from '@game/shader'
import { Square } from '@game/model'
import { Camera } from '@game/entity'
import * as component from '@game/component'

const transformation = mat4.identity(mat4.createEmpty())

const cameraBucket = component.Camera.Type
const renderableBucket = component.Geometry.Type | component.Transform.Type

export class RenderSystem implements System {
  shaderManager: ShaderManager

  constructor() {
    // load shaders
    this.shaderManager = di.instance(ShaderManager)
    this.shaderManager.add(SimpleShader)
  }

  componentTypes(): Array<number> {
    return [cameraBucket, renderableBucket]
  }

  init(op: Operation) {}

  start() {}

  fixedUpdate(delta: number, op: Operation) {}

  lateUpdate(interpolation: number, op: Operation) {
    this.beforeRender(interpolation, op)
    this.render(interpolation, op)
    this.afterRender(interpolation, op)
  }

  stop() {}

  clean() {}

  clearScreen() {
    const { gl } = global

    // Clear the canvas
    gl.clearColor(0.1, 0.5, 0.8, 1.0)

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST)

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT)
  }

  beforeRender(interpolation: number, op: Operation) {
    const { gl } = global

    this.clearScreen()
    const shader = this.shaderManager.bind(SimpleShader)

    // we need to setup projection matrix and viewport here
    // if aspect ratio is changed
    if (global.isAspectChanged) {
      // Tell WebGL how to convert from clip space to pixels
      gl.viewport(0, 0, global.width, global.height)
      const projectionMatrix = mat4.projectionMatrix(global.width, global.height, 70, 0.1, 1000.0)
      shader.loadProjectionMatrix(projectionMatrix)
    }

    // nead to load the camera
    const camera = op.find<Camera>(cameraBucket)[0]
    shader.loadViewMatrix(mat4.createViewMatrix(camera.transform.position, camera.transform.rotate))
  }

  render(interpolation: number, op: Operation) {
    //
    const { gl } = global

    const shader = this.shaderManager.bind(SimpleShader)
    const renderables = op.find<Entity & { transform: component.Transform; geometry: component.Geometry }>(renderableBucket)

    for (const renderable of renderables) {
      const transform = renderable.transform
      mat4.transformationMatrix(
        transformation,
        transform.position,
        transform.rotate.values[0],
        transform.rotate.values[1],
        transform.rotate.values[2],
        transform.scale
      )

      shader.loadTransformationMatrix(transformation)

      const model = renderable.geometry.model
      model.bind()
      gl.drawElements(gl.TRIANGLES, model.vertexCount, gl.UNSIGNED_SHORT, 0)
    }
  }

  afterRender(interpolation: number, op: Operation) {
    const { gl } = global

    //
    this.shaderManager.unbind()

    // disable the depth test
    gl.disable(gl.DEPTH_TEST)
  }
}
