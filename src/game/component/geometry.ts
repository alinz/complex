import { Component, genComponentType } from '@core/ecs'
import { Model } from '@core/graphics/model'

export class Geometry implements Component {
  static Type: number = genComponentType()
  type: number = Geometry.Type

  model: Model

  constructor(model: Model) {
    this.model = model
  }
}
