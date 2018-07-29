import { Component, genComponentType } from '@core/ecs'
import { Vec3 } from '@core/math'

export class Transform implements Component {
  static Type: number = genComponentType()
  type: number = Transform.Type

  position: Vec3
  rotate: Vec3
  scale: number

  constructor() {
    this.position = new Vec3(0, 0, 0)
    this.rotate = new Vec3(0, 0, 0)
    this.scale = 1
  }
}
