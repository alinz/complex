import { VBO_Location } from '@core/webgl-util'
import { Shader, glsl3 } from '@core/shader'
import { Mat4 } from '@core/math'

const vertexSrc = glsl3`
  in vec3 coordinates;

  uniform mat4 transformationMatrix;

  void main(void) {
    gl_Position = transformationMatrix * vec4(coordinates, 1.0);
  }
`

const fragmentSrc = glsl3`
  precision highp float;

  out vec4 outColor;

  void main(void) {
    outColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
`

export class SimpleShader extends Shader {
  transformationMatrix: WebGLUniformLocation

  constructor(gl: WebGL2RenderingContext) {
    super(gl, vertexSrc, fragmentSrc)

    this.transformationMatrix = this.getUniformLocation('transformationMatrix')
  }

  bindAllAttributes() {
    this.bindAttribute('coordinates', VBO_Location.Vertex)
  }

  loadTransformationMatrix(matrix: Mat4) {
    this.loadMatrix(this.transformationMatrix, matrix.values)
  }
}
