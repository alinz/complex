import { loadImage } from '@core/loader'

import { Texture2D } from './texture2d'

export class TextureManager {
  collections: Map<string, Texture2D>

  constructor() {
    this.collections = new Map()
  }

  async loadPNGs(resourcesMap: { [key: string]: string }) {
    for (const key in resourcesMap) {
      if (this.collections.has(key)) {
        throw new Error(`png with key ${key} already loaded`)
      }

      const image = await loadImage(resourcesMap[key])

      this.collections.set(key, new Texture2D(image))
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
