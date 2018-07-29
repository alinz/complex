import { Entity } from '@core/ecs'

import * as component from '@game/component'

export const SampleEntityType = component.Geometry.Type | component.Transform.Type

export class Sample extends Entity {
  geometry: component.Geometry
  transform: component.Transform

  constructor() {
    super(SampleEntityType)
  }
}
