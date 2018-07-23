import global from '@core/global'

export class Model {
  vao: WebGLVertexArrayObject
  vertexCount: number

  constructor(vertexCount: number) {
    const { gl } = global

    this.vao = gl.createVertexArray()
    this.vertexCount = vertexCount

    global.gl.bindVertexArray(this.vao)
  }

  attributes(): Array<number> {
    return []
  }

  bind() {
    const { gl } = global

    gl.bindVertexArray(this.vao)

    for (const attribute of this.attributes()) {
      gl.enableVertexAttribArray(attribute)
    }
  }

  unbind() {
    const { gl } = global

    for (const attribute of this.attributes()) {
      gl.disableVertexAttribArray(attribute)
    }

    global.gl.bindVertexArray(null)
  }

  clean() {
    global.gl.deleteVertexArray(this.vao)
  }
}
