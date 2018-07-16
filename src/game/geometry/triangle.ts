import { Geometry } from '@core/geometry'

const vertices = [-0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, 0.0, 0.0]
const indices = [0, 1, 2]

export class Triangle extends Geometry {
  constructor(gl: WebGL2RenderingContext) {
    super(gl, vertices, indices)
  }
}
