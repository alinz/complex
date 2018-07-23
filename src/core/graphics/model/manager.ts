import global from '@core/global'

import { Model } from './model'

export class ModelManager {
  modelsMap: Map<() => Model, Model>
  currentBindedModel: Model | null

  constructor() {
    this.modelsMap = new Map()
    this.currentBindedModel = null
  }

  getInstance(modelBuilder: () => Model): Model {
    let model = this.modelsMap.get(modelBuilder)

    if (!model) {
      model = modelBuilder()
      this.modelsMap.set(modelBuilder, model)
    }

    return model
  }

  autoBind(modelBuilder: () => Model): Model {
    const model = this.getInstance(modelBuilder)

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
