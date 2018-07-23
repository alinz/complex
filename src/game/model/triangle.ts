import { Model, Model2D } from '@core/graphics/model'

const vertices = [-0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, 0.0, 0.0]
const indices = [0, 1, 2]

export class Triangle extends Model2D {
  constructor() {
    super(vertices, indices)
  }
}

export const triangleBuilder = (): Model => {
  return new Triangle()
}
