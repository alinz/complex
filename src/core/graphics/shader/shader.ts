import global from '@core/global'

export class Shader {
  vertex: WebGLShader
  fragment: WebGLShader
  program: WebGLProgram | null

  constructor(vertex: string, fragment: string) {
    const { gl } = global

    this.vertex = this.compileShader(vertex, gl.VERTEX_SHADER)
    this.fragment = this.compileShader(fragment, gl.FRAGMENT_SHADER)

    this.program = gl.createProgram()

    gl.attachShader(this.program, this.vertex)
    gl.attachShader(this.program, this.fragment)

    this.bindAllAttributes()

    gl.linkProgram(this.program)
    gl.validateProgram(this.program)
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      throw new Error(`validation shader error: ${gl.getProgramInfoLog(this.program) || 'unknown'}`)
    }
  }

  start() {
    global.gl.useProgram(this.program)
  }

  stop() {
    global.gl.useProgram(null)
  }

  cleanUp() {
    const { gl } = global

    // stop the shader
    this.stop()

    // clean up the shader
    gl.detachShader(this.program, this.vertex)
    gl.detachShader(this.program, this.fragment)
    gl.deleteShader(this.vertex)
    gl.deleteShader(this.fragment)
    gl.deleteProgram(this.program)
  }

  compileShader(src: string, type: number): WebGLShader {
    const { gl } = global

    const shader = gl.createShader(type)

    if (shader === null) {
      throw new Error(`can't create shader`)
    }

    gl.shaderSource(shader, src)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(`compiled shader error: ${gl.getShaderInfoLog(shader) || 'unknown'}`)
    }

    return shader
  }

  bindAttribute(name: string, index: number): void {
    global.gl.bindAttribLocation(this.program, index, name)
  }

  getUniformLocation(name: string): WebGLUniformLocation {
    const loc = global.gl.getUniformLocation(this.program, name)
    if (loc === null) {
      throw new Error(`location for ${name} is null`)
    }

    return loc
  }

  loadFloat(location: WebGLUniformLocation, value: number) {
    global.gl.uniform1f(location, value)
  }

  loadVector(location: WebGLUniformLocation, vector: Float32Array) {
    global.gl.uniform3fv(location, vector)
  }

  loadMatrix(location: WebGLUniformLocation, matrix: Float32Array) {
    global.gl.uniformMatrix4fv(location, false, matrix)
  }

  // it should try to bind all attributes for this shaders.
  // try to use `bindAttribute` method for binding attributes
  bindAllAttributes(): void {}
}
