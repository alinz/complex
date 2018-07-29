import { Component, genComponentType } from '@core/ecs'
import { Model } from '@core/graphics/model'

export class Camera implements Component {
  static Type: number = genComponentType()
  type: number = Camera.Type
}
