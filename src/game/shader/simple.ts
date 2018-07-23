import { VBO_Location } from '@core/graphics/helper'
import { Shader, glsl3 } from '@core/graphics/shader'
import { Mat4 } from '@core/math'

const vertexSrc = glsl3`
  in vec3 coordinates;
  in vec2 textureCoords;
  out vec2 passed_textureCoords;

  uniform mat4 transformationMatrix;

  void main(void) {
    gl_Position = transformationMatrix * vec4(coordinates, 1.0);
    passed_textureCoords = textureCoords;
  }
`

const fragmentSrc = glsl3`
  precision highp float;

  in vec2 passed_textureCoords;
  out vec4 outColor;

  uniform sampler2D textureSampler;

  void main(void) {
    //outColor = vec4(1.0, 1.0, 1.0, 1.0);
    outColor = texture(textureSampler, passed_textureCoords);
  }
`

export class SimpleShader extends Shader {
  transformationMatrix: WebGLUniformLocation

  constructor() {
    super(vertexSrc, fragmentSrc)

    this.transformationMatrix = this.getUniformLocation('transformationMatrix')
  }

  bindAllAttributes() {
    this.bindAttribute('coordinates', VBO_Location.Vertex)
    this.bindAttribute('textureCoords', VBO_Location.Texture)
  }

  loadTransformationMatrix(matrix: Mat4) {
    this.loadMatrix(this.transformationMatrix, matrix.values)
  }
}
