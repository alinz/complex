import { VBO_Location } from '@core/webgl-util'
import { Shader, glsl3 } from '@core/shader'
import { Mat4 } from '@core/math'

const vertexSrc = glsl3`
  in vec3 coordinates;

  uniform mat4 projectionMatrix;
  uniform mat4 transformationMatrix;
  uniform mat4 viewMatrix;

  void main(void) {
    gl_Position = projectionMatrix * viewMatrix * transformationMatrix * vec4(coordinates, 1.0);
  }
`

const fragmentSrc = glsl3`
  precision highp float;

  out vec4 outColor;

  void main(void) {
    outColor = vec4(0.0, 0.0, 1.0, 0.1);
  }
`

export class StaticShader extends Shader {
  transformationMatrix: WebGLUniformLocation
  projectionMatrix: WebGLUniformLocation
  viewMatrix: WebGLUniformLocation

  constructor(gl: WebGL2RenderingContext) {
    super(gl, vertexSrc, fragmentSrc)

    this.transformationMatrix = this.getUniformLocation('transformationMatrix')
    this.projectionMatrix = this.getUniformLocation('projectionMatrix')
    this.viewMatrix = this.getUniformLocation('viewMatrix')
  }

  bindAllAttributes() {
    this.bindAttribute('coordinates', VBO_Location.Vertex)
  }

  loadProjectionMatrix(matrix: Mat4) {
    this.loadMatrix(this.projectionMatrix, matrix.values)
  }

  loadTransformationMatrix(matrix: Mat4) {
    this.loadMatrix(this.transformationMatrix, matrix.values)
  }

  loadViewMatrix(matrix: Mat4) {
    this.loadMatrix(this.viewMatrix, matrix.values)
  }
}
