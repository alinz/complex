import { Entity } from '@core/ecs'

import * as component from '@game/component'

export const CameraEntityType = component.Camera.Type | component.Transform.Type

export class Camera extends Entity {
  transform: component.Transform

  constructor() {
    super(CameraEntityType)
  }
}
