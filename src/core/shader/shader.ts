export class Shader {
  gl: WebGL2RenderingContext
  vertex: WebGLShader
  fragment: WebGLShader
  program: WebGLProgram | null

  constructor(gl: WebGL2RenderingContext, vertex: string, fragment: string) {
    this.gl = gl
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
    this.gl.useProgram(this.program)
  }

  stop() {
    this.gl.useProgram(null)
  }

  cleanUp() {
    const { gl } = this

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
    const { gl } = this

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
    this.gl.bindAttribLocation(this.program, index, name)
  }

  getUniformLocation(name: string): WebGLUniformLocation {
    const loc = this.gl.getUniformLocation(this.program, name)
    if (loc === null) {
      throw new Error(`location for ${name} is null`)
    }

    return loc
  }

  loadFloat(location: WebGLUniformLocation, value: number) {
    this.gl.uniform1f(location, value)
  }

  loadVector(location: WebGLUniformLocation, vector: Float32Array) {
    this.gl.uniform3fv(location, vector)
  }

  loadMatrix(location: WebGLUniformLocation, matrix: Float32Array) {
    this.gl.uniformMatrix4fv(location, false, matrix)
  }

  // it should try to bind all attributes for this shaders.
  // try to use `bindAttribute` method for binding attributes
  bindAllAttributes(): void {}
}
