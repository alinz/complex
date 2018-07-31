import { Entity } from '@core/ecs'
import * as di from '@core/di'
import { ModelManager } from '@core/graphics/model'

import * as component from '@game/component'
import * as model from '@game/model'

export const SampleEntityType = component.Geometry.Type | component.Transform.Type

export class Sample extends Entity {
  geometry: component.Geometry
  transform: component.Transform

  constructor() {
    super(SampleEntityType)

    const modelManager = di.instance(ModelManager)

    this.geometry = new component.Geometry(modelManager.getInstance(model.Square))
    this.transform = new component.Transform()
  }
}
