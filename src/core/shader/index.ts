import { Shader } from '@core/shader/shader'

export { Shader }

export const glsl3 = (strings: any) => {
  return '#version 300 es' + strings.raw[0]
}

export class ShaderManager {
  gl: WebGL2RenderingContext
  shadersMap: Map<{ new (gl: WebGL2RenderingContext): Shader }, Shader>
  currentBindedShader: Shader | null

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl
    this.shadersMap = new Map()
    this.currentBindedShader = null
  }

  add<T extends Shader>(ShaderClass: { new (gl: WebGL2RenderingContext): T }) {
    if (this.shadersMap.has(ShaderClass)) {
      throw new Error(`shader ${ShaderClass.name} already added`)
    }

    this.shadersMap.set(ShaderClass, new ShaderClass(this.gl))
  }

  bind<T extends Shader>(ShaderClass: { new (gl: WebGL2RenderingContext): T }): T {
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
