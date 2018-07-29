import global from '@core/global'

import { Shader } from './shader'

export class ShaderManager {
  shadersMap: Map<{ new (gl: WebGL2RenderingContext): Shader }, Shader>
  currentBindedShader: Shader | null

  constructor() {
    this.shadersMap = new Map()
    this.currentBindedShader = null
  }

  add<T extends Shader>(ShaderClass: { new (): T }): T {
    if (this.shadersMap.has(ShaderClass)) {
      throw new Error(`shader ${ShaderClass.name} already added`)
    }

    const shader = new ShaderClass()
    this.shadersMap.set(ShaderClass, shader)
    return shader
  }

  bind<T extends Shader>(ShaderClass: { new (): T }): T {
    const reqShader = this.shadersMap.get(ShaderClass)
    if (!reqShader) {
      throw new Error(`shader ${ShaderClass.name} not found to be binded`)
    }

    if (this.currentBindedShader && this.currentBindedShader === reqShader) {
      return reqShader as T
    }

    if (this.currentBindedShader) {
      this.currentBindedShader.stop()
    }

    this.currentBindedShader = reqShader
    this.currentBindedShader.start()

    return reqShader as T
  }

  unbind() {
    if (this.currentBindedShader) {
      this.currentBindedShader.stop()
      this.currentBindedShader = null
    }
  }

  cleanUp() {
    this.shadersMap.forEach((shader, _) => {
      shader.cleanUp()
    })

    this.shadersMap.clear()
  }
}
