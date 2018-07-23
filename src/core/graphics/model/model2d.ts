import global from '@core/global'
import { storeFloatDataInAttributeList, storeIndicies, VBO_Location } from '@core/graphics/helper'
import { Texture2D } from '@core/graphics/texture'

import { Model } from './model'

const defaultAttributes = [VBO_Location.Vertex]

export class Model2D extends Model {
  indices: WebGLBuffer
  vertices: WebGLBuffer

  constructor(vertices: Array<number>, indices: Array<number>) {
    super(indices.length)

    this.vertices = storeFloatDataInAttributeList(vertices, 3, VBO_Location.Vertex)
    this.indices = storeIndicies(indices)
  }

  attributes(): Array<number> {
    return defaultAttributes
  }

  bind() {
    const { gl } = global

    super.bind()

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices)
  }

  unbind() {
    const { gl } = global

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

    super.unbind()
  }

  clean() {
    const { gl } = global

    gl.deleteBuffer(this.vertices)
    gl.deleteBuffer(this.indices)

    super.clean()
  }
}

const defaultTextureAttributes = [VBO_Location.Vertex, VBO_Location.Texture]

export class TextureModel2D extends Model2D {
  texture: Texture2D

  constructor(texture: Texture2D, vertices: Array<number>, indicies: Array<number>) {
    super(vertices, indicies)

    this.texture = texture
  }

  attributes(): Array<number> {
    return defaultTextureAttributes
  }

  bind() {
    super.bind()
    this.texture.bind()
  }

  unbind() {
    this.texture.unbind()
    super.unbind()
  }
}
