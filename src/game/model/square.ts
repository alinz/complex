import { Model, TextureModel2D } from '@core/graphics/model'
import { Texture2D } from '@core/graphics/texture'

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

export class Square extends TextureModel2D {
  constructor(texture: Texture2D) {
    super(texture, textureCoords, vertices, indices)
  }
}

export const squareBuilder = (): Model => {
  return new Square()
}