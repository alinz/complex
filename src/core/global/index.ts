let webGL2RenderingContext: WebGL2RenderingContext

let width: number = 0
let height: number = 0
let aspectChanged: boolean = true

export default {
  get gl(): WebGL2RenderingContext {
    return webGL2RenderingContext
  },
  set gl(gl: WebGL2RenderingContext) {
    webGL2RenderingContext = gl
  },
  get width(): number {
    return width
  },
  set width(value: number) {
    aspectChanged = true
    width = value
  },
  get height(): number {
    return height
  },
  set height(value: number) {
    aspectChanged = true
    height = value
  },
  get isAspectChanged(): boolean {
    if (aspectChanged) {
      aspectChanged = false
      return true
    }
    return false
  }
}
