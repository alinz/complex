export class Texture2D {
  id: WebGLTexture
  gl: WebGL2RenderingContext

  constructor(gl: WebGL2RenderingContext, image: HTMLImageElement) {
    this.gl = gl

    this.id = gl.createTexture()

    gl.bindTexture(gl.TEXTURE_2D, this.id)
    // Set the parameters so we don't need mips
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

    gl.texImage2D(
      gl.TEXTURE_2D,
      0, // mipLevel
      gl.RGBA, //internalFormat,
      gl.RGBA, //srcFormat,
      gl.UNSIGNED_BYTE, //srcType,
      image
    )
  }

  cleanUp() {
    this.gl.deleteTexture(this.id)
    this.id = null
  }
}
