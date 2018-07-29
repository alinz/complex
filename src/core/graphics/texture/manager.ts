import { loadImage } from '@core/loader'

import { Texture2D } from './texture2d'

type ImagesInfo = {
  [key: string]: {
    key: string
    path: string
  }
}

export class TextureManager {
  collections: Map<string, Texture2D>

  constructor() {
    this.collections = new Map()
  }

  async loadPNGs(resourcesMap: ImagesInfo) {
    for (const key in resourcesMap) {
      const val = resourcesMap[key]

      if (this.collections.has(val.key)) {
        throw new Error(`png with key ${val.key} already loaded`)
      }

      const image = await loadImage(val.path)

      this.collections.set(val.key, new Texture2D(image))
    }
  }

  texture(key: string): Texture2D {
    const texture = this.collections.get(key)
    if (!texture) {
      throw new Error(`texture with '${key}' not found`)
    }
    return texture
  }

  clean() {
    for (const key in this.collections) {
      this.collections.get(key).clean()
    }

    this.collections.clear()
  }
}
