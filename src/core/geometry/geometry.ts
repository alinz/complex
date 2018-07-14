import { iota } from '@/core/generator/iota'

// we need this to generate unique id per geometry
// so geometry manager can bind geometry once per render
const genGeometryId = iota()

const createVertexArray = (gl: WebGL2RenderingContext): WebGLVertexArrayObject => {
  const vao = gl.createVertexArray()
  if (!vao) {
    throw new Error('can not create vertex array')
  }

  gl.bindVertexArray(vao)

  return vao
}

const storeFloatDataInAttributeList = (
  gl: WebGL2RenderingContext,
  data: Array<number>,
  size: number,
  index: number
): WebGLBuffer => {
  const buffer = gl.createBuffer()
  if (!buffer) {
    throw new Error('can not create buffer')
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)
  gl.vertexAttribPointer(index, size, gl.FLOAT, false, 0, 0)
  gl.bindBuffer(gl.ARRAY_BUFFER, null)

  return buffer
}

const storeIndicies = (gl: WebGL2RenderingContext, data: Array<number>): WebGLBuffer => {
  const buffer = gl.createBuffer()
  if (!buffer) {
    throw new Error('can not create buffer')
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

  return buffer
}

export const DataLocation = {
  Vertex: 0
}

const defaultAttributes = [DataLocation.Vertex]

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
    this.vertex = storeFloatDataInAttributeList(gl, vertices, 3, DataLocation.Vertex)
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
