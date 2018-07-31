import { TextureModel2D } from '@core/graphics/model'
import { TextureManager } from '@core/graphics/texture'
import * as di from '@core/di'

import * as resource from '@game/resource'

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
  constructor() {
    super(di.instance(TextureManager).texture(resource.images.sample.key), textureCoords, vertices, indices)
  }
}
