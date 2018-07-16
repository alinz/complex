import { DataLocation } from '@core/geometry'
import { Shader, glsl3 } from '@core/shader'
import { Mat4 } from '@core/math'

const vertexSrc = glsl3`
  in vec3 coordinates;

  void main(void) {
    gl_Position = vec4(coordinates, 1.0);
  }
`

const fragmentSrc = glsl3`
  precision highp float;

  out vec4 outColor;

  void main(void) {
    outColor = vec4(0.0, 0.0, 1.0, 0.1);
  }
`

export class SimpleShader extends Shader {
  constructor(gl: WebGL2RenderingContext) {
    super(gl, vertexSrc, fragmentSrc)
  }

  bindAllAttributes() {
    this.bindAttribute('coordinates', DataLocation.Vertex)
  }
}
