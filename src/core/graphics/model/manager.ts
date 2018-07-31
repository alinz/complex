import global from '@core/global'

import { Model } from './model'

export class ModelManager {
  modelsMap: Map<{ new (): Model }, Model>
  currentBindedModel: Model | null

  constructor() {
    this.modelsMap = new Map()
    this.currentBindedModel = null
  }

  add(ModelClass: { new (): Model }) {
    if (this.modelsMap.has(ModelClass)) {
      throw new Error(`model '${ModelClass.name}' already added`)
    }

    const instance = new ModelClass()
    this.modelsMap.set(ModelClass, instance)
  }

  getInstance(ModelClass: { new (): Model }): Model {
    let model = this.modelsMap.get(ModelClass)

    if (!model) {
      throw new Error(`model '${ModelClass.name}' not found`)
    }

    return model
  }

  autoBind(ModelClass: { new (): Model }): Model {
    const model = this.getInstance(ModelClass)

    if (model !== this.currentBindedModel) {
      if (this.currentBindedModel) {
        this.currentBindedModel.unbind()
      }
      model.bind()
      this.currentBindedModel = model
    }

    return model
  }
}
