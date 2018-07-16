import { Geometry } from '@core/geometry'
import { Texture2D } from '@core/texture'

import { storeFloatDataInAttributeList } from '@core/webgl-util'

export class Model2D {
  geometry: Geometry
  texture: Texture2D

  constructor(geometry: Geometry, texture: Texture2D) {
    this.geometry = geometry
    this.texture = texture
  }
}
