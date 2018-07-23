import { Model, Model2D } from '@core/graphics/model'

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

const textureCoords = [0, 0, 0, 1, 1, 1, 1, 0]

export class Square extends Model2D {
  constructor() {
    super(vertices, indices)
  }
}

export const squareBuilder = (): Model => {
  return new Square()
}
