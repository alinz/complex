import global from '@core/global'

export const storeFloatDataInAttributeList = (data: Array<number>, size: number, index: number): WebGLBuffer => {
  const { gl } = global
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

export const storeIndicies = (data: Array<number>): WebGLBuffer => {
  const { gl } = global
  const buffer = gl.createBuffer()
  if (!buffer) {
    throw new Error('can not create buffer')
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

  return buffer
}
