import { Geometry } from '@core/geometry'

const vertices = [
  -0.5,
  0.5,
  0.0, // Left top         ID: 0
  -0.5,
  -0.5,
  0.0, // Left bottom      ID: 1
  0.5,
  -0.5,
  0.0, // Right bottom     ID: 2
  0.5,
  0.5,
  0.0 // Right left       ID: 3
]

const indices = [0, 1, 2, 2, 3, 0]

export class Square extends Geometry {
  constructor(gl: WebGL2RenderingContext) {
    super(gl, vertices, indices)
  }
}
