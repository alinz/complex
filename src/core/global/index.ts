let webGL2RenderingContext: WebGL2RenderingContext

export default {
  get gl(): WebGL2RenderingContext {
    return webGL2RenderingContext
  },
  set gl(gl: WebGL2RenderingContext) {
    webGL2RenderingContext = gl
  }
}
