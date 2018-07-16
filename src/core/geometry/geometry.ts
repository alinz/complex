import { iota } from '@core/generator'
import { Texture2D } from '@core/texture'

import { createVertexArray, storeFloatDataInAttributeList, storeIndicies, VBO_Location } from '@core/webgl-util'

// we need this to generate unique id per geometry
// so geometry manager can bind geometry once per render
const genGeometryId = iota()

const defaultAttributes = [VBO_Location.Vertex]

export class Geometry {
  gl: WebGL2RenderingContext
  id: number
  vao: WebGLVertexArrayObject
  vertex: WebGLBuffer
  index: WebGLBuffer

  vertexCount: number

  constructor(gl: WebGL2RenderingContext, vertices: Array<number>, indices: Array<number>) {
    this.gl = gl

    this.id = genGeometryId()
    this.vao = createVertexArray(gl)
    this.vertex = storeFloatDataInAttributeList(gl, vertices, 3, VBO_Location.Vertex)
    this.index = storeIndicies(gl, indices)
    this.vertexCount = indices.length
    gl.bindVertexArray(null)
  }

  bind() {
    const { gl } = this

    gl.bindVertexArray(this.vao)

    for (const attribute of this.attributes()) {
      gl.enableVertexAttribArray(attribute)
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index)
  }

  unbind() {
    const { gl } = this

    for (const attribute of this.attributes()) {
      gl.disableVertexAttribArray(attribute)
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
    gl.bindVertexArray(null)
  }

  // in most cases, you don't need override this method.
  attributes(): Array<number> {
    return defaultAttributes
  }

  cleanup() {
    const { gl } = this

    gl.deleteVertexArray(this.vao)
    gl.deleteBuffer(this.vertex)
    gl.deleteBuffer(this.index)
  }
}
